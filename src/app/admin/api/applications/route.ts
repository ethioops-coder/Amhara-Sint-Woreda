import { NextRequest, NextResponse } from "next/server";
import {
  getApplications,
  createApplication,
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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const item = createApplication({
      vacancyId: data.vacancyId || "",
      vacancyTitle: data.vacancyTitle || "",
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      education: data.education || "",
      experience: data.experience || "",
      coverLetter: data.coverLetter || "",
      cvPath: data.cvFile || "",
      cvOriginalName: data.cvName || "",
      status: data.status || "Under Review",
      notes: data.notes || "",
      // extra fields stored in notes if not in schema
      ...data,
    });
    return NextResponse.json(item, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...fields } = await request.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const item = updateApplication(id, fields);
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
