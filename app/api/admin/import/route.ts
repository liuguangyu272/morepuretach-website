import { NextResponse } from "next/server";
import { saveProductStore, type ProductContentStore } from "@/data/product-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const store = await request.json() as ProductContentStore;
    return NextResponse.json(await saveProductStore(store));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "导入失败" }, { status: 400 });
  }
}
