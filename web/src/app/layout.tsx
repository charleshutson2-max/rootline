import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SampleBanner } from "@/components/SampleBanner";
import { PwaRegister } from "@/components/PwaRegister";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rootline — The Hutson–Norwood living archive",
    template: "%s · Rootline",
  },
  description:
    "Two families. One living archive. Private Hutson–Norwood family house with a public front door.",
  applicationName: "Rootline",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Rootline",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#3D2A5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceSerif.variable}`}>
      <body className="antialiased">
        <SampleBanner />
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
