import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const chatId = req.cookies.get("chat-id")?.value;
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isChatRoot = pathname === "/" || pathname === "/chat";
  const isChatRoute = pathname.startsWith("/chat/");

  if (!token && (isChatRoot || isChatRoute)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthRoute && chatId) {
    return NextResponse.redirect(new URL(`/chat/${chatId}`, req.url));
  }

  if (token && chatId && isChatRoot) {
    return NextResponse.redirect(new URL(`/chat/${chatId}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/chat", "/chat/:path*", "/login", "/register"],
};
