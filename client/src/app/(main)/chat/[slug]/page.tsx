import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <Header />

      {/* Messages Container - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full pb-6">
          {/* User Message */}
          <div className="flex gap-4 justify-end">
            <div className="flex flex-col items-end gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-700 text-white">
                What is an array?
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-semibold shrink-0">
              U
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
              <Image
                src="/ai_image.jpg"
                className="w-full h-full object-cover"
                alt="ai-image"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-800 text-gray-100 leading-relaxed">
                An array is a data structure that stores a collection of
                elements in a sequential order. Each element can be accessed by
                its index (position) in the array. Arrays are useful for storing
                multiple values of the same type, like a list of numbers,
                strings, or objects.
              </p>
            </div>
          </div>

          {/* Another User Message */}
          <div className="flex gap-4 justify-end">
            <div className="flex flex-col items-end gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-700 text-white">
                Can you show me an example in JavaScript?
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-semibold shrink-0">
              U
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
              <Image
                src="/ai_image.jpg"
                className="w-full h-full object-cover"
                alt="ai-image"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-800 text-gray-100 leading-relaxed">
                Sure! Here&apos;s a simple example of creating and working with
                arrays in JavaScript. You can declare an array using square
                brackets and access elements using their index (starting from
                0).
              </p>
            </div>
          </div>

          {/* Another User Message */}
          <div className="flex gap-4 justify-end">
            <div className="flex flex-col items-end gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-700 text-white">
                Can you show me an example in JavaScript?
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-semibold shrink-0">
              U
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
              <Image
                src="/ai_image.jpg"
                className="w-full h-full object-cover"
                alt="ai-image"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-800 text-gray-100 leading-relaxed">
                Sure! Here&apos;s a simple example of creating and working with
                arrays in JavaScript. You can declare an array using square
                brackets and access elements using their index (starting from
                0).
              </p>
            </div>
          </div>

          {/* Another User Message */}
          <div className="flex gap-4 justify-end">
            <div className="flex flex-col items-end gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-700 text-white">
                Can you show me an example in JavaScript?
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-semibold shrink-0">
              U
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
              <Image
                src="/ai_image.jpg"
                className="w-full h-full object-cover"
                alt="ai-image"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-800 text-gray-100 leading-relaxed">
                Sure! Here&apos;s a simple example of creating and working with
                arrays in JavaScript. You can declare an array using square
                brackets and access elements using their index (starting from
                0).
              </p>
            </div>
          </div>

          {/* Another User Message */}
          <div className="flex gap-4 justify-end">
            <div className="flex flex-col items-end gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-700 text-white">
                Can you show me an example in JavaScript?
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-semibold shrink-0">
              U
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
              <Image
                src="/ai_image.jpg"
                className="w-full h-full object-cover"
                alt="ai-image"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-800 text-gray-100 leading-relaxed">
                Sure! Here&apos;s a simple example of creating and working with
                arrays in JavaScript. You can declare an array using square
                brackets and access elements using their index (starting from
                0).
              </p>
            </div>
          </div>

          {/* Another User Message */}
          <div className="flex gap-4 justify-end">
            <div className="flex flex-col items-end gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-700 text-white">
                Can you show me an example in JavaScript?
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-semibold shrink-0">
              U
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden">
              <Image
                src="/ai_image.jpg"
                className="w-full h-full object-cover"
                alt="ai-image"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2 max-w-[80%]">
              <p className="py-3 px-4 rounded-3xl bg-zinc-800 text-gray-100 leading-relaxed">
                Sure! Here&apos;s a simple example of creating and working with
                arrays in JavaScript. You can declare an array using square
                brackets and access elements using their index (starting from
                0).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="shrink-0">
        <Input />
      </div>
    </div>
  );
}
