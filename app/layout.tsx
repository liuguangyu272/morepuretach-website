import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://morepuretech.com"),
  title: {
    default: "猫谱科技｜功能化微球与分离纯化解决方案",
    template: "%s｜猫谱科技",
  },
  description:
    "南京猫谱科技专注生物医药分离纯化，提供分析柱和制备柱、硅胶微球、磁性微球、聚合物微球、荧光微球及萃取材料与试剂。",
  keywords: [
    "猫谱科技",
    "More Pure TECH",
    "色谱柱",
    "硅胶微球",
    "磁性微球",
    "荧光微球",
    "固相萃取",
  ],
  openGraph: {
    title: "猫谱科技｜功能化微球与分离纯化解决方案",
    description: "从微球基质、表面修饰到色谱柱装填与样品前处理。",
    type: "website",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1f3d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <a className="skip-link" href="#main-content">跳至主要内容</a>
        <Header />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
