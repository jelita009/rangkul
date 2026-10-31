import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";
import 'maplibre-gl/dist/maplibre-gl.css';
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Rangkul - Ada ruang untuk setiap pertanyaan",
  description: "Platform edukasi dan skrinning HIV terpercaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} ${fraunces.variable} font-sans bg-white min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}