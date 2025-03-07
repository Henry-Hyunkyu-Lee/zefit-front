import { headers } from "next/headers";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";
import ClientProvider from "./clientProvider";
import dynamic from "next/dynamic";
import Script from "next/script"; // Import the Script component

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ["latin"], // 또는 preload: false
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

const FloatingButton = dynamic(() => import('../components/common/FloatingButton'), { ssr: false });
const Loading = dynamic(() => import('../components/common/LoadingSpinner'), { ssr: false });
const Footer = dynamic(() => import('../components/common/Footer'), { ssr: false });

export const metadata: Metadata = {
  
  icons: { icon: "/zefit.png", apple: "/zefit.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //Dynamically set the canonical Tag
  //created the middleware.ts file 
  const headersList = headers();
  const currentUrl = headersList.get("x-url") || headersList.get("referer") || "";
  
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="canonical" href={currentUrl} />
        <meta name="robots" content="index,follow" />
        <meta name="msvalidate.01" content="A36ED9661F6899B09BE7549CED6FFC9C" />
        <meta name="google-site-verification" content="5BqvjsTo5B9TZHzhKfNyLJHIr3v779_th9rvyEphT28" />
        <meta property="og:site_name" content="Zefit"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://ifvlnreaxggdzpirozcu.supabase.co/storage/v1/object/public/zefit_public/static_main_img1.jpg" />
        <meta property="og:url" content={currentUrl} />
        {/* Add Google Analytics script */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FJBYH5L81Y"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FJBYH5L81Y');
            gtag('config', 'AW-16895928340');
            gtag('event', 'conversion', {'send_to': 'AW-16895928340/EtNBCIGTmacaEJTQzfg-'});
          `}
        </Script>
            
      </head>
      <body className={notoSansKr.className}>
        <ClientProvider>
          <FloatingButton />
          <Loading />
          <main>
            {children}
          </main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
