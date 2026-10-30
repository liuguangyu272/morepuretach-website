import { NextResponse } from "next/server";
import { InquiryValidationError, updateInquiry } from "@/data/inquiry-store";
import type { InquiryStatus } from "@/data/inquiry-types";

export const runtime = "nodejs";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as { status?: InquiryStatus; internalNote?: string };
    return NextResponse.json(await updateInquiry(id, { status: body.status, internalNote: body.internalNote }));
  } catch (error) {
    const status = error instanceof InquiryValidationError ? error.status : 500;
    return NextResponse.json({ error: error instanceof Error ? error.message : "保存失败" }, { status });
  }
}
