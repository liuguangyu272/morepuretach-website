import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/products";
import { contact } from "@/data/site";
import QrCodeViewer from "@/components/QrCodeViewer";

function FooterBrandMark() {
  return (
    <svg
      className="footer-brand-mark"
      viewBox="689 458 1425 574"
      role="img"
      aria-label="猫谱科技 More Pure TECH 专注生物医药分离纯化角标"
    >
      <defs>
        <filter id="footer-mark-alpha" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.2126 -0.7152 -0.0722 0 1"
          />
          <feComponentTransfer>
            <feFuncA type="linear" slope="2.5" intercept="-0.04" />
          </feComponentTransfer>
        </filter>
        <mask
          id="footer-mark-mask"
          x="689"
          y="458"
          width="1425"
          height="574"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <image
            href="/assets/logo-tagline-source.png"
            width="2740"
            height="1536"
            filter="url(#footer-mark-alpha)"
          />
        </mask>
        <linearGradient id="footer-mark-gradient" x1="689" y1="458" x2="2114" y2="1032">
          <stop offset="0" stopColor="#7ce3dd" />
          <stop offset="0.56" stopColor="#e8fbfa" />
          <stop offset="1" stopColor="#83c7e8" />
        </linearGradient>
      </defs>
      <rect
        x="689"
        y="458"
        width="1425"
        height="574"
        fill="url(#footer-mark-gradient)"
        mask="url(#footer-mark-mask)"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <div>
            <span className="eyebrow light">NEED SELECTION SUPPORT?</span>
            <h2>不确定哪种材料更适合</h2>
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
          <FooterBrandMark />
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
            <QrCodeViewer size={90} variant="footer" />
            <div>
              <strong>微信公众号</strong>
              <span>扫码获取产品与技术动态</span>
              <a href="/assets/wechat-qr.jpg" target="_blank" rel="noreferrer" className="qr-original-link">
                打开原图
              </a>
            </div>
          </div>
          <a href={`tel:${contact.phones[0]}`} className="footer-phone">
            {contact.phoneContacts[0].number}（销售）
          </a>
          <a href={`mailto:${contact.email}`} className="footer-email">{contact.email}</a>
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
