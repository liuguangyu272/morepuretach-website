#!/usr/bin/env bash
set -Eeuo pipefail
umask 022
exec 9>/run/lock/morepure-deploy.lock
flock -n 9 || exit 0
base=/opt/morepure
repo="$base/repository"
as_build() { runuser -u morepure-build -- "$@"; }
as_build git -C "$repo" fetch --depth=1 origin main
sha=$(as_build git -C "$repo" rev-parse FETCH_HEAD)
[[ "$sha" =~ ^[0-9a-f]{40}$ ]]
old=$(readlink -f "$base/current")
if [[ -f "$old/.release-sha" ]] && [[ "$(cat "$old/.release-sha")" == "$sha" ]]; then
  echo "Already deployed $sha"
  exit 0
fi
release=$(mktemp -d "$base/releases/$sha.XXXXXXXX")
chown morepure-build:morepure-build "$release"
as_build bash -o pipefail -c 'git -C "$1" archive "$2" | tar -x -C "$3"' -- "$repo" "$sha" "$release"
as_build bash -Eeuo pipefail -c 'cd "$1"; export NEXT_TELEMETRY_DISABLED=1; pnpm install --frozen-lockfile; pnpm typecheck; pnpm build' -- "$release"
# Runtime data never comes from a new Git checkout.
mv "$release/data/product-content-store.json" "$release/data/product-content-store.seed.json"
ln -s /var/lib/morepure/product-content-store.json "$release/data/product-content-store.json"
if [[ -d "$release/.next/cache" ]]; then
  mv "$release/.next/cache" "$release/.next/build-cache"
fi
ln -s /var/cache/morepure "$release/.next/cache"
printf '%s\n' "$sha" > "$release/.release-sha"
chown -R root:root "$release"
chmod -R a+rX "$release"
chmod -R a-w "$release"
# Start on a private test port before disturbing the running website.
systemd-run --quiet --collect --unit=morepure-smoke \
  --property=User=morepure --property="WorkingDirectory=$release" \
  --property=RuntimeMaxSec=45 --property=NoNewPrivileges=yes \
  --property=ProtectSystem=strict \
  --property="ReadWritePaths=/var/lib/morepure /var/cache/morepure" \
  --setenv=NODE_ENV=production --setenv=NEXT_TELEMETRY_DISABLED=1 \
  /usr/bin/node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 4181
trap 'systemctl stop morepure-smoke.service >/dev/null 2>&1 || true' EXIT
smoke_ok=false
for attempt in {1..30}; do
  if curl -fsS --max-time 3 http://127.0.0.1:4181/ -o /dev/null 2>/dev/null; then
    smoke_ok=true
    break
  fi
  sleep 1
done
systemctl stop morepure-smoke.service
trap - EXIT
if [[ "$smoke_ok" != true ]]; then
  echo 'Preflight failed; the running website was left untouched.' >&2
  exit 1
fi
install -d -m 700 /var/backups/morepure
tar -C /var/lib/morepure -czf "/var/backups/morepure/predeploy-$(date -u +%Y%m%dT%H%M%SZ).tgz" .
switch_release() {
  ln -sfn "$1" "$base/current.next"
  mv -Tf "$base/current.next" "$base/current"
}
rollback() {
  echo "Deployment failed; restoring $old" >&2
  switch_release "$old"
  systemctl restart morepure-website || true
}
switch_release "$release"
trap rollback ERR
systemctl restart morepure-website
healthy=false
for attempt in {1..30}; do
  if curl -fsS --max-time 3 http://127.0.0.1:4180/ -o /dev/null 2>/dev/null; then
    healthy=true
    break
  fi
  sleep 1
done
if [[ "$healthy" != true ]]; then
  rollback
  trap - ERR
  exit 1
fi
trap - ERR
printf '%s\n' "$old" > "$base/previous-release"
echo "Deployed $sha"
