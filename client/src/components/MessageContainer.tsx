"use client";

import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { use, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MessageContainerProps {
  params: Promise<{ slug: string }>;
}

export const MessageContainer: React.FC<MessageContainerProps> = ({
  params,
}) => {
  const { slug } = use(params);
  const { fetchMessageTabContent, selectTabContent } = useAppContext();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMessageTabContent(slug);
  }, [slug, fetchMessageTabContent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectTabContent]);

  return selectTabContent.length ? (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full pb-6">
      {selectTabContent.map((msg) =>
        msg.role === "user" ? (
          <div className="flex gap-4 justify-end" key={msg._id}>
            <div className="flex flex-col items-end gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-700 text-white whitespace-pre-wrap">
                {msg.text}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-semibold shrink-0">
              U
            </div>
          </div>
        ) : (
          <div className="flex gap-4" key={msg._id}>
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
              <Image
                src="/ai_image.jpg"
                className="w-full h-full object-cover"
                alt="ai-image"
                width={100}
                height={100}
              />
            </div>

            {/* ✅ FIXED: missing div */}
            <div className="flex flex-col gap-2 max-w-[80%]">
              <div className="py-3 px-4 rounded-3xl bg-zinc-800 text-gray-100 prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code: ({ inline, className, children, ...props }: any) =>
                      !inline ? (
                        <code
                          className={`${className || ""} block bg-zinc-900 rounded-lg p-4 overflow-x-auto`}
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <code
                          className="bg-zinc-700 px-1.5 py-0.5 rounded text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      ),
                    pre: ({ children }: any) => (
                      <pre className="bg-zinc-900 rounded-lg overflow-hidden my-2">
                        {children}
                      </pre>
                    ),
                    p: ({ children }: any) => (
                      <p className="mb-2 last:mb-0 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }: any) => (
                      <ul className="list-disc list-inside mb-2 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }: any) => (
                      <ol className="list-decimal list-inside mb-2 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }: any) => (
                      <li className="ml-2">{children}</li>
                    ),
                    h1: ({ children }: any) => (
                      <h1 className="text-2xl font-bold mb-2 mt-4 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }: any) => (
                      <h2 className="text-xl font-bold mb-2 mt-3 first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }: any) => (
                      <h3 className="text-lg font-bold mb-2 mt-2 first:mt-0">
                        {children}
                      </h3>
                    ),
                    a: ({ children, href }: any) => (
                      <a
                        href={href}
                        className="text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }: any) => (
                      <blockquote className="border-l-4 border-zinc-600 pl-4 italic my-2">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ),
      )}

      <div ref={bottomRef} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* AI Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-zinc-700/50">
          <Image
            src="/ai_image.jpg"
            className="w-full h-full object-cover"
            alt="ai-image"
            width={80}
            height={80}
          />
        </div>

        {/* Welcome Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white">
            How can I help you with DSA today?
          </h2>
          <p className="text-zinc-400 text-lg">
            Ask me anything about Data Structures and Algorithms
          </p>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 w-full max-w-2xl">
          <button className="group p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left transition-all duration-200 border border-zinc-700 hover:border-zinc-600">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Explain a concept
                </h3>
                <p className="text-sm text-zinc-400">
                  Learn about sorting, trees, graphs, and more
                </p>
              </div>
            </div>
          </button>

          <button className="group p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left transition-all duration-200 border border-zinc-700 hover:border-zinc-600">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Solve a problem
                </h3>
                <p className="text-sm text-zinc-400">
                  Get help with coding challenges and solutions
                </p>
              </div>
            </div>
          </button>

          <button className="group p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left transition-all duration-200 border border-zinc-700 hover:border-zinc-600">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Analyze complexity
                </h3>
                <p className="text-sm text-zinc-400">
                  Understand time and space complexity
                </p>
              </div>
            </div>
          </button>

          <button className="group p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-left transition-all duration-200 border border-zinc-700 hover:border-zinc-600">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <h3 className="font-semibold text-white mb-1">Optimize code</h3>
                <p className="text-sm text-zinc-400">
                  Improve your algorithm efficiency
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
