import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  FileText,
  FlaskConical,
  MessageSquareText,
} from "lucide-react";
import { categoryMap, getRelatedProducts } from "@/data/products";
import { getManagedProduct, getManagedProducts } from "@/data/product-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getManagedProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getManagedProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const category = categoryMap[product.category];
  const related = getRelatedProducts(product, products);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    alternateName: product.enName,
    sku: product.code,
    description: product.summary,
    brand: { "@type": "Brand", name: "More Pure TECH" },
    category: category.name,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="product-breadcrumb-wrap">
        <div className="container breadcrumbs dark-breadcrumbs">
          <Link href="/">首页</Link><ChevronRight size={14} />
          <Link href="/products">产品中心</Link><ChevronRight size={14} />
          <Link href={`/products?category=${category.slug}`}>{category.name}</Link><ChevronRight size={14} />
          <span>{product.name}</span>
        </div>
      </div>

      <section className="product-detail-hero">
        <div className="container product-detail-grid">
          <div className="product-detail-media">
            <div className={product.category === "chromatography-columns" ? "product-main-image contain-image" : "product-main-image"}>
              <Image
                src={product.image}
                alt={`${product.name}（${category.name}类别示意图）`}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <span className="media-label">{category.enName}</span>
            </div>
          </div>

          <div className="product-detail-copy">
            <span className="product-category-line">{category.name} / {category.enName}</span>
            {product.badge ? <span className="detail-badge">{product.badge}</span> : null}
            <h1>{product.name}</h1>
            <p className="detail-en-name">{product.enName}</p>
            <p className="detail-summary">{product.summary}</p>

            <div className="detail-code-row">
              <span><small>系列 / 代表货号</small><strong>{product.code}</strong></span>
              <span><small>可用状态</small><strong className="available"><i /> 接受咨询</strong></span>
            </div>

            <div className="detail-key-specs">
              {product.specs.slice(0, 4).map((spec) => (
                <div key={spec.label}>
                  <small>{spec.label}</small>
                  <strong>{spec.value}</strong>
                </div>
              ))}
            </div>

            <div className="detail-actions">
              <Link
                href={`/inquiry?product=${product.slug}`}
                className="button button-primary button-large"
              >
                获取报价 <ArrowRight size={18} />
              </Link>
              <Link href={`/inquiry?product=${product.slug}`} className="button button-secondary button-large">
                <MessageSquareText size={18} /> 技术咨询
              </Link>
            </div>
            <p className="detail-note">价格受规格、数量、定制要求与交付地区影响，请提交需求获取报价。</p>
          </div>
        </div>
      </section>

      <nav className="detail-anchor-nav" aria-label="产品详情导航">
        <div className="container">
          <a href="#overview">产品概览</a>
          <a href="#specifications">技术参数</a>
          <a href="#variants">规格与货号</a>
          <a href="#documents">技术资料</a>
        </div>
      </nav>

      <section className="section detail-content" id="overview">
        <div className="container detail-two-column">
          <div>
            <span className="eyebrow">PRODUCT OVERVIEW</span>
            <h2>产品概览</h2>
          </div>
          <div className="overview-copy">
            <p className="overview-lead">{product.summary}</p>
            <div className="feature-application-grid">
              <div>
                <h3><FlaskConical size={19} /> 特点与优势</h3>
                <ul>
                  {product.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}
                </ul>
              </div>
              <div>
                <h3><MessageSquareText size={19} /> 典型应用</h3>
                <ul>
                  {product.applications.map((application) => <li key={application}><Check size={16} />{application}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section detail-spec-section" id="specifications">
        <div className="container">
          <div className="detail-section-heading">
            <div><span className="eyebrow">SPECIFICATIONS</span><h2>技术参数</h2></div>
            <span>参数来自现有产品资料；定制规格请咨询确认。</span>
          </div>
          <div className="spec-table">
            {product.specs.map((spec) => (
              <div key={spec.label}><span>{spec.label}</span><strong>{spec.value}</strong></div>
            ))}
            <div><span>产品类别</span><strong>{category.name}</strong></div>
            <div><span>品牌</span><strong>More Pure TECH / 猫谱科技</strong></div>
          </div>
        </div>
      </section>

      <section className="section variant-section" id="variants">
        <div className="container">
          <div className="detail-section-heading">
            <div><span className="eyebrow">ORDERING INFORMATION</span><h2>规格与货号</h2></div>
            <Link href={`/inquiry?product=${product.slug}`} className="inline-link">咨询更多规格 <span>→</span></Link>
          </div>
          <div className="responsive-table-wrap">
            <table>
              <thead><tr><th>货号 / 型号</th><th>规格</th><th>包装</th><th>操作</th></tr></thead>
              <tbody>
                {product.variants.map((variant) => (
                  <tr key={`${variant.code}-${variant.specification}`}>
                    <td><code>{variant.code}</code></td>
                    <td>{variant.specification}</td>
                    <td>{variant.packaging ?? "请咨询"}</td>
                    <td><Link href={`/inquiry?product=${product.slug}`}>获取报价 →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section document-section" id="documents">
        <div className="container">
          <div className="detail-section-heading">
            <div><span className="eyebrow">DOCUMENTS</span><h2>技术资料</h2></div>
            <Link href="/resources" className="inline-link">进入资料库 <span>→</span></Link>
          </div>
          {product.documents.length ? (
            <div className="document-grid">
              {product.documents.map((document) => (
                <a href="/inquiry" key={document.href}>
                  <span className="doc-icon"><FileText size={22} /></span>
                  <div><small>{document.type} · {document.format ?? "PDF"}</small><strong>{document.title}</strong></div>
                  <Download size={19} />
                </a>
              ))}
            </div>
          ) : (
            <div className="controlled-doc-callout">
              <FileText size={25} />
              <div><strong>资料可按需申请</strong><p>该系列的公开说明书暂未纳入演示资料库，可提交产品与应用信息申请。</p></div>
              <Link href={`/inquiry?product=${product.slug}`} className="button button-secondary">申请资料</Link>
            </div>
          )}
        </div>
      </section>

      {related.length ? (
        <section className="section related-section">
          <div className="container">
            <div className="detail-section-heading"><div><span className="eyebrow">RELATED PRODUCTS</span><h2>相关产品</h2></div></div>
            <div className="related-grid">
              {related.map((item) => (
                <Link href={`/products/${item.slug}`} key={item.slug}>
                  <div className="related-image"><Image src={item.image} alt="" fill sizes="33vw" /></div>
                  <small>{categoryMap[item.category].name}</small><h3>{item.name}</h3><span>{item.code} <ArrowRight size={15} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
