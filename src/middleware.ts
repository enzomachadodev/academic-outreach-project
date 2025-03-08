import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/config/routes";

export default async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.includes(pathname);

  try {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      if (isAuthRoute || isPublicRoute) {
        return NextResponse.next();
      }

      const callbackUrl = `${pathname}${request.nextUrl.search || ""}`;
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodedCallbackUrl}`, request.url),
      );
    }

    if (isAuthRoute) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url),
      );
    }
  } catch (error) {
    console.error("Erro ao verificar a sessão:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.ico$|.*\\.jpg$).*)",
  ],
};
