import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSA Agent",
  description: "My personal dsa agent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="w-full shadow border-b border-gray-800">
          <Navbar />
        </header>

        <main className="flex-1 grid grid-cols-12">
          <aside className="col-span-2 border-r border-gray-800 shadow">
            <Sidebar />
          </aside>

          <div className="col-span-10 bg-zinc-900 w-full">
            {children}
          </div>
        </main>

        <footer className="w-full border-t border-gray-800 shadow">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
