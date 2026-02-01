import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
//   const token = req.cookies.get("accessToken")?.value;
//   const pathname = req.nextUrl.pathname;

//   const isAuthRoute = pathname === "/login" || pathname === "/register";
//   const isChatRoute = pathname.startsWith("/chat");

//   if (!token && isChatRoute) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (token && isAuthRoute) {
//     return NextResponse.redirect(new URL("/chat", req.url));
//   }

//   return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/login", "/register"],
};
