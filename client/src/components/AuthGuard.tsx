"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { accessToken, messageTabs, getUserTabs } = useAppContext();

  useEffect(() => {
    getUserTabs();
  }, [getUserTabs]);

  useEffect(() => {
    if (messageTabs.length > 0) router.replace(`/chat/${messageTabs[0]._id}`);
    if (!accessToken) router.replace("/login");
  }, [router, accessToken, messageTabs]);

  return children;
}
