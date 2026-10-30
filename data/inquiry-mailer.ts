import path from "node:path";
import nodemailer from "nodemailer";
import { inquiryAttachmentDirectory } from "@/data/inquiry-store";
import type { InquiryRecord } from "@/data/inquiry-types";
import { contact } from "@/data/site";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
}

function line(label: string, value: string) {
  return `<tr><th style="padding:8px 12px;text-align:left;color:#476074;background:#f2f7f7;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px 12px;color:#0a2548">${escapeHtml(value || "未填写").replaceAll("\n", "<br>")}</td></tr>`;
}

export async function sendInquiryNotification(inquiry: InquiryRecord): Promise<{ status: "sent" | "failed" | "unconfigured"; error?: string }> {
  const user = process.env.INQUIRY_SMTP_USER?.trim() || contact.email;
  const password = process.env.INQUIRY_SMTP_PASS?.trim();
  const recipient = process.env.INQUIRY_NOTIFY_TO?.trim() || contact.email;
  if (!password) return { status: "unconfigured", error: "尚未配置 163 邮箱 SMTP 授权码" };

  const port = Number(process.env.INQUIRY_SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.INQUIRY_SMTP_HOST || "smtp.163.com",
    port,
    secure: (process.env.INQUIRY_SMTP_SECURE || "true") !== "false",
    auth: { user, pass: password },
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
  });

  const subject = `[猫谱官网询价] ${inquiry.id}｜${inquiry.inquiryType}｜${inquiry.productName || "待协助选型"}`;
  const text = [
    `询价编号：${inquiry.id}`,
    `提交时间：${inquiry.createdAt}`,
    `咨询类型：${inquiry.inquiryType}`,
    `产品：${inquiry.productName || "待协助选型"}`,
    `货号：${inquiry.code || "未填写"}`,
    `数量：${inquiry.quantity || "未填写"}`,
    `应用：${inquiry.application || "未填写"}`,
    `需求说明：${inquiry.message}`,
    `姓名：${inquiry.name}`,
    `机构：${inquiry.organization}`,
    `电话：${inquiry.phone}`,
    `客户邮箱：${inquiry.email || "未填写"}`,
    `地区：${inquiry.region || "未填写"}`,
    `共同负责销售：${inquiry.assignedSales.join("、")}`,
    `响应要求：${inquiry.responseExpectation}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"猫谱科技网站询价" <${user}>`,
      to: recipient,
      replyTo: inquiry.email || undefined,
      subject,
      text,
      html: `<div style="font-family:Arial,'Microsoft YaHei',sans-serif;max-width:760px;margin:auto;color:#0a2548"><h1 style="font-size:24px">猫谱科技网站新询价</h1><p>两位销售共同负责，请尽快响应。询价编号：<strong>${escapeHtml(inquiry.id)}</strong></p><table style="width:100%;border-collapse:collapse;border:1px solid #dce7e9">${line("咨询类型", inquiry.inquiryType)}${line("产品", inquiry.productName || "待协助选型")}${line("货号", inquiry.code)}${line("数量", inquiry.quantity)}${line("应用场景", inquiry.application)}${line("需求说明", inquiry.message)}${line("姓名", inquiry.name)}${line("公司 / 机构", inquiry.organization)}${line("联系电话", inquiry.phone)}${line("客户邮箱", inquiry.email)}${line("所在地区", inquiry.region)}${line("共同负责销售", inquiry.assignedSales.join("、"))}${line("响应要求", inquiry.responseExpectation)}</table></div>`,
      attachments: inquiry.attachment ? [{
        filename: inquiry.attachment.originalName,
        path: path.join(inquiryAttachmentDirectory(), inquiry.attachment.storedName),
        contentType: inquiry.attachment.mimeType,
      }] : undefined,
    });
    return { status: "sent" };
  } catch (error) {
    return { status: "failed", error: error instanceof Error ? error.message.slice(0, 400) : "邮件发送失败" };
  }
}
