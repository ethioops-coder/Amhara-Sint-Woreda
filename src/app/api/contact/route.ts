import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }
    await prisma.contactMessage.create({
      data: { name, email, phone: phone || "", subject: subject || "", message },
    });
    return NextResponse.json({ success: true, message: "Your message has been received." });
  } catch (e: any) {
    console.error("Contact error:", e);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
