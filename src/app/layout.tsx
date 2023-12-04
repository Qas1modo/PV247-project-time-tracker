import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./Providers";
import { LoginStatus } from "../components/LoginStatus";
import { Suspense } from "react";
import Loading from "../components/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Activity time tracker",
  description: "Track your activities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loading />}>
            <LoginStatus />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
