/**
 * db.ts — Universal database client
 * Production: Turso HTTP API (no native binaries needed)
 * Development: Prisma + local SQLite
 */

// ─────────────────────────────────────────────────────────────────
// TURSO HTTP CLIENT
// ─────────────────────────────────────────────────────────────────
const TURSO_URL = (process.env.TURSO_DATABASE_URL ?? '').trim()
const TURSO_TOKEN = (process.env.TURSO_AUTH_TOKEN ?? '').trim()
const USE_TURSO = (TURSO_URL.startsWith('libsql://') || TURSO_URL.startsWith('https://')) && TURSO_TOKEN.length > 10 || !!process.env.VERCEL

async function tursoExec(sql: string, args: unknown[] = []): Promise<any> {
  const httpUrl = TURSO_URL.replace('libsql://', 'https://')
  const res = await fetch(`${httpUrl}/v2/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TURSO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          type: 'execute',
          stmt: {
            sql,
            args: args.map((a) =>
              a === null || a === undefined
                ? { type: 'null' }
                : { type: 'text', value: String(a) }
            ),
          },
        },
        { type: 'close' },
      ],
    }),
  })
  try {
    const data = await res.json()
    const result = data.results?.[0]
    if (result?.type === 'error') {
      console.error(`SQL error in tursoExec: ${result.error?.message}`)
      return null
    }
    return result?.response?.result
  } catch (err) {
    console.error(`Fetch error in tursoExec:`, err)
    return null
  }
}

function toRows(result: any): Record<string, unknown>[] {
  if (!result?.rows?.length || !result?.cols?.length) return []
  return result.rows.map((row: any[]) => {
    const obj: Record<string, unknown> = {}
    result.cols.forEach((col: { name: string }, i: number) => {
      const v = row[i]
      obj[col.name] = v?.type === 'null' || v === null ? null : v?.value ?? null
    })
    return obj
  })
}

// ─────────────────────────────────────────────────────────────────
// TABLE NAME MAP
// ─────────────────────────────────────────────────────────────────
const TABLE: Record<string, string> = {
  adminUser: 'AdminUser', auditLog: 'AuditLog', user: 'User',
  serviceRequest: 'ServiceRequest', newsletterSubscription: 'NewsletterSubscription',
  contactMessage: 'ContactMessage', quoteRequest: 'QuoteRequest',
  hotel: 'Hotel', newsArticle: 'NewsArticle', newsComment: 'NewsComment', vacancy: 'Vacancy',
  bid: 'Bid', project: 'Project', announcement: 'Announcement',
  pageContent: 'PageContent', menuItem: 'MenuItem', sliderImage: 'SliderImage',
  cabinetMember: 'CabinetMember', siteSetting: 'SiteSetting', siteVisit: 'SiteVisit',
  siteImage: 'SiteImage',
}

// ─────────────────────────────────────────────────────────────────
// WHERE CLAUSE BUILDER
// ─────────────────────────────────────────────────────────────────
function buildWhere(where: Record<string, unknown>): [string, unknown[]] {
  const parts: string[] = []
  const vals: unknown[] = []
  for (const [key, val] of Object.entries(where)) {
    if (key === 'AND' || key === 'OR' || key === 'NOT') continue
    if (val === null || val === undefined) {
      parts.push(`"${key}" IS NULL`)
    } else if (typeof val === 'object') {
      const v = val as Record<string, unknown>
      if ('equals' in v) { parts.push(`"${key}" = ?`); vals.push(v.equals) }
      else if ('not' in v) { parts.push(`"${key}" != ?`); vals.push(v.not) }
      else if ('in' in v && Array.isArray(v.in)) {
        parts.push(`"${key}" IN (${v.in.map(() => '?').join(',')})`)
        vals.push(...v.in)
      }
      else if ('contains' in v) { parts.push(`"${key}" LIKE ?`); vals.push(`%${v.contains}%`) }
      else if ('startsWith' in v) { parts.push(`"${key}" LIKE ?`); vals.push(`${v.startsWith}%`) }
      else if ('gt' in v) { parts.push(`"${key}" > ?`); vals.push(v.gt) }
      else if ('gte' in v) { parts.push(`"${key}" >= ?`); vals.push(v.gte) }
      else if ('lt' in v) { parts.push(`"${key}" < ?`); vals.push(v.lt) }
      else if ('lte' in v) { parts.push(`"${key}" <= ?`); vals.push(v.lte) }
    } else {
      parts.push(`"${key}" = ?`)
      vals.push(val)
    }
  }
  return [parts.join(' AND '), vals]
}

function buildSelect(select?: Record<string, unknown>): string {
  if (!select) return '*'
  const cols = Object.entries(select).filter(([, v]) => v).map(([k]) => `"${k}"`)
  return cols.length ? cols.join(', ') : '*'
}

function buildOrderBy(orderBy?: Record<string, string> | Record<string, string>[]): string {
  if (!orderBy) return ''
  const arr = Array.isArray(orderBy) ? orderBy : [orderBy]
  const parts = arr.flatMap(o => Object.entries(o).map(([k, v]) => `"${k}" ${v === 'desc' ? 'DESC' : 'ASC'}`))
  return parts.length ? ` ORDER BY ${parts.join(', ')}` : ''
}

// ─────────────────────────────────────────────────────────────────
// MODEL PROXY — maps Prisma-style calls to SQL
// ─────────────────────────────────────────────────────────────────
function makeModel(name: string) {
  const tbl = TABLE[name]
  if (!tbl) throw new Error(`Unknown model: ${name}`)

  return {
    async findMany(a?: any) {
      const { where, orderBy, take, skip, select } = a || {}
      let sql = `SELECT ${buildSelect(select)} FROM "${tbl}"`
      let vals: unknown[] = []
      if (where && Object.keys(where).length) {
        const [w, v] = buildWhere(where)
        if (w) { sql += ` WHERE ${w}`; vals = v }
      }
      sql += buildOrderBy(orderBy)
      if (skip) sql += ` OFFSET ${Number(skip)}`
      if (take) sql += ` LIMIT ${Number(take)}`
      const r = await tursoExec(sql, vals)
      return toRows(r)
    },

    async findUnique(a: any) {
      const { where, select } = a
      const [w, v] = buildWhere(where)
      const sql = `SELECT ${buildSelect(select)} FROM "${tbl}"${w ? ` WHERE ${w}` : ''} LIMIT 1`
      const r = await tursoExec(sql, v)
      return toRows(r)[0] ?? null
    },

    async findFirst(a?: any) {
      const { where, orderBy, select } = a || {}
      let sql = `SELECT ${buildSelect(select)} FROM "${tbl}"`
      let vals: unknown[] = []
      if (where && Object.keys(where).length) {
        const [w, v] = buildWhere(where)
        if (w) { sql += ` WHERE ${w}`; vals = v }
      }
      sql += buildOrderBy(orderBy)
      sql += ' LIMIT 1'
      const r = await tursoExec(sql, vals)
      return toRows(r)[0] ?? null
    },

    async count(a?: any) {
      const { where } = a || {}
      let sql = `SELECT COUNT(*) as _c FROM "${tbl}"`
      let vals: unknown[] = []
      if (where && Object.keys(where).length) {
        const [w, v] = buildWhere(where)
        if (w) { sql += ` WHERE ${w}`; vals = v }
      }
      const r = await tursoExec(sql, vals)
      return parseInt(String(toRows(r)[0]?._c ?? 0))
    },

    async create(a: any) {
      const { data } = a
      // Auto-generate CUID-like ID if missing
      if (!data.id) data.id = 'c' + Math.random().toString(36).substring(2) + Date.now().toString(36)
      // Add missing default dates
      if (!data.createdAt) data.createdAt = new Date()
      if (tbl !== 'NewsletterSubscription' && tbl !== 'ContactMessage' && !data.updatedAt) data.updatedAt = new Date()
      
      const keys = Object.keys(data).filter(k => data[k] !== undefined)
      const cols = keys.map(k => `"${k}"`).join(', ')
      const ph = keys.map(() => '?').join(', ')
      const vals = keys.map(k => data[k] instanceof Date ? data[k].toISOString() : data[k])
      await tursoExec(`INSERT INTO "${tbl}" (${cols}) VALUES (${ph})`, vals)
      if (data.id) return (makeModel(name) as any).findUnique({ where: { id: data.id } }) ?? data
      return data
    },

    async createMany(a: any) {
      const items: any[] = Array.isArray(a.data) ? a.data : [a.data]
      for (const item of items) {
        const keys = Object.keys(item).filter(k => item[k] !== undefined)
        const cols = keys.map(k => `"${k}"`).join(', ')
        const ph = keys.map(() => '?').join(', ')
        const vals = keys.map(k => item[k] instanceof Date ? item[k].toISOString() : item[k])
        await tursoExec(`INSERT INTO "${tbl}" (${cols}) VALUES (${ph})`, vals)
      }
      return { count: items.length }
    },

    async update(a: any) {
      const { where, data } = a
      if (tbl !== 'NewsletterSubscription' && tbl !== 'ContactMessage' && !data.updatedAt) data.updatedAt = new Date()
      const keys = Object.keys(data).filter(k => data[k] !== undefined)
      const set = keys.map(k => `"${k}" = ?`).join(', ')
      const vals = keys.map(k => data[k] instanceof Date ? data[k].toISOString() : data[k])
      const [w, wv] = buildWhere(where)
      await tursoExec(`UPDATE "${tbl}" SET ${set}${w ? ` WHERE ${w}` : ''}`, [...vals, ...wv])
      return (makeModel(name) as any).findFirst({ where }) ?? {}
    },

    async updateMany(a: any) {
      const { where, data } = a
      if (tbl !== 'NewsletterSubscription' && tbl !== 'ContactMessage' && !data.updatedAt) data.updatedAt = new Date()
      const keys = Object.keys(data).filter(k => data[k] !== undefined)
      const set = keys.map(k => `"${k}" = ?`).join(', ')
      const vals = keys.map(k => data[k] instanceof Date ? data[k].toISOString() : data[k])
      let sql = `UPDATE "${tbl}" SET ${set}`
      const allVals = [...vals]
      if (where && Object.keys(where).length) {
        const [w, wv] = buildWhere(where)
        if (w) { sql += ` WHERE ${w}`; allVals.push(...wv) }
      }
      await tursoExec(sql, allVals)
      return { count: 1 }
    },

    async delete(a: any) {
      const { where } = a
      const [w, v] = buildWhere(where)
      await tursoExec(`DELETE FROM "${tbl}"${w ? ` WHERE ${w}` : ''}`, v)
      return {}
    },

    async deleteMany(a?: any) {
      const { where } = a || {}
      let sql = `DELETE FROM "${tbl}"`
      const vals: unknown[] = []
      if (where && Object.keys(where).length) {
        const [w, v] = buildWhere(where)
        if (w) { sql += ` WHERE ${w}`; vals.push(...v) }
      }
      await tursoExec(sql, vals)
      return { count: 1 }
    },

    async upsert(a: any) {
      const { where, create, update } = a
      const existing = await (makeModel(name) as any).findFirst({ where })
      if (existing) return (makeModel(name) as any).update({ where, data: update })
      return (makeModel(name) as any).create({ data: create })
    },

    async groupBy(a: any) {
      const { by, _count, orderBy, take, where } = a
      const selectCols = (Array.isArray(by) ? by : [by]).map((c: string) => `"${c}"`).join(', ')
      const countKey = _count ? Object.keys(_count)[0] : '*'
      let sql = `SELECT ${selectCols}, COUNT("${countKey}") as _count FROM "${tbl}"`
      const vals: unknown[] = []
      if (where && Object.keys(where).length) {
        const [w, v] = buildWhere(where)
        if (w) { sql += ` WHERE ${w}`; vals.push(...v) }
      }
      sql += ` GROUP BY ${selectCols}`
      sql += buildOrderBy(orderBy)
      if (take) sql += ` LIMIT ${Number(take)}`
      const r = await tursoExec(sql, vals)
      return toRows(r)
    },
  }
}

// ─────────────────────────────────────────────────────────────────
// EXPORT db — Turso in production, Prisma locally
// ─────────────────────────────────────────────────────────────────
function createDb() {
  if (USE_TURSO) {
    // Return a proxy that maps db.modelName.method() → SQL
    return new Proxy({} as any, {
      get(_target: any, model: string) {
        if (typeof model !== 'string') return undefined
        if (model.startsWith('_') || model === 'then') return undefined
        try { return makeModel(model) } catch { return undefined }
      },
    })
  }

  // Local development — use Prisma
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('@prisma/client')
  const globalForPrisma = globalThis as any
  if (!globalForPrisma._prisma) {
    globalForPrisma._prisma = new PrismaClient({ log: [] })
  }
  return globalForPrisma._prisma
}

export const db: any = createDb()
