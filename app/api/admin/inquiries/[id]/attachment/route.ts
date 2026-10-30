import { promises as fs } from "node:fs";
import path from "node:path";
import { getInquiry, inquiryAttachmentDirectory } from "@/data/inquiry-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inquiry = await getInquiry(id);
  if (!inquiry?.attachment) return new Response("Not found", { status: 404 });
  try {
    const file = await fs.readFile(path.join(inquiryAttachmentDirectory(), inquiry.attachment.storedName));
    return new Response(file, {
      headers: {
        "Content-Type": inquiry.attachment.mimeType,
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(inquiry.attachment.originalName)}`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
