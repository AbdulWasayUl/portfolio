import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/components/I18nProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdul Wasay — Software Engineer",
  description:
    "Portfolio of Abdul Wasay — a full-spectrum software engineer working across system design, full-stack products, AI, automation, and cloud infrastructure.",
  keywords: [
    "Abdul Wasay",
    "Software Engineer",
    "System Design",
    "Backend Developer",
    "Full Stack",
    "AI Engineer",
    "DevOps",
    "Portfolio",
    "Go",
    "Python",
    "Next.js",
  ],
  authors: [{ name: "Abdul Wasay" }],
  creator: "Abdul Wasay",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Abdul Wasay — Software Engineer",
    description:
      "Designing and shipping products end to end across systems, interfaces, AI, automation, and cloud infrastructure.",
    siteName: "Abdul Wasay Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Wasay — Software Engineer",
    description:
      "Designing and shipping products end to end across systems, interfaces, AI, automation, and cloud infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050507" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(t)}else if(window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
