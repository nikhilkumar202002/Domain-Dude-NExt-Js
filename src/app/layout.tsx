import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Petit_Formal_Script } from "next/font/google";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./globals.css";
import favicon from "../assets/fav-icon.png";

const neueMontreal = localFont({
  src: [
    { path: '../assets/Fonts/NeueMontreal-Light.otf', weight: '300', style: 'normal' },
    { path: '../assets/Fonts/NeueMontreal-Regular.otf', weight: '400', style: 'normal' },
    { path: '../assets/Fonts/NeueMontreal-Medium.otf', weight: '500', style: 'normal' },
    { path: '../assets/Fonts/NeueMontreal-Bold.otf', weight: '700', style: 'normal' },
    { path: '../assets/Fonts/NeueMontreal-Italic.otf', weight: '400', style: 'italic' },
    { path: '../assets/Fonts/NeueMontreal-BoldItalic.otf', weight: '700', style: 'italic' },
  ],
  variable: '--font-neue',
  display: 'swap',
});

// ✅ Inter (Google)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const petitFormal = Petit_Formal_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-petit",   // add this line
});

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Kochi | Domain Dude",
  description: "Boost your brand’s online presence with Domain Dude — a creative digital agency specializing in website development, result-driven digital marketing, and high-impact video production. We help businesses grow and scale fast.",
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${neueMontreal.variable} ${inter.variable} ${petitFormal.variable}`}>
      <body>
         <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
