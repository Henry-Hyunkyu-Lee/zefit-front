import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    "600",
    "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansKr.className}>
        <Header />
        <main className="w-[100%] flex min-h-screen flex-col items-center justify-between mb-[102px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
