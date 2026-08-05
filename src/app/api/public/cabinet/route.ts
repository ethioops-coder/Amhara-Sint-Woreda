export const revalidate = 120;
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const members = await db.cabinetMember.findMany({
      where: { approvalStatus: 'approved' },
      orderBy: { order: 'asc' },
      take: 20,
    })
    return NextResponse.json(members, {
      headers: { 'Cache-Control': 's-maxage=120, stale-while-revalidate=600' }
    })
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
