import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

function equal(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

export function proxy(request: NextRequest) {
  const headers = { "Cache-Control": "no-store" };
  // Downloads are private until explicitly reviewed for publication.
  if (request.nextUrl.pathname.startsWith("/downloads")) {
    return new NextResponse("Not found", { status: 404, headers });
  }
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password || password.length < 16) {
    return new NextResponse("Admin access is not configured", { status: 503, headers });
  }
  const authorization = request.headers.get("authorization") || "";
  let valid = false;
  if (authorization.startsWith("Basic ")) {
    const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator >= 0) {
      const validUser = equal(decoded.slice(0, separator), username);
      const validPassword = equal(decoded.slice(separator + 1), password);
      valid = validUser && validPassword;
    }
  }
  if (!valid) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { ...headers, "WWW-Authenticate": 'Basic realm="MorePure Admin", charset="UTF-8"' },
    });
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    const origin = request.headers.get("origin");
    const expected = process.env.ADMIN_ORIGIN || request.nextUrl.origin;
    if (origin !== expected || request.headers.get("sec-fetch-site") === "cross-site") {
      return new NextResponse("Forbidden origin", { status: 403, headers });
    }
  }
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/downloads/:path*"],
};
