"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { accessToken } = useAppContext();

  useEffect(() => {
    if (!accessToken) router.replace("/login");
    else router.replace("/chat/1");
  }, [router, accessToken]);

  return children;
}
