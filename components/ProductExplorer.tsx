"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  categories,
  categoryMap,
  type CategorySlug,
  type Product,
} from "@/data/products";

function normalizeSearchValue(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\s\-_/（）()·,.，。]+/g, "");
}

function subsequenceScore(query: string, target: string) {
  if (!query || !target) return 0;
  let queryIndex = 0;
  let firstMatch = -1;
  let lastMatch = -1;
  for (let targetIndex = 0; targetIndex < target.length && queryIndex < query.length; targetIndex += 1) {
    if (target[targetIndex] === query[queryIndex]) {
      if (firstMatch < 0) firstMatch = targetIndex;
      lastMatch = targetIndex;
      queryIndex += 1;
    }
  }
  if (queryIndex !== query.length) return 0;
  const span = lastMatch - firstMatch + 1;
  return 45 + Math.max(0, 20 - (span - query.length) * 3);
}

function getSearchScore(product: Product, rawQuery: string) {
  const query = normalizeSearchValue(rawQuery);
  if (!query) return 1;

  const name = normalizeSearchValue(product.name);
  const enName = normalizeSearchValue(product.enName);
  const code = normalizeSearchValue(product.code);
  const aliases = (product.searchAliases ?? []).map(normalizeSearchValue);
  const details = normalizeSearchValue([
    product.summary,
    ...product.specs.flatMap((spec) => [spec.label, spec.value]),
    ...product.features,
    ...product.applications,
    ...product.variants.map((variant) => variant.code),
  ].join(" "));

  if (name === query || aliases.includes(query) || code === query) return 120;
  if (name.includes(query)) return 105;
  if (aliases.some((alias) => alias.includes(query))) return 100;
  if (code.includes(query) || enName.includes(query)) return 90;
  const nameSubsequence = subsequenceScore(query, name);
  if (nameSubsequence) return nameSubsequence;
  if (details.includes(query)) return 35;
  return subsequenceScore(query, details) > 0 ? 20 : 0;
}

export default function ProductExplorer({
  catalogProducts,
  initialCategory = "all",
  initialQuery = "",
}: {
  catalogProducts: Product[];
  initialCategory?: CategorySlug | "all";
  initialQuery?: string;
}) {
  const [category, setCategory] = useState<CategorySlug | "all">(initialCategory);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => setCategory(initialCategory), [initialCategory]);
  useEffect(() => setQuery(initialQuery), [initialQuery]);

  const filtered = useMemo(() => {
    return catalogProducts
      .map((product, index) => ({ product, index, score: getSearchScore(product, query) }))
      .filter(({ product, score }) =>
        (category === "all" || product.category === category) && score > 0,
      )
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map(({ product }) => product);
  }, [catalogProducts, category, query]);

  return (
    <div className="product-explorer">
      <aside className="filter-panel">
        <div className="filter-heading">
          <SlidersHorizontal size={18} />
          <span>产品分类</span>
        </div>
        <button
          type="button"
          className={category === "all" ? "filter-option active" : "filter-option"}
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
        >
          <span>全部产品</span>
          <em>{catalogProducts.length}</em>
        </button>
        {categories.map((item) => {
          const count = catalogProducts.filter((product) => product.category === item.slug).length;
          return (
            <button
              type="button"
              className={category === item.slug ? "filter-option active" : "filter-option"}
              aria-pressed={category === item.slug}
              onClick={() => setCategory(item.slug)}
              key={item.slug}
            >
              <span>{item.name}</span>
              <em>{count}</em>
            </button>
          );
        })}
        <div className="filter-help">
          <strong>需要选型协助？</strong>
          <p>提交目标物、样品与方法信息，由技术人员协助筛选。</p>
          <Link href="/inquiry">提交选型需求 →</Link>
        </div>
      </aside>

      <div className="product-results">
        <div className="catalog-search">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="支持简称检索，如硅球、农残包、C18"
            aria-label="筛选产品"
          />
          {query ? (
            <button type="button" aria-label="清空搜索" onClick={() => setQuery("")}>
              <X size={18} />
            </button>
          ) : null}
        </div>

        <div className="mobile-filter-chips" aria-label="按产品分类筛选">
          <button
            type="button"
            className={category === "all" ? "chip active" : "chip"}
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            全部
          </button>
          {categories.map((item) => (
            <button
              type="button"
              className={category === item.slug ? "chip active" : "chip"}
              aria-pressed={category === item.slug}
              onClick={() => setCategory(item.slug)}
              key={item.slug}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="result-meta" role="status" aria-live="polite">
          <div>
            <strong>
              {category === "all" ? "全部产品" : categoryMap[category].name}
            </strong>
            <span>共 {filtered.length} 个产品系列</span>
          </div>
          <span>默认排序：推荐优先</span>
        </div>

        {filtered.length ? (
          <div className="catalog-grid">
            {filtered.map((product) => (
              <article className="catalog-card" key={product.slug}>
                <Link href={`/products/${product.slug}`} className="catalog-image">
                  <Image
                    src={product.image}
                    alt={`${product.name}（${categoryMap[product.category].name}类别示意图）`}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                  {product.badge ? <span className="product-badge">{product.badge}</span> : null}
                </Link>
                <div className="catalog-card-body">
                  <span className="catalog-category">
                    {categoryMap[product.category].name}
                  </span>
                  <h3>
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="product-en-name">{product.enName}</p>
                  <p className="catalog-summary">{product.summary}</p>
                  <div className="catalog-specs">
                    {product.specs.slice(0, 2).map((spec) => (
                      <span key={spec.label}>
                        <small>{spec.label}</small>
                        <strong>{spec.value}</strong>
                      </span>
                    ))}
                  </div>
                  <div className="catalog-card-footer">
                    <span className="product-code">{product.code}</span>
                    <Link href={`/products/${product.slug}`} aria-label={`查看${product.name}详情`}>
                      查看详情 <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h3>暂未找到匹配产品</h3>
            <p>请尝试缩短关键词、清除分类，或提交选型需求。</p>
            <div>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                清除筛选
              </button>
              <Link href="/inquiry" className="button button-primary">
                提交选型需求
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
