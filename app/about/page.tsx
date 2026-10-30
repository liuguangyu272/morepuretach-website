import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, MapPin } from "lucide-react";
import { capabilities, contact } from "@/data/site";

export const metadata: Metadata = {
  title: "关于猫谱",
  description: "了解南京猫谱科技有限公司、功能化微球产品体系与分离纯化技术能力。",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero about-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">首页</Link><ChevronRight size={14} /><span>关于猫谱</span></div>
          <div className="page-hero-grid"><div><span className="eyebrow light">ABOUT MORE PURE TECH</span><h1>以微球技术为原点</h1><p>连接材料开发、表面化学、色谱装填与分析方法，为生物医药分离纯化提供更专业的整体解决方案。</p></div><div className="about-hero-mark"><strong>More</strong><strong>Pure</strong><span>更专业 · 更纯净</span></div></div>
        </div>
      </section>

      <section className="section company-story-section">
        <div className="container company-story-grid">
          <div className="company-story-copy"><span className="eyebrow">COMPANY PROFILE</span><h2>南京猫谱科技有限公司</h2><p className="story-lead">猫谱科技坐落于南京江北新区，专注于功能化微球材料及分离、纯化与检测相关产品。</p><p>公司产品涵盖分析柱和制备柱、硅胶微球、磁性微球、聚合物微球、荧光微球、萃取材料与试剂，服务场景包括生物医药、食品安全检测、毒品分析等。</p><p>依托从微球基质开发到表面修饰、从色谱柱装填到方法开发的连续技术路径，猫谱科技为客户提供选型咨询、规格定制、工艺优化与技术支持。</p><div className="story-checks"><span><Check size={16} />产品参数结构化</span><span><Check size={16} />分析至制备规格覆盖</span><span><Check size={16} />材料与应用双路径选型</span></div></div>
          <div className="company-story-image"><Image src="/assets/product-kit.png" alt="猫谱科技产品包装" fill sizes="(max-width: 900px) 100vw, 48vw" /><span>More Pure TECH / Nanjing</span></div>
        </div>
      </section>

      <section className="about-number-band">
        <div className="container about-number-grid"><div><strong>6</strong><span>大产品线</span></div><div><strong>0.06 μm–3 mm</strong><span>部分微球粒径范围</span></div><div><strong>3</strong><span>分析 / 半制备 / 制备规格</span></div><div><strong>4</strong><span>连续技术能力</span></div></div>
      </section>

      <section className="section about-capability-section">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">CAPABILITIES</span><h2>连续技术能力</h2><p>让材料、产品规格与实验方法之间建立清晰关系。</p></div></div>
          <div className="about-capability-grid">{capabilities.map((capability) => <article key={capability.index}><span>{capability.index}</span><small>{capability.enTitle}</small><h3>{capability.title}</h3><p>{capability.description}</p></article>)}</div>
        </div>
      </section>

      <section className="vision-section">
        <div className="container vision-grid"><div><span className="eyebrow light">OUR VISION</span><h2>为客户提供更专业的生物医药分离纯化整体解决方案</h2></div><div className="vision-values"><article><strong>夯实基础</strong><p>持续完善核心产品线的规格化与标准化。</p></article><article><strong>打造标杆</strong><p>聚焦具有辨识度的产品与应用增长赛道。</p></article><article><strong>引领自主</strong><p>以 More Pure 的品牌承诺，与客户并肩成长。</p></article></div></div>
      </section>

      <section className="section location-section"><div className="container location-card"><span className="location-icon"><MapPin size={28} /></span><div><span className="eyebrow">NANJING · JIANGBEI NEW AREA</span><h2>扎根南京服务多元研发与检测场景</h2><p>{contact.address}</p></div><Link href="/contact" className="button button-primary">联系我们 <ArrowRight size={17} /></Link></div></section>
    </main>
  );
}
