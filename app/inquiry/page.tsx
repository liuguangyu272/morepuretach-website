import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, Clock3, MessageSquareText, ShieldCheck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { getManagedProducts } from "@/data/product-store";
import { contact } from "@/data/site";

export const metadata: Metadata = { title: "获取报价", description: "提交猫谱科技产品报价、产品选型、技术支持、资料申请或定制开发需求。" };

export default async function InquiryPage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const params = await searchParams;
  const initialProduct = Array.isArray(params.product) ? params.product[0] : params.product;
  const products = await getManagedProducts();
  return (
    <main className="inquiry-page">
      <section className="inquiry-hero"><div className="container"><div className="breadcrumbs dark-breadcrumbs"><Link href="/">首页</Link><ChevronRight size={14} /><span>获取报价</span></div><div className="inquiry-hero-grid"><div><span className="eyebrow">REQUEST A QUOTE</span><h1>告诉我们您要解决什么问题</h1><p>填写产品、规格与应用信息。表单会自动带入您从产品页选择的系列。</p></div><div className="inquiry-assurance"><span><MessageSquareText size={19} /><div><strong>清晰沟通</strong><small>产品、规格与应用一起提交</small></div></span><span><Clock3 size={19} /><div><strong>尽快响应</strong><small>两位销售共同处理全部询价</small></div></span><span><ShieldCheck size={19} /><div><strong>可靠记录</strong><small>提交内容保存后通知负责邮箱</small></div></span></div></div></div></section>
      <section className="section inquiry-form-section"><div className="container inquiry-layout"><div className="inquiry-sidebar"><span className="eyebrow">WHAT TO PREPARE</span><h2>准备这些信息更快得到建议</h2><ul><li><Check size={16} />目标物与样品基质</li><li><Check size={16} />当前分析或纯化方法</li><li><Check size={16} />关键粒径、孔径或表面基团</li><li><Check size={16} />用量、包装与时间要求</li></ul><div className="inquiry-demo-note"><strong>处理方式</strong><p>询价将统一通知 <a href={`mailto:${contact.email}`}>{contact.email}</a>，由两位销售共同负责并尽快响应。</p></div></div><QuoteForm products={products} initialProduct={initialProduct ?? ""} /></div></section>
    </main>
  );
}
