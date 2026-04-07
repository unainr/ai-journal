"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "../theme/mode-toggle";
import { SignInButtonClerk } from "../clerk-sign-button/Sign-in-button";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Dashboard", href: "/dashboard" },
];

export function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-white/6 bg-background/50 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5">

          {/* LEFT — logo + separator + links */}
          <div className="flex h-full items-center">
            <Link href="/" className="flex items-center gap-2 pr-5">
              <Image
                src="/logo2.png"
                alt="InkFlow"
                width={120}
                height={32}
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Separator */}
            <div className="hidden h-5 w-px bg-white/10 lg:block" />

            {/* Desktop links */}
            <ul className="ml-5 hidden h-full items-center lg:flex">
              {/* {menuItems.map((item) => (
                <li key={item.href} className="h-full">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex h-full items-center px-3.5 text-sm font-medium transition-colors duration-150",
                      isActive(item.href)
                        ? "text-[#d84b67] after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:rounded-t after:bg-[#f86c88]"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))} */}
            </ul>
          </div>

          {/* RIGHT — theme + separator + cta + mobile toggle */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher />

            {/* Separator */}
            <div className="hidden h-5 w-px bg-white/10 lg:block" />

            <div className="hidden items-center gap-2 lg:flex">
              <SignInButtonClerk />
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-white/8 bg-transparent text-muted-foreground transition-colors hover:text-foreground lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-14 z-40 border-b border-white/6 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-red-500/10 text-[#f86c88]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 border-t border-white/6 pt-3">
              <SignInButtonClerk />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}