import type { Metadata } from "next";
import AdminProductManager from "@/components/AdminProductManager";
import { getProductStore } from "@/data/product-store";

export const metadata: Metadata = {
  title: "产品内容管理后台",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  return <AdminProductManager initialStore={await getProductStore()} />;
}
