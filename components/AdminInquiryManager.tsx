"use client";

import Link from "next/link";
import { Download, FileText, Inbox, Mail, Save, Search, UserRoundCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { inquiryStatuses, type InquiryRecord, type InquiryStatus } from "@/data/inquiry-types";

const emailLabels = {
  pending: "等待发送",
  sent: "已发送",
  failed: "发送失败",
  unconfigured: "待配置授权码",
};

function dateTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function AdminInquiryManager({ initialInquiries, smtpConfigured, notificationEmail }: { initialInquiries: InquiryRecord[]; smtpConfigured: boolean; notificationEmail: string }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedId, setSelectedId] = useState(initialInquiries[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("全部");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(initialInquiries.length ? "已载入询价记录" : "尚无询价记录");

  const selected = inquiries.find((item) => item.id === selectedId);
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return inquiries.filter((item) => {
      const matchesStatus = statusFilter === "全部" || item.status === statusFilter;
      const matchesSearch = !query || [item.id, item.name, item.organization, item.phone, item.email, item.productName, item.code, item.message].join(" ").toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, search, statusFilter]);

  const today = new Date().toISOString().slice(0, 10);
  const kpis = {
    total: inquiries.length,
    newCount: inquiries.filter((item) => item.status === "新提交").length,
    today: inquiries.filter((item) => item.createdAt.startsWith(today)).length,
    emailProblems: inquiries.filter((item) => item.emailStatus === "failed" || item.emailStatus === "unconfigured").length,
  };

  function updateSelected(patch: Partial<Pick<InquiryRecord, "status" | "internalNote">>) {
    setInquiries((current) => current.map((item) => item.id === selectedId ? { ...item, ...patch } : item));
  }

  async function save() {
    if (!selected) return;
    setSaving(true);
    setMessage("正在保存跟进状态…");
    try {
      const response = await fetch(`/api/admin/inquiries/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selected.status, internalNote: selected.internalNote }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "保存失败");
      setInquiries((current) => current.map((item) => item.id === result.id ? result : item));
      setMessage(`已保存：${result.id}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-shell inquiry-admin-shell">
      <header className="admin-topbar">
        <div>
          <span className="eyebrow">INQUIRY MANAGEMENT</span>
          <h1>询价管理</h1>
          <p>所有询价统一记录并通知 {notificationEmail}，由两位销售共同负责，按“尽快响应”处理。</p>
        </div>
        <div className="admin-top-actions">
          <a className="button button-secondary" href="/api/admin/inquiries/export" download><Download size={16} /> 导出 CSV</a>
          <Link className="button button-secondary" href="/admin">产品管理</Link>
          <Link className="button button-primary" href="/inquiry" target="_blank">查看询价表单</Link>
        </div>
      </header>

      <section className="admin-kpis" aria-label="询价数据概览">
        <div><strong>{kpis.total}</strong><span>全部询价</span></div>
        <div><strong>{kpis.newCount}</strong><span>新提交</span></div>
        <div><strong>{kpis.today}</strong><span>今日新增</span></div>
        <div><strong>{kpis.emailProblems}</strong><span>邮件待处理</span></div>
      </section>

      <div className={`admin-status ${smtpConfigured ? "ready" : "warning"}`} role="status">
        <Mail size={16} /><span>{smtpConfigured ? `163 邮件通知已配置：${notificationEmail}` : `询价会保存，但 163 邮件尚缺 SMTP 授权码：${notificationEmail}`}</span>
      </div>
      <div className="admin-status" role="status"><UserRoundCheck size={16} /><span>{message}</span></div>

      <div className="inquiry-admin-workspace">
        <aside className="inquiry-list-panel">
          <div className="admin-list-heading"><div><span>询价列表</span><small>{filtered.length} / {inquiries.length}</small></div><Inbox size={20} /></div>
          <div className="inquiry-list-filters">
            <label className="admin-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索客户、产品或编号" /></label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>全部</option>{inquiryStatuses.map((status) => <option key={status}>{status}</option>)}</select>
          </div>
          <div className="inquiry-list-scroll">
            {filtered.map((item) => <button type="button" key={item.id} className={item.id === selectedId ? "active" : ""} onClick={() => setSelectedId(item.id)}><span><strong>{item.name} · {item.organization}</strong><small>{item.productName || "待协助选型"}</small></span><span><em>{item.status}</em><small>{dateTime(item.createdAt)}</small></span></button>)}
            {!filtered.length && <div className="inquiry-empty"><Inbox size={28} /><span>没有符合条件的询价</span></div>}
          </div>
        </aside>

        <main className="inquiry-editor-panel">
          {!selected ? <div className="inquiry-empty large"><Inbox size={44} /><h2>等待第一条询价</h2><p>客户提交后会在这里显示。</p></div> : <>
            <div className="admin-editor-heading"><div><span className="eyebrow">{selected.id}</span><h2>{selected.inquiryType} · {selected.productName || "待协助选型"}</h2></div><button className="button button-primary" type="button" onClick={save} disabled={saving}><Save size={16} />{saving ? "保存中" : "保存跟进"}</button></div>

            <section className="inquiry-record-summary">
              <div><small>提交时间</small><strong>{dateTime(selected.createdAt)}</strong></div>
              <div><small>邮件状态</small><strong className={`email-${selected.emailStatus}`}>{emailLabels[selected.emailStatus]}</strong></div>
              <div><small>负责销售</small><strong>{selected.assignedSales.join("、")}</strong></div>
              <div><small>响应要求</small><strong>{selected.responseExpectation}</strong></div>
            </section>

            {selected.emailError && <div className="inquiry-email-error"><Mail size={17} /><span>{selected.emailError}</span></div>}

            <section className="admin-form-section inquiry-followup">
              <h3><span>01</span> 跟进处理</h3>
              <div className="admin-form-grid">
                <label><span>询价状态</span><select value={selected.status} onChange={(event) => updateSelected({ status: event.target.value as InquiryStatus })}>{inquiryStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
                <label className="full"><span>内部备注</span><textarea rows={5} value={selected.internalNote} onChange={(event) => updateSelected({ internalNote: event.target.value })} placeholder="记录联系结果、报价进度或下一步安排" /></label>
              </div>
            </section>

            <section className="admin-form-section inquiry-details">
              <h3><span>02</span> 客户与需求</h3>
              <dl>
                <div><dt>客户</dt><dd>{selected.name} · {selected.organization}</dd></div>
                <div><dt>联系电话</dt><dd><a href={`tel:${selected.phone}`}>{selected.phone}</a></dd></div>
                <div><dt>客户邮箱</dt><dd>{selected.email ? <a href={`mailto:${selected.email}`}>{selected.email}</a> : "未填写"}</dd></div>
                <div><dt>所在地区</dt><dd>{selected.region || "未填写"}</dd></div>
                <div><dt>产品 / 货号</dt><dd>{selected.productName || "待协助选型"}{selected.code ? ` / ${selected.code}` : ""}</dd></div>
                <div><dt>数量</dt><dd>{selected.quantity || "未填写"}</dd></div>
                <div><dt>应用场景</dt><dd>{selected.application || "未填写"}</dd></div>
                <div className="full"><dt>需求说明</dt><dd>{selected.message}</dd></div>
              </dl>
              {selected.attachment && <a className="inquiry-attachment" href={`/api/admin/inquiries/${selected.id}/attachment`} download><FileText size={18} /><span><strong>{selected.attachment.originalName}</strong><small>{Math.ceil(selected.attachment.size / 1024)} KB</small></span><Download size={16} /></a>}
            </section>
          </>}
        </main>
      </div>
    </div>
  );
}
