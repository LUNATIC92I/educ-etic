import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

const CHILD_PREFIXES = ["/dashboard", "/learn", "/quiz"];
const PARENT_PREFIXES = ["/parent", "/payment"];
const ADMIN_PREFIXES = ["/admin"];
const AUTHENTICATED_PREFIXES = ["/profile", "/editor"];

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  const needsAuth =
    matchesPrefix(pathname, CHILD_PREFIXES) ||
    matchesPrefix(pathname, PARENT_PREFIXES) ||
    matchesPrefix(pathname, ADMIN_PREFIXES) ||
    matchesPrefix(pathname, AUTHENTICATED_PREFIXES);

  if (!needsAuth) return NextResponse.next();

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (matchesPrefix(pathname, ADMIN_PREFIXES) && session.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (matchesPrefix(pathname, PARENT_PREFIXES) && session.role !== "PARENT") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (matchesPrefix(pathname, CHILD_PREFIXES) && session.role === "PARENT") {
    return NextResponse.redirect(new URL("/parent", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/learn/:path*",
    "/quiz/:path*",
    "/parent/:path*",
    "/payment/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/editor/:path*",
  ],
};
