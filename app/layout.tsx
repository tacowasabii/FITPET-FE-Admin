import Providers from "@utils/Providers";
import "@styles/globals.css";
import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import Sidebar from "@components/Sidebar";

export const metadata: Metadata = {
  title: "스마트커버인슈어런스 관리자",
};

const pretendard = localFont({
  src: "../public/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className="min-w-[1920px] font-pretendard font-medium">
        <Providers>
          <div className="flex">
            <Sidebar />
            <div className="flex-grow">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
