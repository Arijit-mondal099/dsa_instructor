import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Arijit Mondal DSA Agent",
    template: "%s | Arijit Mondal DSA Agent",
  },
  description: "My personal dsa agent.",
  icons: "/favicon.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <AppContextProvider>
            {children}
            <Toaster />
        </AppContextProvider>
      </body>
    </html>
  );
}
