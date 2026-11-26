import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");

const DEFAULT_CONTENT = {
  heroSlides: [
    { image: "https://sfile.chatglm.cn/images-ppt/5d712c5b8f44.jpg", title: "Welcome to Amhara Sayint Woreda", subtitle: "A land of beauty, culture, and progress in South Wollo Zone, Amhara Region" },
    { image: "https://sfile.chatglm.cn/images-ppt/e2eed6eb06d5.jpg", title: "Majestic Highland Landscapes", subtitle: "Rolling highlands and fertile valleys stretching from the Blue Nile to Mount Tabor at 4,247m" },
    { image: "https://sfile.chatglm.cn/images-ppt/c9ebd2951a03.jpg", title: "Rich Natural Heritage", subtitle: "Diverse ecosystems and breathtaking scenery in the heart of the Amhara highlands" },
  ],
  siteSettings: {
    siteName: "Amhara Sayint",
    tagline: "Woreda Administration",
    developerName: "Meseret Akalu",
    developerPhone: "+251 912 465 247",
    socialLinks: {
      facebook: "https://facebook.com/100066823706013",
      youtube: "https://youtube.com/@AmharaSayint",
      telegram: "https://t.me/AmharaSayint",
      instagram: "https://instagram.com/AmharaSayint",
      linkedin: "https://www.linkedin.com/in/meseret-akalu-76363121b/",
    },
  },
};

function ensure() {
  const dir = path.dirname(CONTENT_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(CONTENT_FILE)) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), "utf-8");
  }
}

export async function GET() {
  try {
    ensure();
    const data = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(DEFAULT_CONTENT);
  }
}

export async function PUT(request: NextRequest) {
  try {
    ensure();
    const data = await request.json();
    const current = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    const updated = { ...current, ...data };
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(updated, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to save" }, { status: 500 });
  }
}