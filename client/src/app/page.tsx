export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-4 h-full">
      <div className="flex-1 flex flex-col gap-4 max-w-2xl mx-auto w-full">
        <div className="justify-items-end space-y-2">
          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center font-bold">
            A
          </div>

          <p className="py-2 px-4 rounded-lg bg-zinc-700">What is an array?</p>
        </div>

        <div className="justify-items-start space-y-2">
          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center font-bold">
            A
          </div>

          <p className="py-2 px-4 rounded-lg bg-gray-950">
            You’re very close — the logic is correct, the error is now purely
            TypeScript typing, not Mongoose logic. The problem is in your ITab
            interface typing You’re very close — the logic is correct, the error
            is now purely TypeScript typing, not Mongoose logic. The problem is
            in your ITab interface typing 👇
          </p>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto w-full bg-zinc-700 rounded-2xl min-h-24 max-h-24 overflow-hidden">
        <textarea
          name=""
          id=""
          placeholder="How can i help you today?"
          className="min-h-24 max-h-24 w-full p-2"
        ></textarea>

        <button className="absolute z-50 bg-orange-500 top-0">Sent</button>
      </div>
    </div>
  );
}
