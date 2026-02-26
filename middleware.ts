import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/products"];
const authPaths = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuthToken = request.cookies.get("auth-token")?.value === "true";

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

  if (isProtected && !hasAuthToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAuthPath = authPaths.some((path) => pathname === path);

  if (isAuthPath && hasAuthToken) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/login"],
};
