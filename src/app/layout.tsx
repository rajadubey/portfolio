import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getProfile } from "@/lib/payload";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Add font-display: swap for performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Add font-display: swap for performance
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  
  // Fallback values if CMS data is not available
  const defaultTitle = "Raja Dubey | Senior Software Engineer - React & Cloud Architecture";
  const defaultDescription = "Portfolio of Raja Dubey, a Senior Software Engineer specializing in React, Next.js, Spring Boot, and cloud architecture. Building scalable frontend systems and enterprise applications.";
  const defaultKeywords = ["Software Engineer", "React", "Next.js", "Spring Boot", "Elasticsearch", "Frontend Architecture", "Gurgaon"];
  
  const title = profile?.seoTitle || defaultTitle;
  const description = profile?.seoDescription || defaultDescription;
  const keywords = profile?.seoKeywords?.map((k: any) => k.keyword).filter(Boolean) || defaultKeywords;
  const name = profile?.name || "Raja Dubey";
  
  return {
    metadataBase: new URL('https://www.rajadubey.in'),
    title: {
      default: title,
      template: '%s | Raja Dubey',
    },
    description,
    keywords,
    authors: [{ name, url: 'https://rajadubey.in' }],
    creator: name,
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: 'https://rajadubey.in',
      title,
      description,
      siteName: `${name} Portfolio`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@rajadubey0',
    },
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '12px',
            textAlign: 'center',
            zIndex: 9999,
            fontSize: '14px'
          }}>
            This site works best with JavaScript enabled. Some interactive features may not work without it.
          </div>
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
