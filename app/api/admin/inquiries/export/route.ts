import { getInquiries } from "@/data/inquiry-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csv(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  const inquiries = await getInquiries();
  const headers = ["询价编号", "提交时间", "状态", "咨询类型", "产品", "货号", "数量", "应用场景", "需求说明", "姓名", "公司/机构", "联系电话", "客户邮箱", "地区", "负责销售", "响应要求", "邮件状态", "内部备注"];
  const rows = inquiries.map((item) => [item.id, item.createdAt, item.status, item.inquiryType, item.productName, item.code, item.quantity, item.application, item.message, item.name, item.organization, item.phone, item.email, item.region, item.assignedSales.join(" / "), item.responseExpectation, item.emailStatus, item.internalNote]);
  const body = `\uFEFF${[headers, ...rows].map((row) => row.map(csv).join(",")).join("\r\n")}`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="morepure-inquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
