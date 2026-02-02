"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { accessToken, chatId } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isAuthRoute = currentPath === "/login" || currentPath === "/register";
    const isChatRoot = currentPath === "/" || currentPath === "/chat";
    const isChatRoute = currentPath.startsWith("/chat/");

    if (!accessToken && (isChatRoot || isChatRoute)) {
      return router.push("/login");
    }

    if (accessToken && isAuthRoute && chatId) {
      return router.push(`/chat/${chatId}`);
    }

    if (accessToken && chatId && isChatRoot) {
      return router.push(`/chat/${chatId}`);
    }
  }, [accessToken, router, chatId]);

  return <>{children}</>;
}
