import type { Metadata } from "next";
import { Montserrat, Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-heading",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-secondary",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skyline Electronetworks | Power. Infrastructure. Utilities.",
  description:
    "Premium industrial electrical contracting company specializing in high-voltage and low-voltage power systems, substation erection, smart lighting, and turnkey electrical infrastructure projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} ${openSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-body">
        <QuoteModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuoteModal />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
