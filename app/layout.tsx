import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech Level Engineering - Commercial Kitchen Equipment & Engineering Solutions",
  description: "Reliable commercial fryers, pizza ovens, cold rooms and professional kitchen equipment — backed by expert installation, repair and maintenance services in Pakistan.",
  keywords: ["commercial kitchen equipment Pakistan", "commercial fryers Pakistan", "commercial pizza ovens Pakistan", "cold rooms Pakistan", "commercial kitchen equipment repair", "commercial kitchen equipment supplier Pakistan"],
  authors: [{ name: "Tech Level Engineering" }],
  creator: "Tech Level Engineering",
  publisher: "Tech Level Engineering",
  metadataBase: new URL("https://www.techlevelengineering.store"),
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.techlevelengineering.store",
    title: "Tech Level Engineering - Commercial Kitchen Equipment & Engineering Solutions",
    description: "Reliable commercial fryers, pizza ovens, cold rooms and professional kitchen equipment — backed by expert installation, repair and maintenance services in Pakistan.",
    siteName: "Tech Level Engineering",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Level Engineering - Commercial Kitchen Equipment & Engineering Solutions",
    description: "Reliable commercial fryers, pizza ovens, cold rooms and professional kitchen equipment — backed by expert installation, repair and maintenance services in Pakistan.",
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
