import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const app = await prisma.application.create({
      data: {
        vacancyId: data.vacancyId || "",
        vacancyTitle: data.vacancyTitle || "",
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        dob: data.dob || "",
        gender: data.gender || "",
        address: data.address || "",
        education: data.education || "",
        institution: data.institution || "",
        yearGraduated: data.yearGraduated || "",
        experienceYears: data.experienceYears || "",
        currentEmployer: data.currentEmployer || "",
        currentPosition: data.currentPosition || "",
        keyQualifications: data.keyQualifications || "",
        cvName: data.cvName || "",
        cvFile: data.cvFile || "",
        coverLetterName: data.coverLetterName || "",
        coverLetterFile: data.coverLetterFile || "",
        status: "Under Review",
      },
    });
    return NextResponse.json({ success: true, id: app.id });
  } catch (e: any) {
    console.error("Application error:", e);
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      const app = await prisma.application.findUnique({ where: { id } });
      if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(app);
    }
    const apps = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(apps);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
