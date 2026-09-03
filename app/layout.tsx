import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import MotionProvider from "./Component/MotionProvider";

const DESCRIPTION =
  "Product engineer in Lagos with four years of shipping web and mobile products, with a bias for scalable, robust systems. Currently at Roov, and learning AI.";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fraunces is the whole personality of the design — a high-contrast variable
// serif. `opsz` lets the largest headings pick up the display cut automatically.
const fraunces = Fraunces({
  subsets: ["latin"],
  // NB: this must NOT be named --font-display. globals.css derives
  // --font-display from it, and a custom property that references itself is
  // invalid at computed-value time, which silently drops the font.
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ezekiel Olabode — Product Engineer",
  description: DESCRIPTION,
  metadataBase: new URL("https://eazyyyy-portfolio.vercel.app"),
  openGraph: {
    title: "Ezekiel Olabode — Product Engineer",
    description: DESCRIPTION,
    url: "https://eazyyyy-portfolio.vercel.app",
    siteName: "Ezekiel Olabode",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f7fc" },
    { media: "(prefers-color-scheme: dark)", color: "#070e1c" },
  ],
};

// Runs before the body paints, so the saved theme is already on <html> and
// there's no flash of the wrong palette. Kept as a raw string because it has
// to execute ahead of hydration — React can't help this early.
const THEME_INIT = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="dark"||t==="light"?t:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch(e){document.documentElement.dataset.theme="light"}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // The script below writes data-theme before React hydrates.
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
