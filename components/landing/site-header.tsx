"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Pricing", href: "#pricing" },
  { label: "Features", href: "#features" },
  { label: "Products", href: "#product" },
  { label: "Enterprise", href: "#enterprise" },
  { label: "Docs", href: "#docs" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/50 bg-background/55 shadow-[0_8px_32px_rgb(0_0_0/0.12)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent shadow-none backdrop-blur-none"
      )}
    >
      <div className="relative flex w-full items-center justify-between px-5 py-1.5 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          reru.io
        </Link>

        <nav
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm text-muted-foreground md:flex"
          aria-label="Main"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-full">
            Log in
          </Button>
          <Button size="sm" className="rounded-full">
            Start free
          </Button>
        </div>
      </div>
    </header>
  );
}