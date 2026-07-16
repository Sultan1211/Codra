import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CtxProvider } from "../lib/context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "CoDraw — Collaborative Drawing",
  description: "Real-time collaborative whiteboarding, built with tldraw sync.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CtxProvider>{children}</CtxProvider>
      </body>
    </html>
  );
}
