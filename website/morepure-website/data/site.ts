import type { CategorySlug } from "@/data/products";

export const contact = {
  company: "南京猫谱科技有限公司",
  companyEn: "Nan Jing More Pure TECH Co., Ltd",
  phones: ["18602975022", "15312984115", "15251759755"],
  address: "江苏省南京市江北新区新锦湖路3-1号中丹生态生命科学产业园B座215-4室",
  website: "www.morepuretech.com",
  hours: "8:00–22:00",
};

export const capabilities = [
  {
    index: "01",
    title: "微球基质开发",
    enTitle: "Matrix development",
    description: "围绕硅胶、聚合物与复合磁性基质，匹配粒径、孔结构和应用需求。",
  },
  {
    index: "02",
    title: "表面功能化",
    enTitle: "Surface chemistry",
    description: "提供羧基、氨基、环氧基等官能团与复合聚合物修饰方案。",
  },
  {
    index: "03",
    title: "色谱柱装填",
    enTitle: "Column packing",
    description: "覆盖分析柱、半制备柱和制备柱，支持方法从分析向放大迁移。",
  },
  {
    index: "04",
    title: "方法与定制支持",
    enTitle: "Method & custom support",
    description: "围绕分离、纯化和样品前处理提供选型咨询、定制开发与工艺优化。",
  },
];

export const solutions: Array<{
  slug: string;
  title: string;
  enTitle: string;
  kicker: string;
  description: string;
  points: string[];
  categories: CategorySlug[];
}> = [
  {
    slug: "biopharma-separation",
    title: "生物医药分离与纯化",
    enTitle: "Biopharma Separation",
    kicker: "从分析确认到制备放大",
    description: "为药物、中间体、相关杂质和生物分子提供色谱固定相、柱规格与方法开发支持。",
    points: ["含量与有关物质分析", "目标物制备与标准品纯化", "细胞与基因治疗相关分离材料"],
    categories: ["chromatography-columns", "silica-microspheres"],
  },
  {
    slug: "food-safety",
    title: "食品安全检测",
    enTitle: "Food Safety Testing",
    kicker: "让复杂基质更易分析",
    description: "覆盖农残、激素、脂溶性维生素等样品的萃取、净化、富集与后续色谱分析。",
    points: ["QuEChERS 农残检测", "固相与磁性固相萃取", "高通量样品前处理"],
    categories: ["extraction-materials", "magnetic-microspheres"],
  },
  {
    slug: "diagnostic-detection",
    title: "诊断与荧光检测",
    enTitle: "Diagnostic Detection",
    kicker: "稳定信号与可设计表面",
    description: "以多色荧光微球、功能化聚合物微球为基础，支持侧向层析、编码与标记应用。",
    points: ["侧向层析荧光微球", "多色、多粒径可选", "氨基与羧基表面偶联"],
    categories: ["fluorescent-microspheres", "polymer-microspheres"],
  },
  {
    slug: "toxicology-analysis",
    title: "毒品与法医分析",
    enTitle: "Toxicology Analysis",
    kicker: "选择性净化与快速富集",
    description: "根据目标物酸碱性和基质特征，组合离子交换、亲水亲脂与磁性萃取材料。",
    points: ["碱性分析物阳离子交换", "复杂生物基质净化", "磁性材料快速富集"],
    categories: ["extraction-materials", "magnetic-microspheres"],
  },
];

export const resources = [
  {
    title: "More Pure C18 产品说明书",
    type: "产品说明",
    category: "分析柱和制备柱",
    version: "PDF",
    href: "/downloads/more-pure-c18-guide.pdf",
  },
  {
    title: "磁性氧化石墨烯产品说明书",
    type: "产品说明",
    category: "磁性微球",
    version: "PDF",
    href: "/downloads/magnetic-graphene-oxide-guide.pdf",
  },
  {
    title: "聚苯乙烯微球产品说明书",
    type: "产品说明",
    category: "聚合物微球",
    version: "PDF",
    href: "/downloads/polystyrene-microspheres-guide.pdf",
  },
  {
    title: "侧向层析荧光微球",
    type: "产品彩页",
    category: "荧光微球",
    version: "PDF",
    href: "/downloads/lateral-flow-fluorescent-microspheres.pdf",
  },
];
