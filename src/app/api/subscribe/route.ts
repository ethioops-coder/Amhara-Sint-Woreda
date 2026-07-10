import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ message: "Already subscribed", email }, { status: 200 });

    await prisma.subscriber.create({ data: { email } });
    return NextResponse.json({ message: "Subscribed successfully", email }, { status: 201 });
  } catch (e: any) {
    console.error("Subscribe error:", e);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
