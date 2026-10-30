import type { Metadata } from "next";
import AdminInquiryManager from "@/components/AdminInquiryManager";
import { getInquiries } from "@/data/inquiry-store";
import { contact } from "@/data/site";

export const metadata: Metadata = { title: "询价管理", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  return <AdminInquiryManager initialInquiries={await getInquiries()} smtpConfigured={Boolean(process.env.INQUIRY_SMTP_PASS?.trim())} notificationEmail={contact.email} />;
}
