# 华为云运行配置

- 网站：`http://113.44.83.197`；域名生效并签发证书后使用 `https://morepuretech.com`。
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
- 证书申请：先使根域名、www、admin 的 A 记录指向服务器，再由所有者运行 `morepure-enable-https`，输入邮箱并审阅证书服务条款。
- 证书续期：`certbot.timer`；续期成功后重载 Nginx。

`server-deploy.sh` 安装为 root 所有的固定运维程序。普通 GitHub 更新不会替换这个特权程序；修改它需另行审阅并重新安装。

DNS 当前由 DNSPod 的 `drew.dnspod.net` 和 `gosling.dnspod.net` 管理。华为云 DNS 区域中的记录只有在域名委派给华为云后才会生效。
