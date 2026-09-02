import "./globals.css";
import type { Metadata } from "next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}