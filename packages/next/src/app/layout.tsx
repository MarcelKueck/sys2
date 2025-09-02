import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Workspace Matching Platform",
    template: "%s | Workspace Matching Platform"
  },
  description: "Connect innovative companies with perfect workspace partners. AI-powered matching for optimal collaboration between space providers and growing businesses.",
  keywords: ["workspace", "office space", "coworking", "business collaboration", "collaboration", "Munich", "startup space"],
  authors: [{ name: "Workspace Matching Platform" }],
  creator: "Workspace Matching Platform",
  publisher: "Workspace Matching Platform",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Workspace Matching Platform',
    title: 'Workspace Matching Platform',
    description: 'Connect innovative companies with perfect workspace partners',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Workspace Matching Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workspace Matching Platform',
    description: 'Connect innovative companies with perfect workspace partners',
    images: ['/og-image.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">{children}</div>
      </body>
    </html>
  );
}
