"use client";

import { useRouter } from "next/navigation";
import { Sparkles, MessageSquare } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-800 text-white px-6 overflow-hidden relative">
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
