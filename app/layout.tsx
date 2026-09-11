import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://unitconverter.krishaiworks.com"
  ),

  title: "Unit Converter | Convert Units Online",

  description:
    "Convert units online quickly and easily with the free Unit Converter by KrishAIWorks. Convert length, weight, temperature, area, volume, speed, and other common units.",

  keywords: [
    "Unit Converter",
    "Unit Conversion",
    "Unit Converter Online",
    "Online Unit Converter",
    "Free Unit Converter",
    "Convert Units Online",
    "Length Converter",
    "Weight Converter",
    "Temperature Converter",
    "Area Converter",
    "Volume Converter",
    "Speed Converter",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.vercel.app",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  alternates: {
    canonical: "https://unitconverter.krishaiworks.com/",
  },

  openGraph: {
    title: "Unit Converter | KrishAIWorks",
    description:
      "Convert common units online quickly and easily with the free Unit Converter by KrishAIWorks.",
    url: "https://unitconverter.krishaiworks.com/",
    siteName: "KrishAIWorks",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Unit Converter | KrishAIWorks",
    description:
      "Convert length, weight, temperature, area, volume, speed, and more online.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id":
        "https://unitconverter.krishaiworks.com/#webapplication",
      name: "Unit Converter",
      url: "https://unitconverter.krishaiworks.com/",
      description:
        "Convert units online quickly and easily with the free Unit Converter by KrishAIWorks. Convert length, weight, temperature, area, volume, speed, and other common units.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://unitconverter.krishaiworks.com/#webpage",
      url: "https://unitconverter.krishaiworks.com/",
      name: "Unit Converter | Convert Units Online",
      description:
        "Convert units online quickly and easily with the free Unit Converter by KrishAIWorks. Convert length, weight, temperature, area, volume, speed, and other common units.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://unitconverter.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          id="unit-converter-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}