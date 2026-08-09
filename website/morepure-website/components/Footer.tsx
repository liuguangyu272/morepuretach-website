import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/products";
import { contact } from "@/data/site";
import { Brand } from "@/components/Header";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <div>
            <span className="eyebrow light">NEED SELECTION SUPPORT?</span>
            <h2>不确定哪种材料更适合？</h2>
            <p>告诉我们目标物、样品基质与分析方法，获取产品选型与规格建议。</p>
          </div>
          <div className="footer-cta-actions">
            <Link href="/inquiry" className="button button-light">
              提交选型需求 <ArrowUpRight size={17} />
            </Link>
            <a href={`tel:${contact.phones[0]}`} className="button button-ghost-light">
              <Phone size={17} /> 电话咨询
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>
            以功能化微球材料为技术基础，为分离、纯化与检测提供产品和技术支持。
          </p>
          <div className="footer-address">
            <MapPin size={17} />
            <span>{contact.address}</span>
          </div>
        </div>

        <div className="footer-column">
          <h3>产品中心</h3>
          {categories.map((category) => (
            <Link href={`/products?category=${category.slug}`} key={category.slug}>
              {category.name}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>技术与支持</h3>
          <Link href="/solutions">应用与解决方案</Link>
          <Link href="/resources">技术资料</Link>
          <Link href="/inquiry">获取报价</Link>
          <Link href="/contact">联系我们</Link>
          <Link href="/about">关于猫谱</Link>
        </div>

        <div className="footer-contact">
          <h3>关注猫谱科技</h3>
          <div className="qr-card">
            <Image
              src="/assets/wechat-qr.jpg"
              alt="猫谱科技公众号二维码"
              width={118}
              height={118}
            />
            <div>
              <strong>微信公众号</strong>
              <span>扫码获取产品与技术动态</span>
            </div>
          </div>
          <a href={`tel:${contact.phones[0]}`} className="footer-phone">
            {contact.phones[0]}
          </a>
          <span className="footer-hours">服务时间 {contact.hours}</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 {contact.company}</span>
          <div>
            <span>{contact.website}</span>
            <span>隐私政策</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
