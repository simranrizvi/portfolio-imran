import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { getPersonalInfo } from "@/lib/config";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";
import { AIChatbotLauncher } from "@/components/ui/ai-chatbot-launcher";
import { ThemeSwitch } from "@/components/theme-switch";
import QueryProvider from "@/provider/QueryProvider";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import Script from "next/script";
import { BackgroundBeams } from "@/components/ui/background-beams";

const inter = Inter({ subsets: ["latin"] });

const personalInfo = getPersonalInfo();
const siteUrl = personalInfo.websiteUrl.replace(/\/$/, "");
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const seoDescription =
  personalInfo.seoDescription ||
  "Syed Muhammad Imran is a full stack developer experienced in enterprise applications, secure REST APIs, React, Next.js, Node.js, FastAPI, and databases.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personalInfo.name} | ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: seoDescription,
  applicationName: `${personalInfo.name} Portfolio`,
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  icons: {
    icon: "/imran-logo.svg",
    shortcut: "/imran-logo.svg",
    apple: "/imran-logo.svg",
  },
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: seoDescription,
    url: siteUrl,
    siteName: personalInfo.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: seoDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#0b0b0f",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-config" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                });
              `}
            </Script>
          </>
        ) : null}

      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundBeams />
          <Navbar />
          <div className="fixed z-40 bottom-22 right-6">
            <ThemeSwitch />
          </div>
          <ScrollIndicator />
          <main>
            <QueryProvider>{children}</QueryProvider>
          </main>
          <PageViewTracker />
          <AIChatbotLauncher />
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
