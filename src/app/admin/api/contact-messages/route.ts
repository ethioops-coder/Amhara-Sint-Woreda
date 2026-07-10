import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const msgs = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(msgs);
  } catch { return NextResponse.json([]); }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    const msg = await prisma.contactMessage.update({ where: { id }, data: { status } });
    return NextResponse.json(msg);
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
