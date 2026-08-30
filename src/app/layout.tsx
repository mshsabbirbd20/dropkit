import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/Logo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DropKit — drop a kit into Cursor instantly",
  description:
    "Built for new developers. Paste what you want to learn — DropKit gives you a ready-to-use kit for Cursor so the Agent teaches you step by step.",
  icons: {
    icon: "/dropkit-logo.png",
    apple: "/dropkit-logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${grotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-ink-border">
          <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="font-display text-xl font-semibold tracking-tight">
                DropKit
              </span>
            </Link>
            <div className="flex items-center gap-4 text-sm sm:gap-5">
              <Link
                href="/pricing"
                className="text-paper-dim transition hover:text-paper"
              >
                Pricing
              </Link>
              <Link
                href="/new"
                className="bg-accent px-4 py-1.5 text-sm font-medium text-ink transition hover:bg-accent-deep"
              >
                Start learning
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-ink-border">
          <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-5 text-xs leading-relaxed text-paper-dim sm:flex-row sm:items-center sm:justify-between">
            <p>Built by a member of the Cursor Dhaka Community.</p>
            <p>Built at a Cursor Dhaka Community event.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
