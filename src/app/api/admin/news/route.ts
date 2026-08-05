export const revalidate = 60;
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'

const ADMIN_SESSION = 'dessie_admin_session'

async function getAdminId() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION)?.value
  if (!session) return null
  try { return JSON.parse(session).id } catch { return null }
}

const newsSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  category: z.string().default('General'),
  image: z.string().optional(),
  author: z.string().optional(),
})

export async function GET() {
  try {
    const articles = await db.newsArticle.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      where: { approvalStatus: 'approved' },
    })
    return NextResponse.json(articles, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' }
    })
  } catch (error) {
    console.error('Admin News GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminId = await getAdminId()
    if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const data = newsSchema.parse(body)

    const isSuperAdmin = await db.adminUser.findUnique({ where: { id: adminId }, select: { role: true } })
    const autoApprove = isSuperAdmin?.role === 'super_admin'

    const article = await db.newsArticle.create({
      data: {
        ...data,
        status: autoApprove ? 'published' : 'draft',
        approvalStatus: autoApprove ? 'approved' : 'pending',
        createdBy: adminId,
        approvedBy: autoApprove ? adminId : null,
        approvedAt: autoApprove ? new Date() : null,
      },
    })

    await db.auditLog.create({
      data: { adminId, action: 'create', model: 'NewsArticle', recordId: article.id, details: JSON.stringify({ title: data.title }) },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Admin News POST error:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const adminId = await getAdminId()
    if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const data = newsSchema.parse(body)

    const isSuperAdmin = await db.adminUser.findUnique({ where: { id: adminId }, select: { role: true } })
    const autoApprove = isSuperAdmin?.role === 'super_admin'

    const article = await db.newsArticle.update({
      where: { id },
      data: {
        ...data,
        approvalStatus: autoApprove ? 'approved' : 'pending',
        status: autoApprove ? 'published' : 'draft',
        approvedBy: autoApprove ? adminId : null,
        approvedAt: autoApprove ? new Date() : null,
      },
    })

    await db.auditLog.create({
      data: { adminId, action: 'update', model: 'NewsArticle', recordId: id, details: JSON.stringify({ title: data.title }) },
    })

    return NextResponse.json(article)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Admin News PUT error:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const adminId = await getAdminId()
    if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const article = await db.newsArticle.findUnique({ where: { id }, select: { title: true } })
    await db.newsArticle.delete({ where: { id } })

    await db.auditLog.create({
      data: { adminId, action: 'delete', model: 'NewsArticle', recordId: id, details: JSON.stringify({ title: article?.title }) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin News DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}