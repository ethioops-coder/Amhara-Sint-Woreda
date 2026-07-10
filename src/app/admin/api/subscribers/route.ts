import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const subs = await prisma.subscriber.findMany({ orderBy: { subscribedAt: "desc" } });
    return NextResponse.json(subs);
  } catch { return NextResponse.json([]); }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) return NextResponse.json(existing);
    const sub = await prisma.subscriber.create({ data: { email } });
    return NextResponse.json(sub, { status: 201 });
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.subscriber.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
