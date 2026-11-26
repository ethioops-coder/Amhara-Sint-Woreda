import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getNews } from "@/lib/storage"; // fallback for seed data

// Helper: map DB record to API shape
function toApiShape(item: any) {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    content: item.content,
    category: item.category,
    author: item.author,
    imageUrl: item.imageUrl,
    featured: item.featured,
    status: item.status,
    date: item.date,
    createdAt: item.createdAt?.toISOString?.() || item.createdAt,
  };
}

export async function GET() {
  try {
    // Try database first
    const items = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
    
    // If DB is empty, seed from JSON files (first run only)
    if (items.length === 0) {
      const seedItems = getNews();
      if (seedItems.length > 0) {
        for (const item of seedItems) {
          await prisma.news.upsert({
            where: { id: item.id },
            create: {
              id: item.id,
              title: item.title,
              summary: item.summary || "",
              content: item.content || "",
              category: item.category || "",
              author: item.author || "",
              imageUrl: item.imageUrl || "",
              featured: item.featured || false,
              status: item.status || "published",
              date: item.date || "",
            },
            update: {},
          });
        }
        const seeded = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json(seeded.map(toApiShape));
      }
    }
    return NextResponse.json(items.map(toApiShape));
  } catch (e: any) {
    // Fallback to JSON if DB fails
    return NextResponse.json(getNews());
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const item = await prisma.news.create({
      data: {
        title: data.title || "",
        summary: data.summary || "",
        content: data.content || "",
        category: data.category || "",
        author: data.author || "",
        imageUrl: data.imageUrl || "",
        featured: data.featured || false,
        status: data.status || "draft",
        date: data.date || new Date().toISOString().split("T")[0],
      },
    });
    return NextResponse.json(toApiShape(item), { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to create" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...fields } = await request.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const item = await prisma.news.update({
      where: { id },
      data: {
        ...(fields.title !== undefined && { title: fields.title }),
        ...(fields.summary !== undefined && { summary: fields.summary }),
        ...(fields.content !== undefined && { content: fields.content }),
        ...(fields.category !== undefined && { category: fields.category }),
        ...(fields.author !== undefined && { author: fields.author }),
        ...(fields.imageUrl !== undefined && { imageUrl: fields.imageUrl }),
        ...(fields.featured !== undefined && { featured: fields.featured }),
        ...(fields.status !== undefined && { status: fields.status }),
        ...(fields.date !== undefined && { date: fields.date }),
      },
    });
    return NextResponse.json(toApiShape(item));
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.news.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to delete" }, { status: 500 });
  }
}
