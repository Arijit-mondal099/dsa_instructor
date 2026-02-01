"use client";

import { useRouter } from "next/navigation";
import { Home, Sparkles, MessageSquare, LogIn } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function NotFound() {
  const router = useRouter();
  const { messageTabs, accessToken } = useAppContext();

  const handleNavigate = () => {
    if (accessToken && messageTabs.length > 0) {
      router.push(`/chat/${messageTabs[0]._id}`);
    } else if (!accessToken) {
      router.push(`/login`);
    } else {
      router.push(`/login`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900 text-white px-6 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[200px] font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 animate-pulse">
            404
          </h1>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-300">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-bounce" />
          </div>
        </div>

        <div className="space-y-3 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Lost in the Algorithm?
          </h2>
          <p className="text-lg text-zinc-400 max-w-md mx-auto leading-relaxed">
            This page doesn&apos;t exist, but your DSA journey continues!
            Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleNavigate}
            className="group relative overflow-hidden bg-linear-to-r from-emerald-600 to-cyan-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              {accessToken ? (
                <>
                  <Home className="w-5 h-5" />
                  Start New Chat
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>

          <button
            onClick={() => router.back()}
            className="group bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border-2 border-zinc-700 hover:border-emerald-500 cursor-pointer"
          >
            <span className="flex items-center gap-2 justify-center">
              ← Go Back
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
