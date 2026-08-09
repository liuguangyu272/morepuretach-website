import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  FlaskConical,
  Layers3,
  Search,
  Sparkles,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { categories, categoryMap, products } from "@/data/products";
import { capabilities, resources, solutions } from "@/data/site";

const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker">
              <span /> FUNCTIONAL MICROSPHERE PLATFORM
            </span>
            <h1>
              让每一次分离
              <br />
              <em>更纯净。</em>
            </h1>
            <p>
              从微球基质与表面化学，到色谱柱装填和样品前处理，
              为生物医药分离纯化与检测提供可落地的产品体系。
            </p>
            <div className="hero-actions">
              <Link href="/products" className="button button-primary button-large">
                浏览产品中心 <ArrowRight size={18} />
              </Link>
              <Link href="/inquiry" className="button button-secondary button-large">
                获取选型建议
              </Link>
            </div>
            <div className="hero-proof">
              <span><strong>6</strong> 大产品线</span>
              <i />
              <span><strong>分析 → 制备</strong> 规格覆盖</span>
              <i />
              <span><strong>材料 → 方法</strong> 技术支持</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="硅胶微球显微图与产品能力概览">
            <div className="hero-image-frame">
              <Image
                src="/assets/silica-microspheres.jpg"
                alt="硅胶微球扫描电镜图"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 44vw"
              />
              <div className="image-index">MP / 01</div>
              <div className="image-caption">
                <span>Silica microspheres</span>
                <strong>粒径均一 · 表面可设计</strong>
              </div>
            </div>
            <div className="hero-data-card hero-data-top">
              <span>粒径范围</span>
              <strong>0.06 μm</strong>
              <small>to 3 mm</small>
            </div>
            <div className="hero-data-card hero-data-bottom">
              <span className="pulse-dot" />
              <div>
                <strong>六类材料体系</strong>
                <small>支持参数化选型</small>
              </div>
            </div>
            <div className="molecule molecule-one"><span /><span /><span /></div>
            <div className="molecule molecule-two"><span /><span /><span /></div>
          </div>
        </div>

        <div className="container hero-shortcuts">
          <Link href="/products">
            <Search size={21} />
            <div><strong>按产品与货号查找</strong><span>搜索完整产品目录</span></div>
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/solutions">
            <FlaskConical size={21} />
            <div><strong>按应用场景选型</strong><span>从问题出发找到材料</span></div>
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/resources">
            <FileText size={21} />
            <div><strong>查找技术资料</strong><span>说明书、报告与彩页</span></div>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="section product-family-section">
        <div className="container">
          <SectionHeading
            eyebrow="PRODUCT FAMILIES"
            title="从六大产品线进入"
            description="按材料体系浏览，快速缩小选择范围；每一类都可继续按粒径、表面基团、规格与应用筛选。"
            href="/products"
            linkLabel="进入产品中心"
          />
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link
                href={`/products?category=${category.slug}`}
                className={`category-card category-card-${index + 1}`}
                key={category.slug}
              >
                <div className="category-image">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
                <div className="category-overlay" />
                <div className="category-number">{category.index}</div>
                <div className="category-content">
                  <small>{category.enName}</small>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span>查看产品 <ArrowUpRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="capability-section">
        <div className="container capability-grid">
          <div className="capability-intro">
            <span className="eyebrow light">ONE INTEGRATED PATH</span>
            <h2>从材料，到方法。</h2>
            <p>
              猫谱科技围绕功能化微球建立连续技术路径，让产品参数、表面化学、装填规格和应用方法彼此衔接。
            </p>
            <Link href="/about" className="button button-ghost-light">
              了解技术能力 <ArrowRight size={17} />
            </Link>
          </div>
          <div className="capability-list">
            {capabilities.map((item, index) => {
              const icons = [Layers3, Sparkles, FlaskConical, Search];
              const Icon = icons[index];
              return (
                <article key={item.index}>
                  <span className="capability-icon"><Icon size={22} /></span>
                  <div>
                    <small>{item.index} / {item.enTitle}</small>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section solutions-section">
        <div className="container">
          <SectionHeading
            eyebrow="SOLUTIONS BY APPLICATION"
            title="先从问题出发"
            description="如果您只知道实验目标而不确定材料名称，可以从应用、样品基质和方法路径开始。"
            href="/solutions"
            linkLabel="查看全部解决方案"
          />
          <div className="solution-home-grid">
            {solutions.slice(0, 3).map((solution, index) => (
              <Link href={`/solutions#${solution.slug}`} className="solution-home-card" key={solution.slug}>
                <span className="solution-index">0{index + 1}</span>
                <span className="solution-kicker">{solution.kicker}</span>
                <h3>{solution.title}</h3>
                <small>{solution.enTitle}</small>
                <p>{solution.description}</p>
                <div className="solution-tags">
                  {solution.categories.map((category) => (
                    <span key={category}>{categoryMap[category].name}</span>
                  ))}
                </div>
                <span className="solution-arrow"><ArrowUpRight size={19} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <SectionHeading
            eyebrow="FEATURED PRODUCTS"
            title="重点产品"
            description="从常用固定相到样品前处理材料，查看代表性系列与关键参数。"
            href="/products"
          />
          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <article className="featured-product" key={product.slug}>
                <Link href={`/products/${product.slug}`} className="featured-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                  {product.badge ? <span>{product.badge}</span> : null}
                </Link>
                <div className="featured-body">
                  <small>{categoryMap[product.category].name}</small>
                  <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
                  <p>{product.enName}</p>
                  <div className="featured-spec">
                    <span>{product.specs[0].label}</span>
                    <strong>{product.specs[0].value}</strong>
                  </div>
                  <div className="featured-footer">
                    <code>{product.code}</code>
                    <Link href={`/products/${product.slug}`} aria-label={`查看${product.name}详情`}><ArrowUpRight size={17} /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-strip">
        <div className="container resources-strip-grid">
          <div className="resource-feature">
            <span className="eyebrow light">TECHNICAL LIBRARY</span>
            <h2>资料不应藏在产品页深处。</h2>
            <p>集中查找已核入演示站的产品说明书与公开彩页，并可快速返回关联产品。</p>
            <Link href="/resources" className="button button-light">
              进入技术资料库 <ArrowRight size={17} />
            </Link>
          </div>
          <div className="resource-list-home">
            {resources.slice(0, 3).map((resource) => (
              <a href={resource.href} target="_blank" rel="noreferrer" key={resource.href}>
                <span className="resource-type-icon"><FileText size={20} /></span>
                <div>
                  <small>{resource.type} · {resource.category}</small>
                  <strong>{resource.title}</strong>
                </div>
                <Download size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-home-section">
        <div className="container about-home-grid">
          <div className="about-home-visual">
            <Image src="/assets/product-kit.png" alt="猫谱科技样品前处理产品" fill sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="about-visual-label">
              <strong>More Pure TECH</strong>
              <span>南京 · 江北新区</span>
            </div>
          </div>
          <div className="about-home-copy">
            <span className="eyebrow">ABOUT MORE PURE</span>
            <h2>把实验室需求，连接到可重复的产品规格。</h2>
            <p>
              南京猫谱科技有限公司以自主研发的功能化微球材料为技术基础，产品覆盖色谱柱、硅胶微球、磁性微球、聚合物微球、荧光微球及萃取材料与试剂。
            </p>
            <p>
              公司面向生物医药、食品安全检测、毒品分析等场景，提供从材料选择、表面修饰到装填与方法开发的支持。
            </p>
            <div className="about-values">
              <span><strong>专业</strong><small>以参数与方法沟通</small></span>
              <span><strong>协同</strong><small>从材料衔接到应用</small></span>
              <span><strong>可扩展</strong><small>支持规格与表面定制</small></span>
            </div>
            <Link href="/about" className="inline-link">了解猫谱科技 <span>→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
