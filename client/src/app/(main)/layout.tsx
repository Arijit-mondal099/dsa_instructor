import { Sidebar } from "@/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <main className="flex-1 grid lg:grid-cols-12 overflow-hidden">
        <Sidebar />

        <div className="lg:col-span-10 bg-zinc-800 w-full overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
