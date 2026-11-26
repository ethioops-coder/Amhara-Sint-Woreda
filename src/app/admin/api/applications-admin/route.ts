import { NextRequest, NextResponse } from "next/server";
import {
  getApplications,
  updateApplication,
  deleteApplication,
} from "@/lib/storage";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const vacancyId = request.nextUrl.searchParams.get("vacancyId");
    const all = getApplications();
    if (id) {
      const app = all.find((a) => a.id === id);
      if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(app);
    }
    if (vacancyId) {
      return NextResponse.json(all.filter((a) => a.vacancyId === vacancyId));
    }
    return NextResponse.json(all);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status, notes } = await request.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const item = updateApplication(id, {
      ...(status !== undefined && { status }),
      ...(notes !== undefined && { notes }),
    });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const ok = deleteApplication(id);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
