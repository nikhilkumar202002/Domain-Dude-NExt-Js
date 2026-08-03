import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Petit_Formal_Script } from "next/font/google";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./globals.css";
import favicon from "../assets/fav-icon.png";
import Stickybuttons from "./components/common/Stickybuttons";

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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1607732660968253');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1607732660968253&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4EK17VYTF5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-4EK17VYTF5');`}
        </Script>

         <Header />
        {children}
        <Footer />

        <Stickybuttons/>
      </body>
    </html>
  );
}
