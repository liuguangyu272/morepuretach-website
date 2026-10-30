import { getProductStore } from "@/data/product-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export async function GET(request: Request) {
  const store = await getProductStore();
  const format = new URL(request.url).searchParams.get("format");
  if (format === "csv") {
    const header = ["产品ID", "分类", "中文名称", "英文名称", "系列名称", "货号前缀", "代表货号", "公开状态", "接受定制", "更新时间"];
    const rows = store.products.map((product) => [
      product.slug,
      product.category,
      product.name,
      product.enName,
      product.seriesName,
      product.codePrefix,
      product.code,
      product.published === false ? "否" : "是",
      product.customAvailable === false ? "否" : "是",
      product.updatedAt,
    ]);
    const csv = `\uFEFF${[header, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="morepure-products.csv"',
      },
    });
  }
  return new Response(JSON.stringify(store, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="morepure-product-content.json"',
    },
  });
}
