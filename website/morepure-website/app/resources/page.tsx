import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Download, FileCheck2, FileText, FolderOpen } from "lucide-react";
import { resources } from "@/data/site";

export const metadata: Metadata = {
  title: "技术资料",
  description: "下载猫谱科技已核入演示站的产品说明书与公开彩页。",
};

export default function ResourcesPage() {
  return (
    <main>
      <section className="page-hero resources-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">首页</Link><ChevronRight size={14} /><span>技术资料</span></div>
          <div className="page-hero-grid">
            <div><span className="eyebrow light">TECHNICAL LIBRARY</span><h1>技术资料</h1><p>集中查找已核入演示站的产品说明与公开彩页，并回到对应产品继续选型。</p></div>
            <div className="resource-hero-count"><FolderOpen size={28} /><strong>{resources.length}</strong><span>份演示资料已整理</span></div>
          </div>
        </div>
      </section>

      <section className="section resource-library-section">
        <div className="container">
          <div className="resource-library-toolbar">
            <div><span className="eyebrow">DOCUMENTS</span><h2>资料库</h2></div>
            <div className="resource-type-pills"><span>{resources.length} 份资料已核入演示站</span></div>
          </div>
          <div className="resource-card-grid">
            {resources.map((resource, index) => (
              <article className="resource-card" key={resource.href}>
                <div className="resource-card-top"><span className="resource-file-icon"><FileText size={25} /></span><span className="resource-index">{String(index + 1).padStart(2, "0")}</span></div>
                <span className="resource-meta">{resource.type} / {resource.version}</span>
                <h3>{resource.title}</h3>
                <p>{resource.category}</p>
                <div className="resource-card-actions">
                  <a href={resource.href} target="_blank" rel="noreferrer">打开 PDF <ArrowRight size={15} /></a>
                  <a href={resource.href} download aria-label={`下载${resource.title}`}><Download size={17} /></a>
                </div>
              </article>
            ))}
          </div>
          <div className="resource-disclaimer"><FileCheck2 size={21} /><div><strong>资料版本说明</strong><p>演示站中的文件来自现有公司素材。正式发布前应由产品负责人复核型号、参数、版本日期与公开权限。</p></div></div>
        </div>
      </section>

      <section className="controlled-resource-section">
        <div className="container controlled-resource-grid">
          <div><span className="eyebrow light">CONTROLLED DOCUMENTS</span><h2>需要指定产品的详细资料？</h2><p>可提交产品型号、应用和用途，申请未公开的说明书、选型资料或进一步技术支持。</p></div>
          <Link href="/inquiry" className="button button-light">申请技术资料 <ArrowRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
}
