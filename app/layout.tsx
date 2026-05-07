import type { Metadata } from "next";
import { Poppins, Inter, Archivo_Black } from "next/font/google";
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

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black-var",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    
    icon: "/cropped_circle_image_alrix.png",
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
      className={`${poppins.variable} ${inter.variable} ${archivoBlack.variable}`}
    >
      <body className="min-h-screen bg-bg-white font-poppins">
        {children}
      </body>
    </html>
  );
}
