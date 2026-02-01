"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken, messageTabs, getUserTabs } = useAppContext();

  useEffect(() => {
    if (accessToken) {
      getUserTabs();
    }
  }, [accessToken, getUserTabs]);

  useEffect(() => {
    const isAuthRoute =
      pathname === "/login" || pathname === "/register";
    const isChatRoute = pathname.startsWith("/chat");

    if (!accessToken) {
      if (isChatRoute) {
        router.replace("/login");
      }
      return;
    }

    if (accessToken) {
      if (isAuthRoute) {
        if (messageTabs.length > 0) {
          router.replace(`/chat/${messageTabs[0]._id}`);
        }
      }
    }
  }, [accessToken, pathname, router, messageTabs]);

  return children;
}
