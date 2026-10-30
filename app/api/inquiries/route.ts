import { NextResponse } from "next/server";
import { createInquiry, InquiryValidationError, saveInquiryAttachment, updateInquiry, validateInquiryInput } from "@/data/inquiry-store";
import { sendInquiryNotification } from "@/data/inquiry-mailer";
import { getManagedProduct } from "@/data/product-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const attempts = new Map<string, number[]>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 5) throw new InquiryValidationError("提交过于频繁，请稍后再试", 429);
  recent.push(now);
  attempts.set(ip, recent);
}

function value(form: FormData, key: string) {
  const item = form.get(key);
  return typeof item === "string" ? item : "";
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 6 * 1024 * 1024) throw new InquiryValidationError("提交内容不能超过 6 MB", 413);
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
    checkRateLimit(ip);

    const form = await request.formData();
    if (value(form, "website")) throw new InquiryValidationError("提交未通过校验");
    const startedAt = Number(value(form, "startedAt"));
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1500) throw new InquiryValidationError("请确认信息后再提交");

    const productSlug = value(form, "product");
    const product = productSlug ? await getManagedProduct(productSlug) : undefined;
    const input = validateInquiryInput({
      inquiryType: value(form, "inquiryType"),
      productSlug,
      productName: product?.name || "",
      code: value(form, "code"),
      quantity: value(form, "quantity"),
      application: value(form, "application"),
      message: value(form, "message"),
      name: value(form, "name"),
      organization: value(form, "organization"),
      phone: value(form, "phone"),
      email: value(form, "email"),
      region: value(form, "region"),
      consent: value(form, "consent"),
    });

    const file = form.get("attachment");
    const attachment = file instanceof File && file.size > 0 ? await saveInquiryAttachment(file) : undefined;
    let inquiry = await createInquiry(input, {
      sourceIp: ip,
      userAgent: request.headers.get("user-agent") || "",
      attachment,
    });
    const email = await sendInquiryNotification(inquiry);
    inquiry = await updateInquiry(inquiry.id, { emailStatus: email.status, emailError: email.error || "" });

    return NextResponse.json({
      id: inquiry.id,
      createdAt: inquiry.createdAt,
      emailStatus: inquiry.emailStatus,
      responseExpectation: inquiry.responseExpectation,
    }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const status = error instanceof InquiryValidationError ? error.status : 500;
    const message = error instanceof InquiryValidationError ? error.message : "提交失败，请稍后重试或电话联系";
    return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
  }
}
