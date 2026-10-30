import { additionalProducts, relatedProductSlugs } from "@/data/additional-products";

export type CategorySlug =
  | "chromatography-columns"
  | "silica-microspheres"
  | "magnetic-microspheres"
  | "polymer-microspheres"
  | "fluorescent-microspheres"
  | "extraction-materials";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductVariant = {
  code: string;
  specification: string;
  packaging?: string;
};

export type ProductDocument = {
  title: string;
  type: "产品说明" | "测试报告" | "产品彩页" | "产品目录";
  href: string;
  format?: "PDF" | "DOCX" | "XLSX";
};

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  enName: string;
  code: string;
  summary: string;
  image: string;
  badge?: string;
  featured?: boolean;
  specs: ProductSpec[];
  features: string[];
  applications: string[];
  variants: ProductVariant[];
  documents: ProductDocument[];
  searchAliases?: string[];
  seriesName?: string;
  codePrefix?: string;
  published?: boolean;
  customAvailable?: boolean;
  updatedAt?: string;
  sourceMaterial?: string;
};

export const categories: Array<{
  slug: CategorySlug;
  name: string;
  enName: string;
  description: string;
  image: string;
  index: string;
}> = [
  {
    slug: "chromatography-columns",
    name: "分析柱和制备柱",
    enName: "Chromatography Columns",
    description: "从常规 HPLC 分析、方法开发到半制备与制备放大。",
    image: "/assets/columns.png",
    index: "01",
  },
  {
    slug: "silica-microspheres",
    name: "硅胶微球",
    enName: "Silica Microspheres",
    description: "实心、介孔及多种表面官能化二氧化硅微球。",
    image: "/assets/silica-microspheres.jpg",
    index: "02",
  },
  {
    slug: "magnetic-microspheres",
    name: "磁性微球",
    enName: "Magnetic Microspheres",
    description: "可设计表面化学与磁响应操控相结合的功能材料。",
    image: "/assets/magnetic-microspheres.png",
    index: "03",
  },
  {
    slug: "polymer-microspheres",
    name: "聚合物微球",
    enName: "Polymer Microspheres",
    description: "覆盖聚苯乙烯、GMA、交联 PMMA 与彩色乳胶体系。",
    image: "/assets/polymer-microspheres.png",
    index: "04",
  },
  {
    slug: "fluorescent-microspheres",
    name: "荧光微球",
    enName: "Fluorescent Microspheres",
    description: "多基质、多色荧光及多种表面基团可选。",
    image: "/assets/fluorescent-microspheres.png",
    index: "05",
  },
  {
    slug: "extraction-materials",
    name: "萃取材料与试剂",
    enName: "Extraction Materials",
    description: "固相萃取、QuChERS 与高通量样品前处理耗材。",
    image: "/assets/extraction-materials.png",
    index: "06",
  },
];

const c18Docs: ProductDocument[] = [
  {
    title: "More Pure C18 产品说明书",
    type: "产品说明",
    href: "/downloads/more-pure-c18-guide.pdf",
  },
];

const silicaDocs: ProductDocument[] = [
  {
    title: "二氧化硅微球产品说明书",
    type: "产品说明",
    href: "/downloads/silica-microspheres-product-guide.docx",
    format: "DOCX",
  },
];

const extractionDocs: ProductDocument[] = [
  {
    title: "萃取材料与试剂产品目录",
    type: "产品目录",
    href: "/downloads/extraction-materials-and-reagents-catalog.xlsx",
    format: "XLSX",
  },
];

