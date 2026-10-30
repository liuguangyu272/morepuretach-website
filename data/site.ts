import type { CategorySlug } from "@/data/products";

export const contact = {
  company: "南京猫谱科技有限公司",
  companyEn: "Nan Jing More Pure TECH Co., Ltd",
  phones: ["18602975022", "15312984115", "15251759755"],
  phoneContacts: [
    { number: "18602975022", role: "销售" },
    { number: "15312984115", role: "销售" },
    { number: "15251759755", role: "技术" },
  ],
  email: "morepuretech@163.com",
  emailComplete: true,
  inquiryResponse: "尽快响应",
  address: "江苏省南京市江北新区新锦湖路3-1号中丹生态生命科学产业园B座215-4室",
  website: "morepuretech.com",
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
    points: ["QuChERS 农残检测", "固相与磁性固相萃取", "高通量样品前处理"],
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
  {
    slug: "environmental-enrichment",
    title: "环境样品富集与净化",
    enTitle: "Environmental Enrichment",
    kicker: "从痕量目标物到快速磁分离",
    description: "利用磁性石墨烯、环糊精聚合物与功能化磁性纳米粒子，对环境水样中的有机污染物和重金属进行富集与净化。",
    points: ["环境水样磁性固相萃取", "痕量有机污染物富集", "重金属吸附与科研应用"],
    categories: ["magnetic-microspheres", "silica-microspheres"],
  },
  {
    slug: "materials-biotechnology",
    title: "材料科学与生物技术",
    enTitle: "Materials & Biotechnology",
    kicker: "以粒径与表面化学构建功能载体",
    description: "以硅胶、聚合物和荧光微球为基础，按粒径、孔结构、颜色及表面基团选择或定制材料。",
    points: ["药物缓释与催化剂载体", "生物分子偶联与表面活化", "荧光标记、示踪与编码"],
    categories: ["silica-microspheres", "polymer-microspheres", "fluorescent-microspheres"],
  },
];

