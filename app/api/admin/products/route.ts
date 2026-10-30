import { NextResponse } from "next/server";
import { getProductStore, upsertManagedProduct } from "@/data/product-store";
import type { Product } from "@/data/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getProductStore());
}

export async function POST(request: Request) {
  try {
    const product = await request.json() as Product;
    return NextResponse.json(await upsertManagedProduct(product), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "保存失败" }, { status: 400 });
  }
}
