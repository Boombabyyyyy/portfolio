import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Azfar Faheem Mustafa — Technical Lead & Full Stack Developer",
  description: "Portfolio of Azfar Faheem Mustafa. Technical Lead building scalable systems at the intersection of AI and modern web engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <div className="noise-overlay" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
