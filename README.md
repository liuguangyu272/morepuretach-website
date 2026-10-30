# 猫谱科技官网、产品后台与询价系统

基于 `company-materials-website` 资料制作的 Next.js 响应式网站，包含 55 个产品系列、15 类可申请资料、产品内容后台和真实询价记录。

## 打开网站

双击上一级目录的 `START-MOREPURE-WEBSITE.cmd`：

- 网站：`http://localhost:4180`
- 产品后台：`http://localhost:4180/admin`
- 询价管理：`http://localhost:4180/admin/inquiries`

脚本使用 Codex 自带的 Node.js 与 pnpm，不要求系统全局安装 pnpm。

## 询价处理规则

- 负责邮箱：`morepuretech@163.com`；
- 两位销售 `18602975022`、`15312984115` 共同负责全部询价；
- 响应要求：尽快响应；
- 不向客户自动发送确认邮件；
- 提交后先保存询价，再向负责邮箱发送通知；
- 支持最大 5 MB 的 PDF、Word、Excel 或图片附件；
- 后台可更新状态和内部备注，并导出 CSV。

## 启用 163 邮件通知

网站已配置 163 SMTP，但授权码必须由邮箱所有者在本机填写，不能写入源码。

1. 在 163 邮箱设置中开启 SMTP 服务并生成“客户端授权码”。
2. 双击上一级目录的 `SETUP-INQUIRY-EMAIL.cmd`。
3. 输入授权码；输入时不会显示字符。
4. 重新启动网站。
5. 打开 `/admin/inquiries`，顶部显示“163 邮件通知已配置”即表示配置已载入。

授权码只保存在被忽略的 `.env.local`，不要把它发送给他人或放入源码压缩包。

## 数据位置

- 产品内容：`data/product-content-store.json`
- 询价记录：`data/inquiries.local.json`
- 询价附件：`data/inquiry-attachments/`
- 邮件配置：`.env.local`

询价和附件不会放入源码压缩包。后台和管理接口现在要求 HTTP Basic 身份认证。请在环境变量中设置 ADMIN_USERNAME、至少 16 位的 ADMIN_PASSWORD，以及正式站点的 ADMIN_ORIGIN；生产环境必须使用 HTTPS。未配置时拒绝访问。下载文件仅保留本机，禁止提交或部署，/downloads 路径默认返回 404。

## 已完成验收

- `pnpm typecheck` 与生产构建通过；
- 实测真实询价保存、唯一编号、两位销售共同分配、附件、状态备注和 CSV 导出；
- 未配置授权码时，询价仍会保存并在后台显示邮件待配置；
- 电脑、平板和手机无断图、标题孤行或横向溢出；
- 历史验收曾包含公开下载；当前版本已按保密要求关闭下载，改为资料申请。

详细结果见 `QA-REPORT.json`。