const coreProducts: Product[] = [
  {
    slug: "more-pure-c18",
    category: "chromatography-columns",
    name: "More Pure C18 色谱柱",
    enName: "More Pure C18 Column",
    code: "C18-00512018",
    summary: "标准型 ODS 反相色谱柱，适用于常规药物、天然产物、食品和环境样品中的有机组分分析。",
    image: "/assets/columns.png",
    badge: "经典系列",
    featured: true,
    specs: [
      { label: "键合相", value: "C18（十八烷基，ODS）" },
      { label: "适用 pH", value: "2–9" },
      { label: "碳载量", value: "17%，封端" },
      { label: "典型规格", value: "250 × 4.6 mm，5 μm，120 Å" },
      { label: "最大操作压力", value: "400 bar（5800 psi）" },
      { label: "最高操作温度", value: "60℃" },
      { label: "测试柱效", value: "23960 塔板数（报告最低要求 15000）" },
      { label: "测试峰形", value: "选择性 1.28；对称性 0.96" },
    ],
    features: ["通用型标准 ODS 固定相", "独特键合与封端工艺", "支持分析、半制备和制备规格"],
    applications: ["药物含量与有关物质分析", "天然产物与食品有机组分", "反相方法开发与质量控制"],
    variants: [
      { code: "C18-00512018", specification: "250 × 4.6 mm，5 μm，120 Å", packaging: "1 支" },
    ],
    documents: [
      ...c18Docs,
      {
        title: "色谱柱选择卡",
        type: "产品彩页",
        href: "/downloads/chromatography-column-selection-card.pdf",
      },
      {
        title: "More Pure C18 CA260621JZ011 测试报告",
        type: "测试报告",
        href: "/downloads/more-pure-c18-performance-report.pdf",
      },
    ],
    searchAliases: ["C18柱", "ODS柱", "反相柱", "液相色谱柱"],
  },
  {
    slug: "more-pure-c18-h",
    category: "chromatography-columns",
    name: "More Pure C18-H 色谱柱",
    enName: "More Pure C18-H Column",
    code: "C18-H-00512018",
    summary: "杂化硅胶基质 C18 固定相，覆盖更宽 pH 范围，适合离子化药物及其相关杂质的分离。",
    image: "/assets/columns.png",
    badge: "宽 pH",
    specs: [
      { label: "键合相", value: "C18（杂化硅胶基质）" },
      { label: "适用 pH", value: "1–12" },
      { label: "碳载量", value: "20%，封端" },
      { label: "典型规格", value: "250 × 4.6 mm，5 μm，120 Å" },
    ],
    features: ["杂化填料", "耐受高 pH 与低 pH 条件", "改善离子化化合物峰形与选择性"],
    applications: ["酸性、中性和碱性小分子", "离子化药物与相关杂质", "宽 pH 方法开发"],
    variants: [
      { code: "C18-H-00512018", specification: "250 × 4.6 mm，5 μm，120 Å", packaging: "1 支" },
    ],
    documents: [],
    searchAliases: ["宽pHC18", "杂化C18", "宽酸碱色谱柱"],
  },
  {
    slug: "more-pure-basic-phenyl",
    category: "chromatography-columns",
    name: "More Pure Basic Phenyl 苯基色谱柱",
    enName: "More Pure Basic Phenyl",
    code: "MP-1152505",
    summary: "通过疏水作用与 π–π 相互作用提供区别于 C18/C8 的选择性，适合芳香族结构类似物与位置异构体。",
    image: "/assets/columns.png",
    specs: [
      { label: "固定相", value: "苯基" },
      { label: "填料粒径", value: "5 μm、10 μm" },
      { label: "分析柱内径", value: "4.6 mm" },
      { label: "放大规格", value: "10 mm 半制备 / 22 mm 制备" },
    ],
    features: ["疏水作用与 π–π 相互作用", "提供区别于 C18/C8 的选择性", "规格覆盖分析至制备放大"],
    applications: ["芳香族与杂环化合物", "结构类似物分离", "位置异构体分析与制备"],
    variants: [
      { code: "MP-1152505", specification: "250 × 4.6 mm，5 μm", packaging: "1 支" },
      { code: "MP-1152510", specification: "250 × 4.6 mm，10 μm", packaging: "1 支" },
      { code: "MP-115102505", specification: "250 × 10 mm，5 μm（半制备）", packaging: "1 支" },
      { code: "MP-115222510", specification: "250 × 22 mm，10 μm（制备）", packaging: "1 支" },
    ],
    documents: [],
    searchAliases: ["苯基柱", "芳香族色谱柱", "位置异构体柱"],
  },
  {
    slug: "silica-microspheres",
    category: "silica-microspheres",
    name: "二氧化硅微球",
    enName: "Silica Microspheres",
    code: "SiO₂",
    summary: "粒径覆盖纳米至微米级的球形二氧化硅颗粒，表面硅羟基丰富，可进一步进行官能化修饰。",
    image: "/assets/silica-sem-02.webp",
    badge: "粒径可选",
    featured: true,
    specs: [
      { label: "粒径范围", value: "0.1–75 μm，多种粒径规格" },
      { label: "形貌", value: "球形" },
      { label: "常规浓度", value: "2.5% w/v" },
      { label: "常规包装", value: "10 mL" },
    ],
    features: ["粒径分布范围覆盖广", "化学性质稳定", "表面硅羟基便于进一步修饰"],
    applications: ["功能纳米材料", "色谱填料", "分离纯化与吸附载体"],
    variants: [
      { code: "SiO2-0010", specification: "0.1 μm", packaging: "2.5% w/v，10 mL" },
      { code: "SiO2-0100", specification: "1.0 μm", packaging: "2.5% w/v，10 mL" },
      { code: "SiO2-1000", specification: "10.0 μm", packaging: "2.5% w/v，10 mL" },
    ],
    documents: silicaDocs,
    searchAliases: ["硅球", "硅微球", "SiO2微球", "白色硅球"],
  },
  {
    slug: "carboxyl-silica-microspheres",
    category: "silica-microspheres",
    name: "羧基二氧化硅微球",
    enName: "Carboxyl Silica Microspheres",
    code: "SiO₂COOH",
    summary: "羧基表面活化的二氧化硅微球，为进一步偶联与功能化提供稳定的无机微球基质。",
    image: "/assets/silica-sem-03.webp",
    specs: [
      { label: "粒径范围", value: "0.1–75 μm，多种粒径规格" },
      { label: "表面基团", value: "羧基（–COOH）" },
      { label: "常规浓度", value: "2.5% w/v" },
      { label: "常规包装", value: "10 mL" },
    ],
    features: ["无机球形基质", "羧基表面活化", "支持多粒径选择与定制"],
    applications: ["生物分子偶联", "表面活化微球", "分离与检测载体"],
    variants: [
      { code: "SiO2COOH-0010", specification: "0.1 μm", packaging: "2.5% w/v，10 mL" },
      { code: "SiO2COOH-0100", specification: "1.0 μm", packaging: "2.5% w/v，10 mL" },
      { code: "SiO2COOH-1000", specification: "10.0 μm", packaging: "2.5% w/v，10 mL" },
    ],
    documents: silicaDocs,
    searchAliases: ["羧基硅球", "羧基硅微球", "SiO2COOH"],
  },
  {
    slug: "mesoporous-silica-microspheres",
    category: "silica-microspheres",
    name: "介孔二氧化硅微球",
    enName: "Mesoporous Silica Microspheres",
    code: "MSM",
    summary: "具有介孔结构的二氧化硅微球，可用于色谱填料、药物缓释载体与催化剂载体。",
    image: "/assets/silica-sem-05.webp",
    specs: [
      { label: "粒径范围", value: "2.0–10.0 μm" },
      { label: "结构", value: "介孔" },
      { label: "常规浓度", value: "2.5% w/v" },
      { label: "常规包装", value: "10 mL" },
    ],
    features: ["可控介孔结构", "较大比表面积", "可提供羧基、氨基等表面修饰"],
    applications: ["色谱填料", "药物缓释载体", "催化剂载体"],
    variants: [
      { code: "MSM-0200", specification: "2.0 μm", packaging: "2.5% w/v，10 mL" },
      { code: "MSM-0500", specification: "5.0 μm", packaging: "2.5% w/v，10 mL" },
      { code: "MSM-1000", specification: "10.0 μm", packaging: "2.5% w/v，10 mL" },
    ],
    documents: silicaDocs,
    searchAliases: ["介孔硅球", "介孔硅微球", "MSM硅球"],
  },
  {
    slug: "magnetic-graphene-oxide",
    category: "magnetic-microspheres",
    name: "磁性氧化石墨烯",
    enName: "Magnetic Graphene Oxide",
    code: "MGO",
    summary: "兼具氧化石墨烯表面作用与磁响应能力的功能材料，面向磁性固相萃取与快速富集。",
    image: "/assets/magnetic-microspheres.png",
    badge: "磁性固相萃取",
    featured: true,
    specs: [
      { label: "材料体系", value: "磁性氧化石墨烯" },
      { label: "磁珠粒径", value: "15–30 nm" },
      { label: "氧化石墨烯粒径", value: "500–1000 nm" },
      { label: "孔径 / 比表面积", value: "5.937 nm / 约 152 m²/g" },
      { label: "孔容", value: "0.220 cm³/g" },
      { label: "分散与保存", value: "超纯水分散；密封 4℃ 保存 1 年" },
    ],
    features: ["磁场辅助快速分离", "氧化石墨烯表面作用", "提供四种常规规格"],
    applications: ["磁性固相萃取", "样品前处理", "目标物富集"],
    variants: [
      { code: "MGO0010", specification: "10 mg / 10 mL" },
      { code: "MGO0050", specification: "50 mg / 50 mL" },
      { code: "MGO0100", specification: "100 mg / 100 mL" },
    ],
    documents: [
      {
        title: "磁性氧化石墨烯产品说明书",
        type: "产品说明",
        href: "/downloads/magnetic-graphene-oxide-guide.pdf",
      },
      {
        title: "磁性固相萃取材料综合资料",
        type: "产品彩页",
        href: "/downloads/magnetic-solid-phase-extraction-materials.pdf",
      },
    ],
    searchAliases: ["磁性石墨烯", "氧化石墨烯磁珠", "磁固相萃取"],
  },
  {
    slug: "magnetic-cyclodextrin-polymer",
    category: "magnetic-microspheres",
    name: "磁性环糊精聚合物",
    enName: "Magnetic Cyclodextrin Polymer",
    code: "MCDP",
    summary: "将环糊精聚合物识别与吸附特性集成至磁性材料，用于磁性固相萃取和复杂样品前处理。",
    image: "/assets/magnetic-microspheres.png",
    specs: [
      { label: "材料体系", value: "磁性环糊精聚合物" },
      { label: "粒径", value: "200 nm" },
      { label: "孔径 / 比表面积", value: "5.2 nm / 约 26.3 m²/g" },
      { label: "孔容", value: "0.034 cm³/g" },
      { label: "分散与保存", value: "超纯水分散；密封 4℃ 保存 1 年" },
    ],
    features: ["磁响应富集", "环糊精主客体作用", "多规格可选"],
    applications: ["复杂样品净化", "磁性固相萃取", "选择性富集"],
    variants: [
      { code: "MCDP0010", specification: "10 mg / 10 mL" },
      { code: "MCDP0050", specification: "50 mg / 50 mL" },
      { code: "MCDP0100", specification: "100 mg / 100 mL" },
    ],
    documents: [
      {
        title: "磁性环糊精聚合物产品说明书",
        type: "产品说明",
        href: "/downloads/magnetic-cyclodextrin-polymer-guide.pdf",
      },
    ],
  },
  {
    slug: "mpda-hlb-magnetic-nanoparticles",
    category: "magnetic-microspheres",
    name: "MPDA-HLB 功能化磁性纳米粒子",
    enName: "MPDA-HLB Functionalized Magnetic Nanoparticles",
    code: "MPDA-HLB",
    summary: "聚（二乙烯苯-N-乙烯基吡咯烷酮）修饰的聚多巴胺功能化磁性纳米粒子。",
    image: "/assets/magnetic-microspheres.png",
    specs: [
      { label: "基质", value: "聚多巴胺功能化磁性纳米粒子" },
      { label: "表面聚合物", value: "DVB-co-NVP" },
      { label: "粒径", value: "300 nm" },
      { label: "孔径", value: "2–20 nm" },
      { label: "比表面积", value: "30–55 m²/g" },
      { label: "孔容", value: "0.05–0.25 cm³/g" },
    ],
    features: ["亲水亲脂复合作用", "磁场快速操控", "面向样品前处理"],
    applications: ["磁性固相萃取", "复杂基质净化", "分析物富集"],
    variants: [
      { code: "MPDA-HLB0010", specification: "10 mg / 10 mL" },
      { code: "MPDA-HLB0050", specification: "50 mg / 50 mL" },
      { code: "MPDA-HLB0100", specification: "100 mg / 100 mL" },
    ],
    documents: [
      {
        title: "MPDA-HLB 功能化磁性纳米粒子产品说明书",
        type: "产品说明",
        href: "/downloads/mpda-hlb-magnetic-nanoparticles-guide.pdf",
      },
      {
        title: "磁性固相萃取材料综合资料",
        type: "产品彩页",
        href: "/downloads/magnetic-solid-phase-extraction-materials.pdf",
      },
    ],
  },
  {
    slug: "polystyrene-microspheres",
    category: "polymer-microspheres",
    name: "聚苯乙烯微球",
    enName: "Polystyrene Microspheres",
    code: "PS",
    summary: "粒径范围广、易于表面修饰的聚合物微球，可作为功能载体与检测材料基质。",
    image: "/assets/polymer-microspheres.png",
    badge: "多粒径",
    featured: true,
    specs: [
      { label: "材料", value: "聚苯乙烯" },
      { label: "粒径范围", value: "0.06–22.9 μm，多种粒径规格" },
      { label: "常规浓度", value: "2.5% w/v" },
      { label: "常规包装", value: "10 mL" },
    ],
    features: ["球形度与粒径均一性", "粒径范围广", "支持氨基、羧基等表面修饰"],
    applications: ["功能载体", "免疫与检测材料", "表面活化与偶联"],
    variants: [
      { code: "PS-0006", specification: "0.06 μm", packaging: "2.5% w/v，10 mL" },
      { code: "PS-0100", specification: "1.0 μm", packaging: "2.5% w/v，10 mL" },
      { code: "PS-1000", specification: "10.0 μm", packaging: "2.5% w/v，10 mL" },
    ],
    documents: [
      {
        title: "聚苯乙烯微球产品说明书",
        type: "产品说明",
        href: "/downloads/polystyrene-microspheres-guide.pdf",
      },
    ],
  },
  {
    slug: "gma-microspheres",
    category: "polymer-microspheres",
    name: "甲基丙烯酸环氧丙酯微球",
    enName: "Glycidyl Methacrylate Microspheres",
    code: "GMA",
    summary: "带环氧反应基团的聚合物微球，为进一步偶联和表面功能化提供活性位点。",
    image: "/assets/polymer-microspheres.png",
    specs: [
      { label: "材料", value: "甲基丙烯酸环氧丙酯" },
      { label: "粒径范围", value: "0.3–9.0 μm" },
      { label: "表面活性", value: "环氧基" },
      { label: "常规包装", value: "2.5% w/v，10 mL" },
    ],
    features: ["环氧活性位点", "粒径多规格", "适于进一步偶联改性"],
    applications: ["表面活化微球", "生物偶联载体", "功能化材料基质"],
    variants: [
      { code: "GMA-0030", specification: "0.3 μm", packaging: "2.5% w/v，10 mL" },
      { code: "GMA-0100", specification: "1.0 μm", packaging: "2.5% w/v，10 mL" },
      { code: "GMA-0900", specification: "9.0 μm", packaging: "2.5% w/v，10 mL" },
    ],
    documents: [],
  },
  {
    slug: "red-fluorescent-polystyrene",
    category: "fluorescent-microspheres",
    name: "聚苯乙烯红色荧光微球",
    enName: "Red Fluorescent Polystyrene Microspheres",
    code: "PSRL",
    summary: "红色荧光聚苯乙烯微球，信号强、粒径选择范围广，并可提供氨基或羧基表面修饰。",
    image: "/assets/fluorescent-microspheres.png",
    badge: "620 / 680 nm",
    specs: [
      { label: "粒径范围", value: "0.06 μm–3 mm" },
      { label: "最大激发", value: "620 nm" },
      { label: "最大发射", value: "680 nm" },
      { label: "常规浓度", value: "1% w/v" },
    ],
    features: ["强红色荧光信号", "多粒径与多表面基团", "分散液与干粉规格"],
    applications: ["侧向层析", "编码微球", "生物成像与标记"],
    variants: [
      { code: "PSRL-0006", specification: "0.06 μm", packaging: "1% w/v，10 mL" },
      { code: "PSRL-0100", specification: "1.0 μm", packaging: "1% w/v，10 mL" },
      { code: "PSRL-3000", specification: "30–40 μm", packaging: "100 mg" },
    ],
    documents: [
      {
        title: "侧向层析荧光微球",
        type: "产品彩页",
        href: "/downloads/lateral-flow-fluorescent-microspheres.pdf",
      },
    ],
  },
  {
    slug: "green-fluorescent-polystyrene",
    category: "fluorescent-microspheres",
    name: "聚苯乙烯绿色荧光微球",
    enName: "Green Fluorescent Polystyrene Microspheres",
    code: "PSGL",
    summary: "绿色荧光聚苯乙烯微球，覆盖纳米、微米至毫米级规格，适用于荧光检测与示踪。",
    image: "/assets/fluorescent-microspheres.png",
    specs: [
      { label: "粒径范围", value: "0.06 μm–3 mm" },
      { label: "最大激发", value: "488 nm" },
      { label: "最大发射", value: "518 nm" },
      { label: "常规浓度", value: "1% w/v" },
    ],
    features: ["明亮绿色荧光", "支持氨基与羧基修饰", "粒径与包装可选"],
    applications: ["侧向层析", "荧光检测", "生物标记与成像"],
    variants: [
      { code: "PSGL-0006", specification: "0.06 μm", packaging: "1% w/v，10 mL" },
      { code: "PSGL-0100", specification: "1.0 μm", packaging: "1% w/v，10 mL" },
      { code: "PSGL-3000", specification: "30–40 μm", packaging: "100 mg" },
    ],
    documents: [
      {
        title: "侧向层析荧光微球",
        type: "产品彩页",
        href: "/downloads/lateral-flow-fluorescent-microspheres.pdf",
      },
    ],
  },
  {
    slug: "rare-earth-red-fluorescent",
    category: "fluorescent-microspheres",
    name: "稀土红色荧光微球",
    enName: "Rare Earth Red Fluorescent Microspheres",
    code: "RERL",
    summary: "采用稀土发光体系的红色荧光微球，覆盖 0.1–150 μm 粒径范围。",
    image: "/assets/fluorescent-microspheres.png",
    specs: [
      { label: "粒径范围", value: "0.1–150 μm" },
      { label: "最大激发", value: "310 nm" },
      { label: "最大发射", value: "613 nm" },
      { label: "常规浓度", value: "1% w/v" },
    ],
    features: ["稀土发光体系", "跨度较大的粒径选择", "红色荧光信号"],
    applications: ["荧光示踪", "检测标记", "功能化微球开发"],
    variants: [
      { code: "RERL-0010", specification: "0.1–0.5 μm", packaging: "1% w/v，10 mL" },
      { code: "RERL-1000", specification: "10.0 μm", packaging: "1% w/v，10 mL" },
      { code: "RERL-12500", specification: "125–150 μm", packaging: "1% w/v，10 mL" },
    ],
    documents: [
      {
        title: "侧向层析荧光微球",
        type: "产品彩页",
        href: "/downloads/lateral-flow-fluorescent-microspheres.pdf",
      },
    ],
  },
  {
    slug: "hlb-spe-resin",
    category: "extraction-materials",
    name: "亲水亲脂型固相萃取树脂",
    enName: "HLB Solid Phase Extraction Resin",
    code: "HLB",
    summary: "兼具极性和非极性作用力的固相萃取树脂，提供多种填料量与柱管体积组合。",
    image: "/assets/extraction-materials.png",
    badge: "样品前处理",
    featured: true,
    specs: [
      { label: "作用模式", value: "亲水亲脂复合作用" },
      { label: "填料量", value: "10 mg–1 g" },
      { label: "柱管体积", value: "1 / 3 / 6 mL" },
      { label: "包装", value: "30 / 50 / 100 支每包" },
    ],
    features: ["兼具极性与非极性作用力", "十种常规规格", "适配不同样品量和通量"],
    applications: ["广谱样品净化", "生物样品前处理", "药物与代谢物萃取"],
    variants: [
      { code: "HLB-010010", specification: "10 mg / 1 mL", packaging: "100 支/包" },
      { code: "HLB-030100", specification: "100 mg / 3 mL", packaging: "50 支/包" },
      { code: "HLB-060500", specification: "500 mg / 6 mL", packaging: "30 支/包" },
    ],
    documents: extractionDocs,
  },
  {
    slug: "pcx-spe-resin",
    category: "extraction-materials",
    name: "强阳离子交换树脂",
    enName: "PCX Strong Cation Exchange Resin",
    code: "PCX",
    summary: "用于萃取碱性物质的强阳离子交换固相萃取树脂。",
    image: "/assets/extraction-materials.png",
    specs: [
      { label: "作用模式", value: "强阳离子交换" },
      { label: "目标分析物", value: "碱性物质" },
      { label: "填料量", value: "10 mg–1 g" },
      { label: "柱管体积", value: "1 / 3 / 6 mL" },
    ],
    features: ["面向碱性分析物", "十种常规规格", "适配多种柱管体积"],
    applications: ["碱性药物萃取", "毒品分析样品前处理", "复杂基质净化"],
    variants: [
      { code: "PCX-010010", specification: "10 mg / 1 mL", packaging: "100 支/包" },
      { code: "PCX-030100", specification: "100 mg / 3 mL", packaging: "50 支/包" },
      { code: "PCX-060500", specification: "500 mg / 6 mL", packaging: "30 支/包" },
    ],
    documents: extractionDocs,
  },
  {
    slug: "quechers-extraction-kit",
    category: "extraction-materials",
    name: "QuChERS 农残检测方法包",
    enName: "QuChERS Pesticide Residue Detection Kit",
    code: "QEANG / QPAG",
    summary: "覆盖提取与净化步骤的农残检测方法包，提供 AOAC 2007.01 与 EN 15662 相关配方。",
    image: "/assets/extraction-materials.png",
    badge: "农残检测",
    specs: [
      { label: "方法", value: "AOAC 2007.01 / EN 15662" },
      { label: "相关标准", value: "GB 23200.113" },
      { label: "提取管", value: "50 mL" },
      { label: "包装", value: "50 / 100 套每包" },
    ],
    features: ["提取与净化组合", "针对不同样品基质配置", "预装盐包与离心管"],
    applications: ["蔬菜水果农残检测", "高色素或含脂样品净化", "食品安全样品前处理"],
    variants: [
      { code: "QEANG-050", specification: "AOAC / NYT / GB 提取包：6 g MgSO₄ + 1.5 g NaAc", packaging: "50/包" },
      { code: "QEEG-050", specification: "EN / GB 提取包：NaCl、MgSO₄ 与柠檬酸盐", packaging: "50/包" },
      { code: "QPA-PM-10002", specification: "简单果蔬基质：50 mg PSA + 150 mg MgSO₄，2 mL", packaging: "100/包" },
      { code: "QPAG-PCM-05015", specification: "含脂/蛋白基质：C18 + PSA + MgSO₄，15 mL", packaging: "50/包" },
    ],
    documents: extractionDocs,
    searchAliases: ["农残包", "农药残留", "农残检测", "快检包"],
  },
];

export const products: Product[] = [...coreProducts, ...additionalProducts];

export function getRelatedProducts(product: Product, allProducts: Product[] = products): Product[] {
  const preferred = relatedProductSlugs[product.slug] ?? [];
  const chosen = preferred
    .map((slug) => allProducts.find((item) => item.slug === slug))
    .filter((item): item is Product => item !== undefined)
    .filter((item) => item.slug !== product.slug);

  if (chosen.length < 3) {
    const fallback = allProducts.filter(
      (item) =>
        item.category === product.category &&
        item.slug !== product.slug &&
        !chosen.some((candidate) => candidate.slug === item.slug),
    );
    chosen.push(...fallback);
  }

  return chosen.slice(0, 3);
}

export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
) as Record<CategorySlug, (typeof categories)[number]>;

export const productMap = Object.fromEntries(
  products.map((product) => [product.slug, product]),
) as Record<string, Product>;
