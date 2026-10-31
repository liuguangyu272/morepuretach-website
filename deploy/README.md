# 华为云运行配置

- 网站：`https://morepuretech.com` 和 `https://www.morepuretech.com`；HTTP 自动跳转 HTTPS。
- 后台：`https://admin.morepuretech.com/admin`。HTTPS 和管理员凭据未配置时拒绝访问。
- 运行服务：`morepure-website.service`，仅在本机 `127.0.0.1:4180` 监听。
- 更新：`morepure-deploy.timer` 每两分钟检查 GitHub `main`，只在提交变化时构建。
- 构建由独立的 `morepure-build` 用户执行；通过后切换代码目录，健康检查失败则切回旧版本。
- 程序版本：`/opt/morepure/releases/`，当前版本：`/opt/morepure/current`。
- 产品内容、询价记录、附件：`/var/lib/morepure/`，与代码目录分开。
- 私有管理员配置：`/etc/morepure/admin.env`，仅 root 可读，不进入 GitHub。
- 更新前的数据快照：`/var/backups/morepure/`。这仍属于同一台服务器，不能替代异地备份。
- 自动更新日志：`journalctl -u morepure-deploy.service`。
- 手动检查更新：`systemctl start morepure-deploy.service`。
- HTTPS 就绪后，由所有者在服务器终端运行 `morepure-set-admin`，自行输入独立管理员密码。
- 已安装覆盖根域名、www、admin 的 Let's Encrypt 证书。更换证书服务时需重新审阅其条款。
- 证书续期：`certbot.timer`；续期成功后重载 Nginx。

`server-deploy.sh` 安装为 root 所有的固定运维程序。普通 GitHub 更新不会替换这个特权程序；修改它需另行审阅并重新安装。

DNS 已委派至华为云：`ns1.huaweicloud-dns.com`、`ns1.huaweicloud-dns.cn`、`ns1.huaweicloud-dns.net`、`ns1.huaweicloud-dns.org`。在华为云维护根域名、`www`、`admin` 的 A 记录，当前均指向 `113.44.83.197`；域名注册和续费仍在腾讯云。
