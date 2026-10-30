#!/usr/bin/env python3
"""Run directly by the owner in the server terminal; never echoes passwords."""
import getpass
import os
import re
import subprocess
import tempfile
from pathlib import Path

if os.geteuid() != 0:
    raise SystemExit("Run this command as root.")
if not Path("/etc/letsencrypt/live/morepuretech.com/fullchain.pem").exists():
    raise SystemExit("Enable HTTPS first with morepure-enable-https.")
username = input("Administrator username [morepure_admin]: ").strip() or "morepure_admin"
if not re.fullmatch(r"[A-Za-z0-9_.-]{3,64}", username):
    raise SystemExit("Use 3-64 letters, digits, underscores, dots or hyphens.")
password = getpass.getpass("New administrator password (at least 16 characters): ")
if len(password) < 16 or len(password) > 200:
    raise SystemExit("Use a password with 16-200 characters.")
if any(ord(c) < 32 or ord(c) > 126 for c in password):
    raise SystemExit("Use printable ASCII characters.")
if password != getpass.getpass("Confirm administrator password: "):
    raise SystemExit("Passwords do not match.")
def quote(value):
    return '"' + value.replace('\\', '\\\\').replace('"', '\\"') + '"'

directory = Path("/etc/morepure")
directory.mkdir(mode=0o700, parents=True, exist_ok=True)
fd, temporary = tempfile.mkstemp(prefix=".admin-", dir=directory)
with os.fdopen(fd, "w") as output:
    output.write(f"ADMIN_USERNAME={quote(username)}\n")
    output.write(f"ADMIN_PASSWORD={quote(password)}\n")
    output.write('ADMIN_ORIGIN="https://admin.morepuretech.com"\n')
os.chmod(temporary, 0o600)
os.replace(temporary, directory / "admin.env")
subprocess.run(["systemctl", "restart", "morepure-website"], check=True)
print("Administrator configured: https://admin.morepuretech.com/admin")
