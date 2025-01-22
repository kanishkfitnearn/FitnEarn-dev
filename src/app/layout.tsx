import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import ShowNavbar from "./Components/ShowNavbar";
import ShowFooter from "./Components/ShowFooter";
import Script from "next/script";
import Head from "next/head";
import SessionChecker from "./(checkValidUser)/sessionChecker";
import { GeneralProvider } from "../contexts/generalContext";
import { Toaster } from "@/components/ui/toaster";
import "flowbite/dist/flowbite.css";
import { StoreProvider } from "@/store/storeProvider";
const lato = Lato({ subsets: ["latin"], weight: "400" });
const { NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENTID } = process.env;
import Chatwoot from "./Components/chatWoot/Chatwoot";

import FireRoot from "./FireRoot";

export const metadata: Metadata = {
  title: "FitnEarn : Exercise, Earn, Enjoy",
  description: "Join FitnEarn: The ultimate fitness platform where you can exercise, earn rewards, and enjoy your fitness journey. Achieve your goals, stay motivated, and have fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <StoreProvider>
      <html lang="en">

        <Head>
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-55GM669Z');
            `,
            }}
          />
          {/* End Google Tag Manager */}
        </Head>
        <head>
          <meta name="google-site-verification" content="qR5jmily0878KthrXA2O1FtsBZ0YF75SykpoW1qGnTo" />
          <meta name="google-adsense-account" content="ca-pub-7766959809083010" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={lato.className}>
          {/* google analytics tags are below */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENTID}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENTID}');
            `}
          </Script>
          {/* gtag to monitor screen views */}
          <Script id="screen-view-tracking">
            {`
              gtag('event', 'screen_view', {
                'app_name': 'fitnearn dev website',
                'screen_name': 'Home'
             });
            `}
          </Script>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-55GM669Z"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          {/* Google Adsense */}
          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7766959809083010"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
          {/* Google Adsense */}
          <Chatwoot />
          <FireRoot />
          <SessionChecker />
          <ShowNavbar />
          <GeneralProvider>{children}</GeneralProvider>
          <Toaster />
          <ShowFooter />
        </body>
      </html>
    </StoreProvider>
  );
}
