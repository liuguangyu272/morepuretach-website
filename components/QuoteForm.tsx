"use client";

import Link from "next/link";
import { AlertCircle, Check, CheckCircle2, LoaderCircle, Paperclip, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { Product } from "@/data/products";

type SubmissionResult = { id: string; emailStatus: string; responseExpectation: string };

export default function QuoteForm({ initialProduct = "", products }: { initialProduct?: string; products: Product[] }) {
  const matchedProduct = useMemo(
    () => products.find((product) => product.slug === initialProduct || product.name === initialProduct || product.code === initialProduct),
    [initialProduct, products],
  );
  const [result, setResult] = useState<SubmissionResult>();
  const [selectedProduct, setSelectedProduct] = useState(matchedProduct?.slug ?? "");
  const [productCode, setProductCode] = useState(matchedProduct?.code ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const startedAtRef = useRef(Date.now());
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedProduct(matchedProduct?.slug ?? "");
    setProductCode(matchedProduct?.code ?? "");
  }, [matchedProduct]);

  useEffect(() => {
    if (!result) return;
    requestAnimationFrame(() => {
      successRef.current?.focus();
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [result]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData(form);
      formData.set("startedAt", String(startedAtRef.current));
      const response = await fetch("/api/inquiries", { method: "POST", body: formData });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "提交失败，请稍后重试");
      setResult(payload as SubmissionResult);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "提交失败，请稍后重试或电话联系");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setResult(undefined);
    setError("");
    startedAtRef.current = Date.now();
  }

  if (result) {
    return (
      <div ref={successRef} className="quote-success" role="status" aria-live="polite" tabIndex={-1}>
        <span className="success-icon"><CheckCircle2 size={34} /></span>
        <span className="eyebrow">REQUEST RECEIVED</span>
        <h2>咨询已提交</h2>
        <p>询价编号 <strong>{result.id}</strong>。信息已进入销售跟进记录，两位销售会共同处理并尽快与您联系。</p>
        <div className="success-steps">
          <span><Check size={16} /> 询价已可靠保存</span>
          <span><Check size={16} /> 两位销售共同负责</span>
          <span><Check size={16} /> 尽快响应</span>
        </div>
        <div className="success-actions">
          <button className="button button-primary" onClick={reset}>再提交一条</button>
          <Link href="/products" className="button button-secondary">返回产品中心</Link>
        </div>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <input className="form-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="form-section-heading"><span>01</span><div><h2>咨询内容</h2><p>帮助我们了解您需要的产品、规格和应用。</p></div></div>
      <div className="form-grid">
        <label><span>咨询类型 *</span><select name="inquiryType" required defaultValue={matchedProduct ? "产品报价" : "产品选型"}><option>产品报价</option><option>产品选型</option><option>技术支持</option><option>资料申请</option><option>定制开发/合作咨询</option></select></label>
        <label><span>产品名称</span><select name="product" value={selectedProduct} onChange={(event) => { const value = event.target.value; setSelectedProduct(value); setProductCode(products.find((product) => product.slug === value)?.code ?? ""); }}><option value="">暂不确定，请协助选型</option>{products.map((product) => <option value={product.slug} key={product.slug}>{product.name} · {product.code}</option>)}</select></label>
        <label><span>货号 / 型号</span><input name="code" value={productCode} onChange={(event) => setProductCode(event.target.value)} placeholder="例如 C18-00512018" /></label>
        <label><span>需求数量</span><input name="quantity" placeholder="例如 2 支 / 50 mL / 500 mg" /></label>
        <label className="full-field"><span>应用场景</span><input name="application" placeholder="例如药物有关物质分析、农残样品前处理、侧向层析" /></label>
        <label className="full-field"><span>需求说明 *</span><textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="请说明目标物、样品基质、当前方法、关键参数或希望解决的问题（至少 10 个字符）" /></label>
        <label className="upload-field full-field"><Paperclip size={18} /><span><strong>添加附件（可选）</strong><small>PDF、Word、Excel 或图片，最大 5 MB</small></span><input type="file" name="attachment" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" /></label>
      </div>

      <div className="form-divider" />
      <div className="form-section-heading"><span>02</span><div><h2>联系信息</h2><p>用于产品选型、报价与技术沟通。</p></div></div>
      <div className="form-grid">
        <label><span>姓名 *</span><input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="您的姓名" /></label>
        <label><span>公司 / 机构 *</span><input name="organization" required minLength={2} maxLength={160} autoComplete="organization" placeholder="公司、医院、高校或实验室" /></label>
        <label><span>联系电话 *</span><input name="phone" required inputMode="tel" minLength={6} maxLength={24} autoComplete="tel" placeholder="手机或固定电话" /></label>
        <label><span>电子邮箱</span><input name="email" type="email" maxLength={160} autoComplete="email" placeholder="name@example.com" /></label>
        <label className="full-field"><span>所在地区</span><input name="region" maxLength={160} autoComplete="address-level1" placeholder="国家 / 省市" /></label>
      </div>

      <label className="privacy-check"><input type="checkbox" name="consent" required /><span>我同意猫谱科技为处理本次咨询而保存并使用以上信息，仅用于产品、报价和技术沟通。</span></label>
      {error && <div className="form-error" role="alert"><AlertCircle size={18} /><span>{error}</span></div>}
      <div className="form-submit-row"><div><ShieldCheck size={19} /><span>已启用服务端校验、限流、询价保存与负责邮箱通知。</span></div><button type="submit" className="button button-primary button-large" disabled={submitting}>{submitting ? <><LoaderCircle className="spin" size={17} /> 正在提交</> : <>提交咨询 <span>→</span></>}</button></div>
    </form>
  );
}
