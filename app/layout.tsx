import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins-var",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter-var",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    
    icon: "/Icon.png",
  },
  title: "Alrix — Fullstack Developer",
  description:
    "Portfolio of Alif Rizqullah Maruf (Alrix) — Fullstack Developer based in Yogyakarta. Specializing in Frontend, Backend, and Smart Contract development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-bg-white font-poppins">
        {children}
      </body>
    </html>
  );
}