export const resources = [
  {
    title: "猫谱科技公司与产品彩页",
    type: "公司彩页",
    category: "公司与全产品线",
    version: "PDF",
    href: "/downloads/morepure-company-catalog.pdf",
  },
  {
    title: "More Pure C18 产品说明书",
    type: "产品说明",
    category: "分析柱和制备柱",
    version: "PDF",
    href: "/downloads/more-pure-c18-guide.pdf",
  },
  {
    title: "色谱柱选择卡",
    type: "产品彩页",
    category: "分析柱和制备柱",
    version: "PDF",
    href: "/downloads/chromatography-column-selection-card.pdf",
  },
  {
    title: "More Pure C18 CA260621JZ011 测试报告",
    type: "测试报告",
    category: "分析柱和制备柱",
    version: "PDF",
    href: "/downloads/more-pure-c18-performance-report.pdf",
  },
  {
    title: "二氧化硅微球产品说明书",
    type: "产品说明",
    category: "硅胶微球",
    version: "DOCX",
    href: "/downloads/silica-microspheres-product-guide.docx",
  },
  {
    title: "磁性氧化石墨烯产品说明书",
    type: "产品说明",
    category: "磁性微球",
    version: "PDF",
    href: "/downloads/magnetic-graphene-oxide-guide.pdf",
  },
  {
    title: "磁性固相萃取材料综合资料",
    type: "产品彩页",
    category: "磁性微球",
    version: "PDF",
    href: "/downloads/magnetic-solid-phase-extraction-materials.pdf",
  },
  {
    title: "磁性环糊精聚合物产品说明书",
    type: "产品说明",
    category: "磁性微球",
    version: "PDF",
    href: "/downloads/magnetic-cyclodextrin-polymer-guide.pdf",
  },
  {
    title: "磁性环糊精金属有机框架聚合物产品说明书",
    type: "产品说明",
    category: "磁性微球",
    version: "PDF",
    href: "/downloads/magnetic-cyclodextrin-mof-guide.pdf",
  },
  {
    title: "MPDA-AA 功能化磁性纳米粒子产品说明书",
    type: "产品说明",
    category: "磁性微球",
    version: "PDF",
    href: "/downloads/mpda-aa-magnetic-nanoparticles-guide.pdf",
  },
  {
    title: "MPDA-HLB 功能化磁性纳米粒子产品说明书",
    type: "产品说明",
    category: "磁性微球",
    version: "PDF",
    href: "/downloads/mpda-hlb-magnetic-nanoparticles-guide.pdf",
  },
  {
    title: "MPDA-MCX 功能化磁性纳米粒子产品说明书",
    type: "产品说明",
    category: "磁性微球",
    version: "PDF",
    href: "/downloads/mpda-mcx-magnetic-nanoparticles-guide.pdf",
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
  {
    title: "萃取材料与试剂产品目录",
    type: "产品目录",
    category: "萃取材料与试剂",
    version: "XLSX",
    href: "/downloads/extraction-materials-and-reagents-catalog.xlsx",
  },
];

export type WechatArticle = {
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  href: `https://mp.weixin.qq.com/${string}`;
};

// 只收录微信公众号公开文章地址（https://mp.weixin.qq.com/s/...）。
// 不保存公众号后台地址，也不把文章另存为 PDF。
export const wechatArticles: WechatArticle[] = [
  {
    title: "【智能纳米复合材料】糖尿病智能管理与治疗新平台",
    summary: "解读 ZIF-8@Ins-GOx/AuNCs 智能纳米复合材料如何将血糖荧光监测与葡萄糖响应型胰岛素释放整合到同一平台。",
    category: "文献解读",
    publishedAt: "2026-05-26",
    href: "https://mp.weixin.qq.com/s/4EVOEjjx_tBpHgzZLcLI5Q",
  },
  {
    title: "聚合物微球与荧光微球",
    summary: "集中介绍聚合物微球和荧光微球的材料体系、粒径与表面基团选择，以及标记、示踪和检测等应用方向。",
    category: "产品知识",
    publishedAt: "2026-05-22",
    href: "https://mp.weixin.qq.com/s/EbgJesNb4Y9xlWKVsK1tRg",
  },
  {
    title: "萃取材料与试剂",
    summary: "梳理固相萃取材料、样品前处理试剂与常见应用场景，帮助根据目标物和样品基质选择合适方案。",
    category: "产品知识",
    publishedAt: "2026-05-20",
    href: "https://mp.weixin.qq.com/s/wmanpS3nJjacMHIBvZjpHA",
  },
  {
    title: "荧光微球",
    summary: "介绍不同基质、颜色、粒径和表面功能的荧光微球，以及侧向层析、荧光检测、标记与示踪应用。",
    category: "产品知识",
    publishedAt: "2026-05-20",
    href: "https://mp.weixin.qq.com/s/8BXqomOkoUau6HjDmvz5UA",
  },
  {
    title: "聚合物微球",
    summary: "介绍聚苯乙烯、GMA、PMMA 等聚合物微球及其氨基、羧基等功能化表面，覆盖载体、偶联与检测用途。",
    category: "产品知识",
    publishedAt: "2026-05-20",
    href: "https://mp.weixin.qq.com/s/pyKIYzqF-nBKu09vp5xSHA",
  },
  {
    title: "磁性微球",
    summary: "介绍磁性氧化石墨烯、磁性环糊精与功能化磁性纳米材料，说明其在磁分离和磁性固相萃取中的应用。",
    category: "产品知识",
    publishedAt: "2026-05-20",
    href: "https://mp.weixin.qq.com/s/VismSH0r1XY6AvAzi7GhLg",
  },
  {
    title: "硅胶微球",
    summary: "围绕二氧化硅微球的粒径、孔结构及氨基、羧基等表面修饰，介绍其在分离、载体和功能材料中的选用思路。",
    category: "产品知识",
    publishedAt: "2026-05-20",
    href: "https://mp.weixin.qq.com/s/wSLpQJpFxABrMheUhwF1TQ",
  },
  {
    title: "分析柱与制备柱",
    summary: "介绍分析柱、半制备柱与制备柱的固定相、规格和适用场景，为方法开发、放大与产品选型提供基础参考。",
    category: "产品知识",
    publishedAt: "2026-05-20",
    href: "https://mp.weixin.qq.com/s/EBckVhzUFv9kB0FFmSauQA",
  },
  {
    title: "【硼酸修饰磁性氧化石墨烯】芦丁高效选择性富集新方法",
    summary: "解读 MGO@APBA 通过磁分离与硼酸亲和识别选择性富集芦丁的原理、吸附性能和天然产物样品应用。",
    category: "文献解读",
    publishedAt: "2026-05-18",
    href: "https://mp.weixin.qq.com/s/nUTCf4qXlCb-h02PST3oKA",
  },
  {
    title: "【高效抗氧化检测新工具】锰基纳米酶传感器研究",
    summary: "介绍硼掺杂锰基纳米酶及其紫外-可见检测和手机辅助纸芯片方案，用于中药总抗氧化能力评价。",
    category: "文献解读",
    publishedAt: "2026-05-12",
    href: "https://mp.weixin.qq.com/s/TxhrDG2JGxE8ZgeEjXR_bw",
  },
  {
    title: "双亲磁性纳米吸附剂富集检测废水合成大麻素新方法",
    summary: "解读双亲磁性纳米吸附剂在复杂废水样品中富集合成大麻素的设计思路，以及其样品前处理与分析价值。",
    category: "文献解读",
    publishedAt: "2026-05-09",
    href: "https://mp.weixin.qq.com/s/u22NvOLIH8SkoKG9YoEE_1g",
  },
  {
    title: "【创新样品前处理技术】磁性流体同步提取 NMN 代谢物",
    summary: "介绍 Fe₃O₄@HPMC@DBSA 多重相互作用磁性流体对 Nam 与 MeNam 的快速同步富集及 HPLC 检测。",
    category: "文献解读",
    publishedAt: "2026-05-03",
    href: "https://mp.weixin.qq.com/s/zTQb_LPNOdBdPetzRvHBOg",
  },
  {
    title: "广泛特异性单克隆抗体免疫分析法检测合成大麻素",
    summary: "介绍广谱单克隆抗体、icELISA 与胶体金免疫层析平台，实现吲哚型和吲唑型合成大麻素及代谢物快速检测。",
    category: "文献解读",
    publishedAt: "2026-03-01",
    href: "https://mp.weixin.qq.com/s/fVEx8HkqfBhbmfdSlzeUWw",
  },
  {
    title: "甲基苯丙胺磁分离与荧光分析耦合检测新方法",
    summary: "解读 Fe₃O₄@PDA 磁固相萃取与葫芦脲介导荧光分析的耦合策略，提升复杂尿液样品检测的灵敏度和抗干扰能力。",
    category: "文献解读",
    publishedAt: "2026-02-21",
    href: "https://mp.weixin.qq.com/s/JduGWfCgTELV98uKr_t9hg",
  },
  {
    title: "双金属有机框架用于炭疽杆菌生物标志物检测",
    summary: "介绍 Tb-Zr-MOF 比率荧光传感器的一锅法制备及其对炭疽生物标志物 DPA 的快速、灵敏检测。",
    category: "文献解读",
    publishedAt: "2026-02-07",
    href: "https://mp.weixin.qq.com/s/GJJddsdnT2GjCqpyJFKvJw",
  },
  {
    title: "共价有机框架在生物传感与靶向给药中的应用综述",
    summary: "梳理共价有机框架在生物标志物检测、孔径工程、表面修饰、刺激响应药物释放及诊疗一体化方面的研究进展。",
    category: "文献解读",
    publishedAt: "2026-01-24",
    href: "https://mp.weixin.qq.com/s/8jSQP0IWDlk9Fji-vZrNxA",
  },
  {
    title: "双相低共熔溶剂系统提取中药活性成分研究",
    summary: "介绍亲水与疏水低共熔溶剂组成的双相体系，实现在单一步骤中提取并分离女贞子中不同极性的活性成分。",
    category: "文献解读",
    publishedAt: "2026-01-24",
    href: "https://mp.weixin.qq.com/s/iN1EH08N2hbhKCXIgWXRjw",
  },
  {
    title: "含纳米受体碳纳米晶体管的高灵敏无标签检测",
    summary: "解读 VHH 纳米受体与 PEG 表面修饰如何缓解德拜屏蔽和非特异性吸附，实现生理溶液中的快速无标签检测。",
    category: "文献解读",
    publishedAt: "2026-01-23",
    href: "https://mp.weixin.qq.com/s/Zpp9Ux00MRFviIdwTU_ajQ",
  },
];
