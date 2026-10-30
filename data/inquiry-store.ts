import { randomInt, randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { contact } from "@/data/site";
import { inquiryStatuses, type InquiryAttachment, type InquiryInput, type InquiryRecord } from "@/data/inquiry-types";

type InquiryStore = {
  version: 1;
  updatedAt: string;
  inquiries: InquiryRecord[];
};

export class InquiryValidationError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

const allowedInquiryTypes = ["产品报价", "产品选型", "技术支持", "资料申请", "定制开发/合作咨询"];
const maxLengths: Record<keyof Omit<InquiryInput, "consent">, number> = {
  inquiryType: 30,
  productSlug: 120,
  productName: 160,
  code: 120,
  quantity: 120,
  application: 300,
  message: 5000,
  name: 80,
  organization: 160,
  phone: 24,
  email: 160,
  region: 160,
};

function storePath() {
  return process.env.INQUIRY_DATA_PATH
    ? path.resolve(process.env.INQUIRY_DATA_PATH)
    : path.join(process.cwd(), "data", "inquiries.local.json");
}

export function inquiryAttachmentDirectory() {
  return process.env.INQUIRY_ATTACHMENT_DIR
    ? path.resolve(process.env.INQUIRY_ATTACHMENT_DIR)
    : path.join(process.cwd(), "data", "inquiry-attachments");
}

async function readStore(): Promise<InquiryStore> {
  try {
    const value = JSON.parse(await fs.readFile(storePath(), "utf8")) as InquiryStore;
    return { version: 1, updatedAt: value.updatedAt, inquiries: Array.isArray(value.inquiries) ? value.inquiries : [] };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { version: 1, updatedAt: new Date().toISOString(), inquiries: [] };
    }
    throw error;
  }
}

async function writeStore(store: InquiryStore) {
  const file = storePath();
  await fs.mkdir(path.dirname(file), { recursive: true });
  store.updatedAt = new Date().toISOString();
  await fs.writeFile(file, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

function clean(value: unknown, field: keyof Omit<InquiryInput, "consent">) {
  const text = typeof value === "string" ? value.trim().replace(/\0/g, "") : "";
  if (text.length > maxLengths[field]) throw new InquiryValidationError(`${field} 内容过长`);
  return text;
}

export function validateInquiryInput(value: Record<string, unknown>): InquiryInput {
  const input: InquiryInput = {
    inquiryType: clean(value.inquiryType, "inquiryType"),
    productSlug: clean(value.productSlug, "productSlug"),
    productName: clean(value.productName, "productName"),
    code: clean(value.code, "code"),
    quantity: clean(value.quantity, "quantity"),
    application: clean(value.application, "application"),
    message: clean(value.message, "message"),
    name: clean(value.name, "name"),
    organization: clean(value.organization, "organization"),
    phone: clean(value.phone, "phone"),
    email: clean(value.email, "email"),
    region: clean(value.region, "region"),
    consent: value.consent === true || value.consent === "on" || value.consent === "true",
  };

  if (!allowedInquiryTypes.includes(input.inquiryType)) throw new InquiryValidationError("请选择有效的咨询类型");
  if (input.message.length < 10) throw new InquiryValidationError("需求说明至少需要 10 个字符");
  if (input.name.length < 2) throw new InquiryValidationError("请填写姓名");
  if (input.organization.length < 2) throw new InquiryValidationError("请填写公司或机构");
  if (!/^[\d+()\-\s]{6,24}$/.test(input.phone)) throw new InquiryValidationError("请填写有效联系电话");
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) throw new InquiryValidationError("请填写有效电子邮箱");
  if (!input.consent) throw new InquiryValidationError("请先同意询价信息处理说明");
  return input;
}

function newInquiryId(existing: InquiryRecord[]) {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  let id = "";
  do id = `MP-${date}-${randomInt(100000, 1000000)}`;
  while (existing.some((item) => item.id === id));
  return id;
}

export async function saveInquiryAttachment(file: File): Promise<InquiryAttachment> {
  const allowedExtensions = new Set([".pdf", ".doc", ".docx", ".xls", ".xlsx", ".png", ".jpg", ".jpeg"]);
  const extension = path.extname(file.name).toLowerCase();
  if (!allowedExtensions.has(extension)) throw new InquiryValidationError("附件格式不支持");
  if (file.size > 5 * 1024 * 1024) throw new InquiryValidationError("附件不能超过 5 MB");
  const storedName = `${randomUUID()}${extension}`;
  const directory = inquiryAttachmentDirectory();
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, storedName), Buffer.from(await file.arrayBuffer()));
  return { originalName: file.name.slice(0, 180), storedName, mimeType: file.type || "application/octet-stream", size: file.size };
}

export async function createInquiry(input: InquiryInput, context: { sourceIp: string; userAgent: string; attachment?: InquiryAttachment }) {
  const store = await readStore();
  const duplicateSince = Date.now() - 2 * 60 * 1000;
  const duplicate = store.inquiries.some((item) =>
    Date.parse(item.createdAt) >= duplicateSince && item.phone === input.phone && item.message === input.message,
  );
  if (duplicate) throw new InquiryValidationError("请勿重复提交相同需求", 409);

  const now = new Date().toISOString();
  const record: InquiryRecord = {
    ...input,
    id: newInquiryId(store.inquiries),
    createdAt: now,
    updatedAt: now,
    status: "新提交",
    internalNote: "",
    assignedSales: contact.phoneContacts.filter((item) => item.role === "销售").map((item) => item.number),
    notificationEmail: contact.email,
    responseExpectation: "尽快响应",
    emailStatus: "pending",
    emailError: "",
    attachment: context.attachment,
    sourceIp: context.sourceIp,
    userAgent: context.userAgent.slice(0, 300),
  };
  store.inquiries.unshift(record);
  await writeStore(store);
  return record;
}

export async function getInquiries() {
  return (await readStore()).inquiries;
}

export async function getInquiry(id: string) {
  return (await readStore()).inquiries.find((item) => item.id === id);
}

export async function updateInquiry(id: string, patch: Partial<Pick<InquiryRecord, "status" | "internalNote" | "emailStatus" | "emailError">>) {
  const store = await readStore();
  const index = store.inquiries.findIndex((item) => item.id === id);
  if (index < 0) throw new InquiryValidationError("询价记录不存在", 404);
  if (patch.status && !inquiryStatuses.includes(patch.status)) throw new InquiryValidationError("询价状态无效");
  const current = store.inquiries[index];
  const next: InquiryRecord = {
    ...current,
    ...(patch.status ? { status: patch.status } : {}),
    ...(typeof patch.internalNote === "string" ? { internalNote: patch.internalNote.trim().slice(0, 5000) } : {}),
    ...(patch.emailStatus ? { emailStatus: patch.emailStatus } : {}),
    ...(typeof patch.emailError === "string" ? { emailError: patch.emailError.slice(0, 500) } : {}),
    updatedAt: new Date().toISOString(),
  };
  store.inquiries[index] = next;
  await writeStore(store);
  return next;
}
