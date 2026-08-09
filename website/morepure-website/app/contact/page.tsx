import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock3, MapPin, Phone, QrCode } from "lucide-react";
import { contact } from "@/data/site";

export const metadata: Metadata = { title: "联系我们", description: "联系南京猫谱科技，咨询产品选型、报价、技术资料与定制合作。" };

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero contact-hero"><div className="container"><div className="breadcrumbs"><Link href="/">首页</Link><ChevronRight size={14} /><span>联系我们</span></div><div className="page-hero-grid"><div><span className="eyebrow light">CONTACT MORE PURE</span><h1>让我们从您的应用开始。</h1><p>产品选型、规格报价、技术资料或定制合作，欢迎提供目标物、样品与方法信息。</p></div><div className="contact-hero-phone"><small>产品与技术咨询</small><a href={`tel:${contact.phones[0]}`}>{contact.phones[0]}</a><span>服务时间 {contact.hours}</span></div></div></div></section>

      <section className="section contact-options-section"><div className="container contact-options-grid"><article><span><Phone size={22} /></span><small>PHONE</small><h2>电话咨询</h2><p>适合快速确认产品、规格与资料。</p><div>{contact.phones.map((phone) => <a href={`tel:${phone}`} key={phone}>{phone}</a>)}</div></article><article><span><Clock3 size={22} /></span><small>REQUEST</small><h2>在线提交需求</h2><p>适合包含多个参数、应用背景或定制要求的咨询。</p><Link href="/inquiry">填写咨询表单 <ArrowRight size={16} /></Link></article><article><span><QrCode size={22} /></span><small>WECHAT</small><h2>关注公众号</h2><p>获取产品与技术动态，保存联系入口。</p><div className="contact-qr"><Image src="/assets/wechat-qr.jpg" alt="猫谱科技公众号二维码" width={100} height={100} /></div></article></div></section>

      <section className="section address-section"><div className="container address-grid"><div className="address-map"><div className="map-grid-lines" /><span className="map-pin"><MapPin size={24} /></span><span className="map-river" /><small>NANJING JIANGBEI NEW AREA</small></div><div className="address-copy"><span className="eyebrow">VISIT & CONTACT</span><h2>{contact.company}</h2><p>{contact.companyEn}</p><dl><div><dt>地址</dt><dd>{contact.address}</dd></div><div><dt>电话</dt><dd>{contact.phones.join(" / ")}</dd></div><div><dt>服务时间</dt><dd>{contact.hours}</dd></div><div><dt>官网</dt><dd>{contact.website}</dd></div></dl><Link href="/inquiry" className="button button-primary">提交咨询 <ArrowRight size={17} /></Link></div></div></section>
    </main>
  );
}
