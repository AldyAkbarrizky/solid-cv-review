import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI CV Review - Optimasi CV Dengan Kecerdasan Buatan",
  description:
    "Analisis CV Anda dengan AI untuk mendapatkan feedback mendalam dan meningkatkan peluang lolos seleksi kerja. Dapatkan skor kecocokan dengan job description yang Anda targetkan.",
  keywords:
    "CV review, AI, analisis CV, optimasi CV, feedback CV, career assistant",
  authors: [{ name: "Aldy Akbarrizky" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
