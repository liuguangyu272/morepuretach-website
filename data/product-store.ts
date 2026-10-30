import fs from "node:fs/promises";
import path from "node:path";
import type { Product } from "@/data/products";

export type ProductContentStore = {
  schemaVersion: number;
  updatedAt: string;
  namingPolicy: Record<string, string>;
  products: Product[];
};

const storePath = path.join(process.cwd(), "data", "product-content-store.json");
const allowedCategories = new Set([
  "chromatography-columns",
  "silica-microspheres",
  "magnetic-microspheres",
  "polymer-microspheres",
  "fluorescent-microspheres",
  "extraction-materials",
]);

export async function getProductStore(): Promise<ProductContentStore> {
  const source = await fs.readFile(storePath, "utf8");
  return JSON.parse(source) as ProductContentStore;
}

export async function getManagedProducts(): Promise<Product[]> {
  return (await getProductStore()).products.filter((product) => product.published !== false);
}

export async function getManagedProduct(slug: string): Promise<Product | undefined> {
  return (await getManagedProducts()).find((product) => product.slug === slug);
}

function requireText(value: unknown, label: string) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label}不能为空`);
}

export function validateProduct(product: Product) {
  requireText(product.slug, "产品 ID");
  requireText(product.name, "中文名称");
  requireText(product.enName, "英文名称");
  requireText(product.seriesName, "系列名称");
  requireText(product.codePrefix, "货号前缀");
  requireText(product.code, "代表货号");
  requireText(product.summary, "产品简介");
  requireText(product.image, "产品图片");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug)) throw new Error("产品 ID 只能使用小写字母、数字和连字符");
  if (!allowedCategories.has(product.category)) throw new Error("产品分类无效");
  if (!Array.isArray(product.specs) || !product.specs.length) throw new Error("至少需要一项技术参数");
  if (!Array.isArray(product.variants) || !product.variants.length) throw new Error("至少需要一个规格或货号");
}

function validateUniqueProducts(products: Product[]) {
  const fields: Array<[keyof Product, string]> = [
    ["slug", "产品 ID"],
    ["name", "中文名称"],
    ["enName", "英文名称"],
    ["seriesName", "系列名称"],
    ["codePrefix", "货号前缀"],
  ];
  for (const [field, label] of fields) {
    const seen = new Set<string>();
    for (const product of products) {
      const value = String(product[field] ?? "").trim().toLowerCase();
      if (seen.has(value)) throw new Error(`${label}重复：${String(product[field])}`);
      seen.add(value);
    }
  }
}

export async function saveProductStore(store: ProductContentStore) {
  if (!Array.isArray(store.products) || !store.products.length) throw new Error("产品列表不能为空");
  store.products.forEach(validateProduct);
  validateUniqueProducts(store.products);
  const nextStore = { ...store, updatedAt: new Date().toISOString() };
  await fs.writeFile(storePath, `${JSON.stringify(nextStore, null, 2)}\n`, "utf8");
  return nextStore;
}

export async function upsertManagedProduct(product: Product, originalSlug?: string) {
  validateProduct(product);
  const store = await getProductStore();
  const index = store.products.findIndex((item) => item.slug === (originalSlug ?? product.slug));
  const normalized = {
    ...product,
    published: product.published !== false,
    customAvailable: product.customAvailable !== false,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  if (index >= 0) store.products[index] = normalized;
  else store.products.push(normalized);
  const saved = await saveProductStore(store);
  return saved.products.find((item) => item.slug === normalized.slug) as Product;
}
