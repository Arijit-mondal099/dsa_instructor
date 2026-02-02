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

    const storedToken = localStorage.getItem("accessToken");
    const token = accessToken || storedToken;

    if (!token && (isChatRoot || isChatRoute)) {
      router.push("/login");
    } 
    
    else if (token && isAuthRoute) {
      if (chatId) {
        router.push(`/chat/${chatId}`);
      } else {
        router.push("/chat");
      }
    } 
    
    else if (token && chatId && isChatRoot) {
      router.push(`/chat/${chatId}`);
    }
  }, [accessToken, router, chatId]);

  return <>{children}</>;
}
