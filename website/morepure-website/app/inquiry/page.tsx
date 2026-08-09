import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, Clock3, MessageSquareText, ShieldCheck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = { title: "获取报价", description: "提交猫谱科技产品报价、产品选型、技术支持、资料申请或定制开发需求。" };

export default async function InquiryPage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const params = await searchParams;
  const initialProduct = Array.isArray(params.product) ? params.product[0] : params.product;
  return (
    <main className="inquiry-page">
      <section className="inquiry-hero"><div className="container"><div className="breadcrumbs dark-breadcrumbs"><Link href="/">首页</Link><ChevronRight size={14} /><span>获取报价</span></div><div className="inquiry-hero-grid"><div><span className="eyebrow">REQUEST A QUOTE</span><h1>告诉我们，您要解决什么问题。</h1><p>填写产品、规格与应用信息。表单会自动带入您从产品页选择的系列。</p></div><div className="inquiry-assurance"><span><MessageSquareText size={19} /><div><strong>清晰沟通</strong><small>产品、规格与应用一起提交</small></div></span><span><Clock3 size={19} /><div><strong>高效处理</strong><small>正式版可进入销售跟进流程</small></div></span><span><ShieldCheck size={19} /><div><strong>信息保护</strong><small>正式版仅向授权人员开放</small></div></span></div></div></div></section>
      <section className="section inquiry-form-section"><div className="container inquiry-layout"><div className="inquiry-sidebar"><span className="eyebrow">WHAT TO PREPARE</span><h2>准备这些信息，会更快得到建议。</h2><ul><li><Check size={16} />目标物与样品基质</li><li><Check size={16} />当前分析或纯化方法</li><li><Check size={16} />关键粒径、孔径或表面基团</li><li><Check size={16} />用量、包装与时间要求</li></ul><div className="inquiry-demo-note"><strong>演示说明</strong><p>当前表单用于展示交互与验证，不会把数据发送到外部系统。</p></div></div><QuoteForm initialProduct={initialProduct ?? ""} /></div></section>
    </main>
  );
}
