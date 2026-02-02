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

    if (!accessToken && (isChatRoot || isChatRoute)) router.push("/login");
    else if (accessToken && isAuthRoute && chatId) router.push(`/chat/${chatId}`);
    else if (accessToken && chatId && isChatRoot) router.push(`/chat/${chatId}`);
    else router.replace("/login");
  }, [accessToken, router, chatId]);

  return <>{children}</>;
}
