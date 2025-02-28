import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";
import ClientProvider from "./clientProvider";
import dynamic from "next/dynamic";

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
  title: "Preclinical Contract Research for Drug Development",
  description: "ZEFIT is a contract research organization (CRO) focused on early-stage drug development. It uses zebrafish models to reduce risks and improve clinical outcomes.",
  keywords: " preclinical testing, preclinical contract research, biopharmaceutical services, biotech research company",
  icons: { icon: "/zefit.png", apple: "/zefit.png" },
  verification: {
    google: '5BqvjsTo5B9TZHzhKfNyLJHIr3v779_th9rvyEphT28',
    bing: 'A36ED9661F6899B09BE7549CED6FFC9C',
         },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.5.5/css/simple-line-icons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="preload" href="https://www.googletagmanager.com/gtag/js?id=G-FJBYH5L81Y" as="script"/>
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
