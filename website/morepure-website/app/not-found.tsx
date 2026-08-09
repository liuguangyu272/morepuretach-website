import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return <main className="not-found"><div><span>404</span><Search size={30} /><h1>没有找到这个页面</h1><p>该内容可能已移动、下架，或链接输入有误。</p><div><Link href="/products" className="button button-primary">返回产品中心 <ArrowRight size={17} /></Link><Link href="/" className="button button-secondary">返回首页</Link></div></div></main>;
}
