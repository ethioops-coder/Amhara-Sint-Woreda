export const revalidate = 0
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// Ensure table exists (idempotent — Turso ignores IF NOT EXISTS)
async function ensureTable() {
  try {
    await (db as any)._rawExec?.(`
      CREATE TABLE IF NOT EXISTS "SiteImage" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "key" TEXT NOT NULL,
        "url" TEXT NOT NULL,
        "label" TEXT NOT NULL DEFAULT '',
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedBy" TEXT,
        CONSTRAINT "SiteImage_key_key" UNIQUE ("key")
      )
    `)
  } catch { /* ignore if already exists or raw not available */ }
}

export async function GET() {
  try {
    await ensureTable()
    const images = await db.siteImage.findMany({ orderBy: { key: 'asc' } })
    return NextResponse.json(images ?? [])
  } catch (error) {
    console.error('SiteImages GET error:', error)
    return NextResponse.json([], { status: 200 }) // return empty rather than 500
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureTable()
    const body = await req.json()
    const { key, url, label } = body
    if (!key || !url) return NextResponse.json({ error: 'key and url required' }, { status: 400 })

    const existing = await db.siteImage.findFirst({ where: { key } })
    if (existing) {
      const updated = await db.siteImage.update({
        where: { id: existing.id },
        data: { url, label: label || existing.label || '', updatedAt: new Date() },
      })
      return NextResponse.json(updated)
    }

    const created = await db.siteImage.create({
      data: {
        key,
        url,
        label: label || key,
        updatedAt: new Date(),
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('SiteImages POST error:', error)
    return NextResponse.json({ error: 'Failed to save site image' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')
    if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

    const body = await req.json()
    const { url, label } = body
    if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 })

    const existing = await db.siteImage.findFirst({ where: { key } })
    if (!existing) {
      const created = await db.siteImage.create({ data: { key, url, label: label || key, updatedAt: new Date() } })
      return NextResponse.json(created)
    }

    const updated = await db.siteImage.update({
      where: { id: existing.id },
      data: { url, label: label || existing.label, updatedAt: new Date() },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('SiteImages PUT error:', error)
    return NextResponse.json({ error: 'Failed to update site image' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')
    if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

    const existing = await db.siteImage.findFirst({ where: { key } })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    await db.siteImage.delete({ where: { id: existing.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('SiteImages DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
