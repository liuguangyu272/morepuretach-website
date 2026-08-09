"use client";

import Link from "next/link";
import { Check, CheckCircle2, Paperclip, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { products } from "@/data/products";

export default function QuoteForm({ initialProduct = "" }: { initialProduct?: string }) {
  const matchedProduct = useMemo(
    () =>
      products.find(
        (product) =>
          product.slug === initialProduct ||
          product.name === initialProduct ||
          product.code === initialProduct,
      ),
    [initialProduct],
  );
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(matchedProduct?.slug ?? "");
  const [productCode, setProductCode] = useState(matchedProduct?.code ?? "");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedProduct(matchedProduct?.slug ?? "");
    setProductCode(matchedProduct?.code ?? "");
  }, [matchedProduct]);

  useEffect(() => {
    if (!submitted) return;
    requestAnimationFrame(() => {
      successRef.current?.focus();
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [submitted]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const now = new Date();
    const id = `MP-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReference(id);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="quote-success"
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <span className="success-icon">
          <CheckCircle2 size={34} />
        </span>
        <span className="eyebrow">FORM PREVIEW COMPLETE</span>
        <h2>表单校验已完成</h2>
        <p>
          演示编号 <strong>{reference}</strong>。当前为网站演示版本，信息不会发送或保存；正式上线时可接入询盘数据库与邮件通知。
        </p>
        <div className="success-steps">
          <span><Check size={16} /> 表单字段校验</span>
          <span><Check size={16} /> 产品信息预填</span>
          <span><Check size={16} /> 成功状态反馈</span>
        </div>
        <div className="success-actions">
          <button className="button button-primary" onClick={() => setSubmitted(false)}>
            再提交一条
          </button>
          <Link href="/products" className="button button-secondary">
            返回产品中心
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="form-section-heading">
        <span>01</span>
        <div>
          <h2>咨询内容</h2>
          <p>帮助我们了解您需要的产品、规格和应用。</p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          <span>咨询类型 *</span>
          <select name="inquiryType" required defaultValue={matchedProduct ? "产品报价" : "产品选型"}>
            <option>产品报价</option>
            <option>产品选型</option>
            <option>技术支持</option>
            <option>资料申请</option>
            <option>定制开发/合作咨询</option>
          </select>
        </label>
        <label>
          <span>产品名称</span>
          <select
            name="product"
            value={selectedProduct}
            onChange={(event) => {
              const value = event.target.value;
              setSelectedProduct(value);
              setProductCode(products.find((product) => product.slug === value)?.code ?? "");
            }}
          >
            <option value="">暂不确定，请协助选型</option>
            {products.map((product) => (
              <option value={product.slug} key={product.slug}>
                {product.name} · {product.code}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>货号 / 型号</span>
          <input
            name="code"
            value={productCode}
            onChange={(event) => setProductCode(event.target.value)}
            placeholder="例如 C18-00512018"
          />
        </label>
        <label>
          <span>需求数量</span>
          <input name="quantity" placeholder="例如 2 支 / 50 mL / 500 mg" />
        </label>
        <label className="full-field">
          <span>应用场景</span>
          <input name="application" placeholder="例如药物有关物质分析、农残样品前处理、侧向层析" />
        </label>
        <label className="full-field">
          <span>需求说明 *</span>
          <textarea
            name="message"
            required
            minLength={10}
            rows={5}
            placeholder="请说明目标物、样品基质、当前方法、关键参数或希望解决的问题（至少 10 个字符）"
          />
        </label>
        <label className="upload-field full-field">
          <Paperclip size={18} />
          <span>
            <strong>添加附件</strong>
            <small>演示入口 · 正式版可支持方法文件、谱图或需求表</small>
          </span>
          <input type="file" name="attachment" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" />
        </label>
      </div>

      <div className="form-divider" />

      <div className="form-section-heading">
        <span>02</span>
        <div>
          <h2>联系信息</h2>
          <p>用于产品选型、报价与技术沟通。</p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          <span>姓名 *</span>
          <input name="name" required minLength={2} autoComplete="name" placeholder="您的姓名" />
        </label>
        <label>
          <span>公司 / 机构 *</span>
          <input name="organization" required minLength={2} autoComplete="organization" placeholder="公司、医院、高校或实验室" />
        </label>
        <label>
          <span>联系电话 *</span>
          <input name="phone" required inputMode="tel" minLength={6} maxLength={24} autoComplete="tel" placeholder="手机或固定电话" />
        </label>
        <label>
          <span>电子邮箱</span>
          <input name="email" type="email" autoComplete="email" placeholder="name@example.com" />
        </label>
        <label className="full-field">
          <span>所在地区</span>
          <input name="region" autoComplete="address-level1" placeholder="国家 / 省市" />
        </label>
      </div>

      <label className="privacy-check">
        <input type="checkbox" name="consent" required />
        <span>
          我同意为处理本次咨询而使用以上信息。当前演示版本不会发送或保存数据。
        </span>
      </label>

      <div className="form-submit-row">
        <div>
          <ShieldCheck size={19} />
          <span>正式版可接入服务端校验、限流、邮件通知与询盘记录。</span>
        </div>
        <button type="submit" className="button button-primary button-large">
          提交咨询 <span>→</span>
        </button>
      </div>
    </form>
  );
}
