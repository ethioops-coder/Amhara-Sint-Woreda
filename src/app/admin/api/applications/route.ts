import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function checkAuth(request: Request) {
  const cookieStore = await cookies();
  return !!cookieStore.get("admin_session")?.value;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const vacancyId = url.searchParams.get("vacancyId");

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

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const app = await prisma.application.update({ where: { id }, data });
    return NextResponse.json(app);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.application.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
