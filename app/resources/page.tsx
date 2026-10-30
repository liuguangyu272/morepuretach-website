import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,

  ExternalLink,
  FileCheck2,
  FileText,
  FolderOpen,
  Newspaper,
} from "lucide-react";
import QrCodeViewer from "@/components/QrCodeViewer";
import { resources, wechatArticles } from "@/data/site";

export const metadata: Metadata = {
  title: "技术资料",
  description: "申请猫谱科技产品资料，阅读微信公众号发布的技术文章与应用解读。",
};

export default function ResourcesPage() {
  return (
    <main>
      <section className="page-hero resources-hero">
        <div className="container">
          <div className="breadcrumbs"><Link href="/">首页</Link><ChevronRight size={14} /><span>技术资料</span></div>
          <div className="page-hero-grid">
            <div><span className="eyebrow light">TECHNICAL LIBRARY</span><h1>技术资料</h1><p>产品说明、彩页与测试资料需联系申请，也可阅读猫谱科技微信公众号发布的技术文章。文章保留微信原文，不重复制作 PDF。</p></div>
            <div className="resource-hero-count"><FolderOpen size={28} /><strong>{resources.length}</strong><span>类资料可申请</span></div>
          </div>
        </div>
      </section>

      <section className="resource-hub-navigation" aria-label="技术资料分类">
        <div className="container resource-hub-grid">
          <a href="#downloads" className="resource-hub-card">
            <span className="resource-hub-icon"><FolderOpen size={25} /></span>
            <div><small>01 / DOCUMENTS</small><h2>资料申请</h2><p>产品说明、公司彩页、测试报告与选型文件</p></div>
            <span>查看 {resources.length} 份资料 <ArrowRight size={16} /></span>
          </a>
          <a href="#articles" className="resource-hub-card article-entry">
            <span className="resource-hub-icon"><BookOpen size={25} /></span>
            <div><small>02 / ARTICLES</small><h2>技术文章</h2><p>公众号发布的文献解读、材料知识与应用内容</p></div>
            <span>阅读公众号原文 <ArrowRight size={16} /></span>
          </a>
        </div>
      </section>

      <section className="section resource-library-section" id="downloads">
        <div className="container">
          <div className="resource-library-toolbar">
            <div><span className="eyebrow">DOCUMENT REQUESTS</span><h2>资料申请</h2></div>
            <div className="resource-type-pills"><span>{resources.length} 类受控资料</span></div>
          </div>
          <div className="resource-card-grid">
            {resources.map((resource, index) => (
              <article className="resource-card" key={resource.href}>
                <div className="resource-card-top"><span className="resource-file-icon"><FileText size={25} /></span><span className="resource-index">{String(index + 1).padStart(2, "0")}</span></div>
                <span className="resource-meta">{resource.type} / {resource.version}</span>
                <h3>{resource.title}</h3>
                <p>{resource.category}</p>
                <div className="resource-card-actions">
                  <Link href="/inquiry">申请资料 <ArrowRight size={15} /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="resource-disclaimer"><FileCheck2 size={21} /><div><strong>资料版本说明</strong><p>资料不提供公开下载。请联系我们确认用途、适用型号与可提供的版本。</p></div></div>
        </div>
      </section>

      <section className="section technical-articles-section" id="articles">
        <div className="container">
          <div className="resource-library-toolbar article-toolbar">
            <div><span className="eyebrow light">WECHAT ARTICLES</span><h2>技术文章</h2><p>文章保留在猫谱科技微信公众号发布，本站仅提供摘要、分类和“阅读原文”入口。</p></div>
            <span className="article-source"><Newspaper size={17} /> 来源：猫谱科技公众号</span>
          </div>

          {wechatArticles.length ? (
            <div className="technical-article-grid">
              {wechatArticles.map((article, index) => (
                <article className="technical-article-card" key={article.href}>
                  <div className="technical-article-top"><span>{article.category}</span><em>{String(index + 1).padStart(2, "0")}</em></div>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <div className="technical-article-footer">
                    <time>{article.publishedAt}</time>
                    <a href={article.href} target="_blank" rel="noreferrer">阅读原文 <ExternalLink size={15} /></a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="technical-article-empty">
              <QrCodeViewer size={132} variant="contact" />
              <div>
                <span>WECHAT · MORE PURE TECH</span>
                <h3>首批技术文章正在整理</h3>
                <p>关注猫谱科技公众号可先查看历史文章。本站文章索引将保留微信原文链接，不重复上传 PDF。</p>
              </div>
              <BookOpen size={48} />
            </div>
          )}
        </div>
      </section>

      <section className="controlled-resource-section">
        <div className="container controlled-resource-grid">
          <div><span className="eyebrow light">CONTROLLED DOCUMENTS</span><h2>需要指定产品的详细资料</h2><p>可提交产品型号、应用和用途，申请未公开的说明书、选型资料或进一步技术支持。</p></div>
          <Link href="/inquiry" className="button button-light">申请技术资料 <ArrowRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
}
