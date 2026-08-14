import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./Component/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ezekiel Olabode — Software Engineer",
  description:
    "Software engineer building web and mobile products. Currently at Roov Africa, a property tech company, working in React Native and Node.js.",
  metadataBase: new URL("https://eazyyyy-portfolio.vercel.app"),
  openGraph: {
    title: "Ezekiel Olabode — Software Engineer",
    description:
      "Software engineer building web and mobile products. Currently at Roov Africa, a property tech company, working in React Native and Node.js.",
    url: "https://eazyyyy-portfolio.vercel.app",
    siteName: "Ezekiel Olabode",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
