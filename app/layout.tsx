import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Great_Vibes, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-greatvibes",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verj & Ann Wedding Invitation",
  description: "Verj & Ann Wedding Invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${greatVibes.variable} ${inter.variable} antialiased`}>
      <body className="antialiased bg-[var(--color-background)] text-[var(--color-foreground)] font-sans">
        {children}
      </body>
    </html>
  );
}
