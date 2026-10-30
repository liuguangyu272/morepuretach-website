#!/usr/bin/env bash
set -Eeuo pipefail
for domain in morepuretech.com www.morepuretech.com admin.morepuretech.com; do
    if ! dig +short "$domain" A | grep -qx '113.44.83.197'; then
        echo "DNS is not ready: $domain must resolve to 113.44.83.197" >&2
        exit 1
    fi
done
# Run interactively: the owner supplies their email and reviews CA terms.
certbot certonly --webroot -w /var/www/letsencrypt --cert-name morepuretech.com \
    -d morepuretech.com -d www.morepuretech.com -d admin.morepuretech.com
cp /etc/nginx/sites-available/morepure /etc/nginx/morepure-before-https.conf
cp /etc/morepure/nginx-https.conf /etc/nginx/sites-available/morepure
if ! nginx -t; then
    cp /etc/nginx/morepure-before-https.conf /etc/nginx/sites-available/morepure
    exit 1
fi
systemctl reload nginx
systemctl enable --now certbot.timer
echo 'HTTPS installed. Configure the administrator with morepure-set-admin.'
