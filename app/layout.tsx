import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/components/providers/ToasterProvider";

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
    default: "Octopus Mini E-Ticaret",
    template: "%s | Octopus Mini E-Ticaret",
  },
  description:
    "Octopus Mini E-Ticaret — En uygun fiyatlarla elektronik, giyim, aksesuar ve daha fazlasını keşfedin.",
  keywords: ["e-ticaret", "online alışveriş", "octopus mini e-ticaret"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Octopus Mini E-Ticaret",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
