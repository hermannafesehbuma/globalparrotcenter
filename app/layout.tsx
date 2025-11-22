import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/contexts/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://globalparrotcenter.com"),
  title: {
    default: "Global Parrot Center - Premium Parrots, Care Guides & Community",
    template: "%s | Global Parrot Center",
  },
  description: "Discover healthy, happy parrots for sale. Expert care guides, community support, and premium parrot accessories. Shop African Greys, Macaws, Budgies, Conures, Cockatoos and more. Join our passionate parrot community today!",
  keywords: [
    "parrots for sale",
    "buy parrots online",
    "African Grey parrot",
    "Macaw parrot",
    "Budgie parakeet",
    "Conure parrot",
    "parrot care guide",
    "parrot training",
    "parrot community",
    "parrot accessories",
    "parrot cage",
    "parrot food",
    "parrot toys",
    "parrot health",
    "exotic birds",
    "pet parrots",
  ],
  authors: [{ name: "Global Parrot Center" }],
  creator: "Global Parrot Center",
  publisher: "Global Parrot Center",
  openGraph: {
    title: "Global Parrot Center - Premium Parrots, Care Guides & Community",
    description: "Discover healthy, happy parrots for sale. Expert care guides, community support, and premium parrot accessories. Shop African Greys, Macaws, Budgies, Conures, Cockatoos and more.",
    url: "https://globalparrotcenter.com",
    siteName: "Global Parrot Center",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "Global Parrot Center - Premium Parrot Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Parrot Center - Premium Parrots & Care Guides",
    description: "Discover healthy, happy parrots for sale. Expert care guides, community support, and premium accessories.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/logo.png", type: "image/png", sizes: "180x180" },
    ],
    shortcut: "/logo.png",
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
    // Add verification codes if you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

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
        <CartProvider>
          <Navigation />
          {children}
          <Footer />
        </CartProvider>
        
        {/* Tawk.to Chat Widget */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/692196efca4f9d19612f7d02/1jaljb6bg';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
