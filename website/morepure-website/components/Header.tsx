"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/products";
import { contact } from "@/data/site";

const navItems = [
  { label: "产品中心", href: "/products", mega: true },
  { label: "应用与解决方案", href: "/solutions" },
  { label: "技术资料", href: "/resources" },
  { label: "关于猫谱", href: "/about" },
  { label: "联系我们", href: "/contact" },
];

export function Brand() {
  return (
    <span className="brand-lockup">
      <span className="brand-crop" aria-hidden="true">
        <img src="/assets/logo-square.jpg" alt="" />
      </span>
      <span className="brand-words">
        <strong>猫谱科技</strong>
        <small>More Pure TECH</small>
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const drawer = drawerRef.current;
    const previousOverflow = document.body.style.overflow;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || !drawer) return;
      const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.body.style.overflow = "hidden";
    drawer?.addEventListener("keydown", handleKeyDown);
    drawer?.querySelector<HTMLElement>("input, a[href], button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      drawer?.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="site-header">
        <div className="utility-bar">
          <div className="container utility-inner">
            <span className="utility-note">
              功能化微球与分离纯化产品平台
            </span>
            <div className="utility-links">
              <span>服务时间 {contact.hours}</span>
              <a href={`tel:${contact.phones[0]}`}>
                <Phone size={14} /> {contact.phones[0]}
              </a>
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="container header-main-inner">
            <Link href="/" className="brand-link" aria-label="猫谱科技首页">
              <Brand />
            </Link>

            <form className="header-search" action="/products" role="search">
              <Search size={18} aria-hidden="true" />
              <input
                name="q"
                type="search"
                placeholder="搜索产品名称、货号或应用，例如 C18 / SiO₂"
                aria-label="搜索产品"
              />
              <button type="submit">搜索</button>
            </form>

            <div className="header-actions">
              <Link href="/resources" className="text-action">
                资料下载
              </Link>
              <Link href="/inquiry" className="button button-primary button-compact">
                获取报价
              </Link>
              <button
                ref={menuButtonRef}
                className="mobile-menu-button"
                type="button"
                aria-controls="mobile-navigation"
                aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((value) => !value)}
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        <div className="nav-row">
          <div className="container nav-inner">
            <nav className="desktop-nav" aria-label="主导航">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <div className="nav-item" key={item.href}>
                    <Link
                      href={item.href}
                      className={active ? "nav-link active" : "nav-link"}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      {item.mega ? <ChevronDown size={15} /> : null}
                    </Link>
                    {item.mega ? (
                      <div className="mega-menu">
                        <div className="mega-intro">
                          <span className="eyebrow">PRODUCT CATALOG</span>
                          <h3>按材料体系快速查找</h3>
                          <p>六大产品线，支持按型号、粒径、表面基团与应用场景选型。</p>
                          <Link href="/products" className="inline-link">
                            查看全部产品 <span>→</span>
                          </Link>
                        </div>
                        <div className="mega-grid">
                          {categories.map((category) => (
                            <Link
                              href={`/products?category=${category.slug}`}
                              key={category.slug}
                              className="mega-category"
                            >
                              <span>{category.index}</span>
                              <div>
                                <strong>{category.name}</strong>
                                <small>{category.enName}</small>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
            <span className="nav-tagline">专注生物医药分离纯化</span>
          </div>
        </div>
      </header>

      <div
        ref={drawerRef}
        id="mobile-navigation"
        className={mobileOpen ? "mobile-drawer open" : "mobile-drawer"}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div className="mobile-drawer-inner">
          <form
            className="mobile-search"
            action="/products"
            role="search"
            onSubmit={() => setMobileOpen(false)}
          >
            <Search size={18} aria-hidden="true" />
            <input name="q" type="search" placeholder="搜索产品或货号" aria-label="搜索产品或货号" />
          </form>
          <nav aria-label="移动端主导航">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="mobile-nav-link"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}<span>→</span>
                </Link>
                {item.mega ? (
                  <div className="mobile-category-list">
                    {categories.map((category) => (
                      <Link
                        href={`/products?category=${category.slug}`}
                        key={category.slug}
                        onClick={() => setMobileOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
              );
            })}
          </nav>
          <Link
            href="/inquiry"
            className="button button-primary mobile-quote"
            onClick={() => setMobileOpen(false)}
          >
            获取报价
          </Link>
        </div>
      </div>
      {mobileOpen ? (
        <button
          className="mobile-scrim"
          aria-label="关闭菜单"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
    </>
  );
}
