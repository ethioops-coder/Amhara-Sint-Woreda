/**
 * /api/public/home — single endpoint for all homepage data
 * Replaces 4 separate SWR calls in HomePage.tsx
 * Cached at CDN edge for 60s, revalidated in background for 5min
 */
export const revalidate = 60;
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [news, heroSlides, promoSlides, projects, cabinet] = await Promise.all([
      db.newsArticle.findMany({
        where: { approvalStatus: 'approved' },
        orderBy: { createdAt: 'desc' },
        take: 9,
      }),
      db.sliderImage.findMany({
        where: { sliderType: 'hero', isActive: true, approvalStatus: 'approved' },
        orderBy: { order: 'asc' },
        take: 9,
      }),
      db.sliderImage.findMany({
        where: { sliderType: 'promo', isActive: true, approvalStatus: 'approved' },
        orderBy: { order: 'asc' },
        take: 7,
      }),
      db.project.findMany({
        where: { approvalStatus: 'approved' },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
      db.cabinetMember.findMany({
        where: { approvalStatus: 'approved' },
        orderBy: { order: 'asc' },
        take: 6,
      }),
    ])

    return NextResponse.json(
      { news, heroSlides, promoSlides, projects, cabinet },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } }
    )
  } catch (error) {
    console.error('Home data GET error:', error)
    return NextResponse.json(
      { news: [], heroSlides: [], promoSlides: [], projects: [], cabinet: [] },
      { status: 200 }
    )
  }
}
