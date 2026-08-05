export const revalidate = 60;
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v4'

const cabinetMemberSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  department: z.string().min(1),
  photo: z.string().nullable().optional(),
  bio: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().nullable().optional(),
  socialLinks: z.string().default('{}'),
  order: z.number().int().default(0),
})

export async function GET() {
  try {
    const members = await db.cabinetMember.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(members, {
      headers: { 'Cache-Control': 's-maxage=120, stale-while-revalidate=600' }
    })
  } catch (error) {
    console.error('CabinetMembers GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch cabinet members' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = cabinetMemberSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''
    const approvalStatus = adminRole === 'super_admin' ? 'approved' : 'pending'

    const member = await db.cabinetMember.create({
      data: {
        ...data,
        approvalStatus,
        createdBy: adminId || null,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(member, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('CabinetMembers POST error:', error)
    return NextResponse.json({ error: 'Failed to create cabinet member' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await req.json()
    const data = cabinetMemberSchema.parse(body)

    const adminRole = req.headers.get('x-admin-role') || 'admin'
    const adminId = req.headers.get('x-admin-id') || ''

    const existing = await db.cabinetMember.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Cabinet member not found' }, { status: 404 })

    const approvalStatus = adminRole === 'super_admin' ? 'approved' : (existing.approvalStatus === 'approved' ? 'pending' : existing.approvalStatus)

    const member = await db.cabinetMember.update({
      where: { id },
      data: {
        ...data,
        approvalStatus,
        approvedBy: adminRole === 'super_admin' ? adminId : null,
        approvedAt: adminRole === 'super_admin' ? new Date() : null,
      },
    })
    return NextResponse.json(member)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('CabinetMembers PUT error:', error)
    return NextResponse.json({ error: 'Failed to update cabinet member' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const existing = await db.cabinetMember.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: 'Cabinet member not found' }, { status: 404 })

    await db.cabinetMember.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('CabinetMembers DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete cabinet member' }, { status: 500 })
  }
}