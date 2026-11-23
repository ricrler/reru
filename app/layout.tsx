import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona-sans",
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "reru.io — Email validation, warmup, and deliverability",
  description:
    "Validate addresses, warm inboxes, test placement, preview across clients, and draft templates with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", monaSans.variable)}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}