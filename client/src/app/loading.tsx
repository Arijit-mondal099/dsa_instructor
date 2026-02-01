export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-zinc-900">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-zinc-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Loading...</h2>
          <p className="text-sm text-zinc-400">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}
