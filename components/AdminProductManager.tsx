"use client";

import Link from "next/link";
import { Download, ExternalLink, FileUp, Inbox, Plus, Save, Search, Settings2 } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, type Product } from "@/data/products";
import type { ProductContentStore } from "@/data/product-store";

function cloneProduct(product: Product): Product {
  return JSON.parse(JSON.stringify(product)) as Product;
}

function lines(value: string) {
  return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}

function emptyProduct(): Product {
  return {
    slug: "new-product-series",
    category: "chromatography-columns",
    name: "新产品系列",
    enName: "New Product Series",
    seriesName: "新产品系列",
    codePrefix: "NEW-",
    code: "NEW-001",
    summary: "请填写产品简介",
    image: "/assets/columns.png",
    specs: [{ label: "关键参数", value: "请填写" }],
    features: ["请填写产品特点"],
    applications: ["请填写典型应用"],
    variants: [{ code: "NEW-001", specification: "请填写", packaging: "请咨询" }],
    documents: [],
    searchAliases: [],
    published: true,
    customAvailable: true,
    updatedAt: new Date().toISOString().slice(0, 10),
    sourceMaterial: "后台新增",
  };
}

export default function AdminProductManager({ initialStore }: { initialStore: ProductContentStore }) {
  const [products, setProducts] = useState(initialStore.products);
  const [selected, setSelected] = useState<Product>(() => cloneProduct(initialStore.products[0]));
  const [originalSlug, setOriginalSlug] = useState(initialStore.products[0].slug);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("已载入产品主数据");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter((product) =>
      [product.name, product.enName, product.seriesName, product.codePrefix, product.code]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [products, search]);

  const categoryCounts = useMemo(
    () => categories.map((category) => ({
      ...category,
      count: products.filter((product) => product.category === category.slug).length,
    })),
    [products],
  );

  function update<K extends keyof Product>(key: K, value: Product[K]) {
    setSelected((current) => ({ ...current, [key]: value }));
  }

  function choose(product: Product) {
    setSelected(cloneProduct(product));
    setOriginalSlug(product.slug);
    setMessage(`正在编辑：${product.name}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveProduct() {
    setSaving(true);
    setMessage("正在保存并发布…");
    try {
      const exists = products.some((product) => product.slug === originalSlug);
      const response = await fetch(exists ? `/api/admin/products/${originalSlug}` : "/api/admin/products", {
        method: exists ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "保存失败");
      const saved = result as Product;
      setProducts((current) => {
        const index = current.findIndex((product) => product.slug === originalSlug);
        if (index < 0) return [...current, saved];
        return current.map((product, productIndex) => productIndex === index ? saved : product);
      });
      setSelected(cloneProduct(saved));
      setOriginalSlug(saved.slug);
      setMessage(`已保存并发布：${saved.name}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败");
    } finally {
      setSaving(false);
    }
  }

  async function importJson(file?: File) {
    if (!file) return;
    setMessage("正在校验并导入 JSON…");
    try {
      const response = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: await file.text(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "导入失败");
      const store = result as ProductContentStore;
      setProducts(store.products);
      setSelected(cloneProduct(store.products[0]));
      setOriginalSlug(store.products[0].slug);
      setMessage(`导入完成，共 ${store.products.length} 个产品系列`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "导入失败");
    }
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div>
          <span className="eyebrow">PRODUCT CONTENT MANAGEMENT</span>
          <h1>产品内容管理后台</h1>
          <p>编辑后保存即可更新本机网站内容；中文名、英文名、系列名和货号前缀必须保持唯一。</p>
        </div>
        <div className="admin-top-actions">
          <Link className="button button-secondary" href="/admin/inquiries"><Inbox size={16} /> 询价管理</Link>
          <a className="button button-secondary" href="/api/admin/export" download><Download size={16} /> 导出 JSON</a>
          <a className="button button-secondary" href="/api/admin/export?format=csv" download><Download size={16} /> 导出 CSV</a>
          <label className="button button-secondary admin-import"><FileUp size={16} /> 导入 JSON<input type="file" accept=".json,application/json" onChange={(event) => importJson(event.target.files?.[0])} /></label>
          <Link className="button button-primary" href="/products" target="_blank">查看前台 <ExternalLink size={16} /></Link>
        </div>
      </header>

      <section className="admin-kpis" aria-label="产品数据概览">
        <div><strong>{products.length}</strong><span>产品系列</span></div>
        <div><strong>{products.filter((product) => product.published !== false).length}</strong><span>已公开</span></div>
        <div><strong>{products.filter((product) => product.customAvailable !== false).length}</strong><span>接受定制</span></div>
        <div><strong>{categories.length}</strong><span>产品分类</span></div>
      </section>

      <div className="admin-status" role="status"><Settings2 size={16} /><span>{message}</span></div>

      <div className="admin-workspace">
        <aside className="admin-product-list">
          <div className="admin-list-heading"><div><span>产品目录</span><small>{filtered.length} / {products.length}</small></div><button type="button" onClick={() => { const product = emptyProduct(); setSelected(product); setOriginalSlug(""); setMessage("正在新增产品"); }}><Plus size={16} /> 新增</button></div>
          <label className="admin-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索名称、系列或货号" /></label>
          <div className="admin-category-summary">{categoryCounts.map((category) => <span key={category.slug}>{category.name}<strong>{category.count}</strong></span>)}</div>
          <div className="admin-product-scroll">
            {filtered.map((product) => (
              <button type="button" key={product.slug} className={product.slug === originalSlug ? "active" : ""} onClick={() => choose(product)}>
                <span>{product.name}</span><small>{product.codePrefix} · {product.published === false ? "未公开" : "公开"}</small>
              </button>
            ))}
          </div>
        </aside>

        <main className="admin-editor">
          <div className="admin-editor-heading"><div><span className="eyebrow">EDIT PRODUCT</span><h2>{selected.name}</h2></div><div><Link href={`/products/${selected.slug}`} target="_blank" className="inline-link">预览产品 <span>↗</span></Link><button type="button" className="button button-primary" onClick={saveProduct} disabled={saving}><Save size={16} /> {saving ? "保存中" : "保存并发布"}</button></div></div>

          <section className="admin-form-section">
            <h3><span>01</span> 唯一命名与发布状态</h3>
            <div className="admin-form-grid">
              <label><span>产品 ID *</span><input value={selected.slug} onChange={(event) => update("slug", event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} /></label>
              <label><span>产品分类 *</span><select value={selected.category} onChange={(event) => update("category", event.target.value as Product["category"])}>{categories.map((category) => <option value={category.slug} key={category.slug}>{category.name}</option>)}</select></label>
              <label><span>中文名称 *</span><input value={selected.name} onChange={(event) => update("name", event.target.value)} /></label>
              <label><span>英文名称 *</span><input value={selected.enName} onChange={(event) => update("enName", event.target.value)} /></label>
              <label><span>系列名称 *</span><input value={selected.seriesName ?? ""} onChange={(event) => update("seriesName", event.target.value)} /></label>
              <label><span>货号前缀 *</span><input value={selected.codePrefix ?? ""} onChange={(event) => update("codePrefix", event.target.value)} /></label>
              <label><span>代表货号 *</span><input value={selected.code} onChange={(event) => update("code", event.target.value)} /></label>
              <label><span>标签</span><input value={selected.badge ?? ""} onChange={(event) => update("badge", event.target.value)} /></label>
              <label className="admin-check"><input type="checkbox" checked={selected.published !== false} onChange={(event) => update("published", event.target.checked)} /><span>正式对外公开</span></label>
              <label className="admin-check"><input type="checkbox" checked={selected.customAvailable !== false} onChange={(event) => update("customAvailable", event.target.checked)} /><span>接受定制咨询</span></label>
            </div>
          </section>

          <section className="admin-form-section">
            <h3><span>02</span> 产品介绍</h3>
            <div className="admin-form-grid">
              <label className="full"><span>产品简介 *</span><textarea rows={4} value={selected.summary} onChange={(event) => update("summary", event.target.value)} /></label>
              <label className="full"><span>产品图片路径 *</span><input value={selected.image} onChange={(event) => update("image", event.target.value)} /></label>
              <label><span>产品特点（每行一项）</span><textarea rows={6} value={selected.features.join("\n")} onChange={(event) => update("features", lines(event.target.value))} /></label>
              <label><span>典型应用（每行一项）</span><textarea rows={6} value={selected.applications.join("\n")} onChange={(event) => update("applications", lines(event.target.value))} /></label>
              <label className="full"><span>搜索别名（每行一项）</span><textarea rows={3} value={(selected.searchAliases ?? []).join("\n")} onChange={(event) => update("searchAliases", lines(event.target.value))} /></label>
              <label className="full"><span>资料来源</span><textarea rows={2} value={selected.sourceMaterial ?? ""} onChange={(event) => update("sourceMaterial", event.target.value)} /></label>
            </div>
          </section>

          <section className="admin-form-section">
            <div className="admin-section-title"><h3><span>03</span> 技术参数</h3><button type="button" onClick={() => update("specs", [...selected.specs, { label: "新参数", value: "" }])}><Plus size={15} /> 添加参数</button></div>
            <div className="admin-repeat-list">{selected.specs.map((spec, index) => <div key={`${index}-${spec.label}`}><input value={spec.label} onChange={(event) => update("specs", selected.specs.map((item, itemIndex) => itemIndex === index ? { ...item, label: event.target.value } : item))} placeholder="参数名" /><input value={spec.value} onChange={(event) => update("specs", selected.specs.map((item, itemIndex) => itemIndex === index ? { ...item, value: event.target.value } : item))} placeholder="参数值" /><button type="button" onClick={() => update("specs", selected.specs.filter((_, itemIndex) => itemIndex !== index))}>移除</button></div>)}</div>
          </section>

          <section className="admin-form-section">
            <div className="admin-section-title"><h3><span>04</span> 规格与货号</h3><button type="button" onClick={() => update("variants", [...selected.variants, { code: selected.codePrefix ?? "", specification: "", packaging: "请咨询" }])}><Plus size={15} /> 添加规格</button></div>
            <div className="admin-repeat-list variants">{selected.variants.map((variant, index) => <div key={`${index}-${variant.code}`}><input value={variant.code} onChange={(event) => update("variants", selected.variants.map((item, itemIndex) => itemIndex === index ? { ...item, code: event.target.value } : item))} placeholder="货号" /><input value={variant.specification} onChange={(event) => update("variants", selected.variants.map((item, itemIndex) => itemIndex === index ? { ...item, specification: event.target.value } : item))} placeholder="规格" /><input value={variant.packaging ?? ""} onChange={(event) => update("variants", selected.variants.map((item, itemIndex) => itemIndex === index ? { ...item, packaging: event.target.value } : item))} placeholder="包装" /><button type="button" onClick={() => update("variants", selected.variants.filter((_, itemIndex) => itemIndex !== index))}>移除</button></div>)}</div>
          </section>

          <section className="admin-form-section">
            <div className="admin-section-title"><h3><span>05</span> 受控资料</h3><button type="button" onClick={() => update("documents", [...selected.documents, { title: "新资料", type: "产品说明", href: "/downloads/", format: "PDF" }])}><Plus size={15} /> 添加资料</button></div>
            <div className="admin-repeat-list documents">{selected.documents.map((document, index) => <div key={`${index}-${document.href}`}><input value={document.title} onChange={(event) => update("documents", selected.documents.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item))} placeholder="资料名称" /><select value={document.type} onChange={(event) => update("documents", selected.documents.map((item, itemIndex) => itemIndex === index ? { ...item, type: event.target.value as typeof document.type } : item))}><option>产品说明</option><option>测试报告</option><option>产品彩页</option><option>产品目录</option></select><input value={document.href} onChange={(event) => update("documents", selected.documents.map((item, itemIndex) => itemIndex === index ? { ...item, href: event.target.value } : item))} placeholder="/downloads/file.pdf" /><button type="button" onClick={() => update("documents", selected.documents.filter((_, itemIndex) => itemIndex !== index))}>移除</button></div>)}</div>
          </section>

          <div className="admin-save-footer"><span>最后更新：{selected.updatedAt ?? "尚未保存"}</span><button type="button" className="button button-primary button-large" onClick={saveProduct} disabled={saving}><Save size={17} /> {saving ? "正在保存" : "保存并发布产品"}</button></div>
        </main>
      </div>
    </div>
  );
}
