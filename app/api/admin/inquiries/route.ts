import { NextResponse } from "next/server";
import { getInquiries } from "@/data/inquiry-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ inquiries: await getInquiries() }, { headers: { "Cache-Control": "no-store" } });
}
