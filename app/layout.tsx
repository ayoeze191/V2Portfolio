import { Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import MotionProvider from "./Component/MotionProvider";

const DESCRIPTION =
  "Product engineer in Lagos with four years of shipping web and mobile products, with a bias for scalable, robust systems. Currently at Roov, and learning AI.";

// Inter with its optical-size axis: large sizes pick up the Display cut,
// which is what gives Framer-style headings their tight, crisp look.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
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
  // One theme only — matches --bg in globals.css.
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
