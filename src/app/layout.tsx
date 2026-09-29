import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Has Trump Made Things Cheaper Yet?",
  description: "A plain-English, data-backed tracker of U.S. consumer prices since January 2025.",
  metadataBase: new URL("https://www.hastrumpmadethingscheaperyet.com"),
  openGraph: {
    title: "Has Trump Made Things Cheaper Yet?",
    description: "The answer, the numbers, and the context behind U.S. consumer prices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
