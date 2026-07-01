import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/global/Navigation";
import Footer from "./components/global/Footer";
import ConfigVarSetter from "./components/global/ConfigVarSetter";
import { FilterProvider } from "./lib/filters/FilterContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VictoryCloudWorks",
  description: "A portfolio showcasing the creative works of Nic, including comics, art, writing, and commissions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FilterProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <ConfigVarSetter />
          <Navigation />
          {children}
          <Footer />
          <SpeedInsights />
        </body>
      </html>
    </FilterProvider>
  );
}
