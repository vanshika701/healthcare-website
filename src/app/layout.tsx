import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BobVitalCare - Healthcare Resource Tracker",
  description: "Real-time tracking of critical healthcare resources with BobVitalCare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1a1f3c] text-[#f5f5f5]`}>
        {children}
      </body>
    </html>
  );
}
