import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import MotionProvider from "./Component/MotionProvider";

const DESCRIPTION =
  "Fullstack and cloud-native engineer in Lagos. I build products end to end: React and React Native on the surface, Node.js services underneath, and the containers and pipelines that keep them running.";

const TITLE = "Ezekiel Olabode — Fullstack & Cloud-Native Engineer";

// Inter with its optical-size axis: large sizes pick up the Display cut,
// which is what gives Framer-style headings their tight, crisp look.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
});

// Condensed heavy face for the giant name and section titles.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://eazyyyy-portfolio.vercel.app"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://eazyyyy-portfolio.vercel.app",
    siteName: "Ezekiel Olabode",
    type: "website",
  },
};

export const viewport: Viewport = {
  // One theme only — matches --bg in globals.css.
  themeColor: "#050608",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${jetbrainsMono.variable}`}
      // The boot script below adds "booted" before hydration.
      suppressHydrationWarning
    >
      <head>
        {/* Skip the boot sequence for repeat visits in this session and for
            anyone who prefers reduced motion. Runs before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('booted')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('booted')}catch(e){document.documentElement.classList.add('booted')}",
          }}
        />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
