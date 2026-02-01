"use client";

import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { use, useEffect } from "react";
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

  useEffect(() => {
    fetchMessageTabContent(slug);
  }, [slug, fetchMessageTabContent]);

  return (
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
    </div>
  );
};
