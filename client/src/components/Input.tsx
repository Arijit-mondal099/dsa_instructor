"use client";

import { useAppContext } from "@/context/AppContext";
import { useState, useRef, useEffect } from "react";

export const Input = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sentMessageToAI } = useAppContext();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim()) {
      sentMessageToAI(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-4 px-2 lg:px-0">
      <div className="relative bg-zinc-900 rounded-3xl shadow-xl border border-zinc-900">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How can i help you today?"
          rows={1}
          className="w-full bg-transparent text-white placeholder-zinc-400 resize-none outline-none px-5 py-4 pr-14 max-h-50 overflow-y-auto"
          style={{ minHeight: "56px" }}
        />

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`absolute right-3 bottom-3 p-2 rounded-xl transition-all duration-200 ${
            message.trim()
              ? "bg-orange-500 text-white hover:bg-orange-700 cursor-pointer"
              : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>

      <p className="text-xs text-zinc-500 text-center mt-3">
        Press Enter to send, Shift + Enter for new line
      </p>
    </div>
  );
};
