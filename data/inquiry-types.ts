export const inquiryStatuses = ["新提交", "已联系", "已报价/处理中", "已完成", "无效/垃圾"] as const;
export type InquiryStatus = (typeof inquiryStatuses)[number];
export type InquiryEmailStatus = "pending" | "sent" | "failed" | "unconfigured";

export type InquiryAttachment = {
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
};

export type InquiryInput = {
  inquiryType: string;
  productSlug: string;
  productName: string;
  code: string;
  quantity: string;
  application: string;
  message: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  region: string;
  consent: boolean;
};

export type InquiryRecord = InquiryInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: InquiryStatus;
  internalNote: string;
  assignedSales: string[];
  notificationEmail: string;
  responseExpectation: string;
  emailStatus: InquiryEmailStatus;
  emailError: string;
  attachment?: InquiryAttachment;
  sourceIp: string;
  userAgent: string;
};
