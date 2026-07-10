import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const vacancyId = request.nextUrl.searchParams.get("vacancyId");

    if (id) {
      const app = await prisma.application.findUnique({ where: { id } });
      if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(app);
    }
    if (vacancyId) {
      const apps = await prisma.application.findMany({ where: { vacancyId }, orderBy: { createdAt: "desc" } });
      return NextResponse.json(apps);
    }
    const apps = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(apps);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status, notes } = await request.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const app = await prisma.application.update({
      where: { id },
      data: { ...(status && { status }), ...(notes !== undefined && { notes }) },
    });
    return NextResponse.json(app);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.application.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
