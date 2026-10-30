import { NextResponse } from "next/server";
import { upsertManagedProduct } from "@/data/product-store";
import type { Product } from "@/data/products";

export const runtime = "nodejs";

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const product = await request.json() as Product;
    return NextResponse.json(await upsertManagedProduct(product, slug));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "保存失败" }, { status: 400 });
  }
}
