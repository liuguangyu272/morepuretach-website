import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import ProductExplorer from "@/components/ProductExplorer";
import { categories, type CategorySlug } from "@/data/products";

export const metadata: Metadata = {
  title: "产品中心",
  description: "浏览猫谱科技六大产品线，按产品名称、货号、粒径、表面基团与应用查找产品。",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; q?: string | string[] }>;
}) {
  const query = await searchParams;
  const categoryParam = Array.isArray(query.category) ? query.category[0] : query.category;
  const q = Array.isArray(query.q) ? query.q[0] : query.q;
  const initialCategory = categories.some((category) => category.slug === categoryParam)
    ? (categoryParam as CategorySlug)
    : "all";

  return (
    <main>
      <section className="page-hero catalog-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">首页</Link><ChevronRight size={14} /><span>产品中心</span>
          </div>
          <div className="page-hero-grid">
            <div>
              <span className="eyebrow light">PRODUCT CATALOG</span>
              <h1>产品中心</h1>
              <p>按材料体系、产品名称或完整货号快速查找，并进入结构化参数与 SKU 详情。</p>
            </div>
            <div className="catalog-hero-stat">
              <Search size={24} />
              <strong>六大产品线</strong>
              <span>从分析、分离到检测与样品前处理</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section catalog-section">
        <div className="container">
          <ProductExplorer initialCategory={initialCategory} initialQuery={q ?? ""} />
        </div>
      </section>
    </main>
  );
}
