import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, FlaskConical } from "lucide-react";
import { categories, categoryMap, products } from "@/data/products";
import { solutions } from "@/data/site";

export const metadata: Metadata = {
  title: "应用与解决方案",
  description: "从生物医药分离、食品安全、荧光检测与毒品分析场景查找猫谱科技产品和材料。",
};

export default function SolutionsPage() {
  return (
    <main>
      <section className="page-hero solutions-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">首页</Link><ChevronRight size={14} /><span>应用与解决方案</span></div>
          <div className="page-hero-grid">
            <div><span className="eyebrow light">APPLICATION-LED DISCOVERY</span><h1>从问题出发，找到合适材料。</h1><p>围绕样品、目标物与方法路径组织产品，帮助不知道具体产品名称的用户完成选型。</p></div>
            <div className="solution-hero-diagram">
              <span>样品与目标物</span><i>→</i><span>分离 / 富集 / 检测</span><i>→</i><span>材料与规格</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section solution-overview-section">
        <div className="container solution-overview-grid">
          {solutions.map((solution, index) => (
            <a href={`#${solution.slug}`} key={solution.slug}>
              <span>0{index + 1}</span><div><small>{solution.enTitle}</small><strong>{solution.title}</strong></div><ArrowRight size={18} />
            </a>
          ))}
        </div>
      </section>

      <section className="solution-detail-list">
        {solutions.map((solution, index) => {
          const matching = products.filter((product) => solution.categories.includes(product.category)).slice(0, 3);
          const image = categories.find((category) => category.slug === solution.categories[0])?.image ?? "/assets/silica-microspheres.jpg";
          return (
            <article className={index % 2 ? "solution-detail alternate" : "solution-detail"} id={solution.slug} key={solution.slug}>
              <div className="container solution-detail-grid">
                <div className="solution-detail-image"><Image src={image} alt={solution.title} fill sizes="(max-width: 900px) 100vw, 45vw" /><span>0{index + 1}</span></div>
                <div className="solution-detail-copy">
                  <span className="eyebrow">{solution.enTitle}</span><h2>{solution.title}</h2><h3>{solution.kicker}</h3><p>{solution.description}</p>
                  <ul>{solution.points.map((point) => <li key={point}><Check size={16} />{point}</li>)}</ul>
                  <div className="recommended-products"><small>推荐产品</small>{matching.map((product) => <Link href={`/products/${product.slug}`} key={product.slug}><span>{product.name}</span><code>{product.code}</code><ArrowRight size={15} /></Link>)}</div>
                  <Link href="/inquiry" className="button button-primary">咨询解决方案 <ArrowRight size={17} /></Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="section custom-solution-section">
        <div className="container custom-solution-card">
          <span className="custom-icon"><FlaskConical size={30} /></span>
          <div><span className="eyebrow light">CUSTOM DEVELOPMENT</span><h2>现有规格无法覆盖您的方法？</h2><p>可从微球基质、粒径、表面基团、色谱柱规格与样品前处理流程开始讨论定制路径。</p></div>
          <Link href="/inquiry" className="button button-light">提交定制需求 <ArrowRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
}
