import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SettingsMenu from "@/components/SettingsMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stylist_OS // v1.0",
  description: "Unified Wardrobe Management & Style Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 1. We lock the body to the exact screen height and make it a flex column */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-background text-foreground flex flex-col overflow-hidden`}>
        
        <SettingsMenu />
        
        {/* 2. The main content area takes up all remaining space and handles its own scrolling */}
        <div className="flex-1 overflow-y-auto w-full relative">
          {children}
        </div>

        {/* 3. The Navigation is now planted at the bottom of the document flow */}
        <Navigation />
        
      </body>
    </html>
  );
}