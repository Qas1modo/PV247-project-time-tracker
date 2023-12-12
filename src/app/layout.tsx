import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./Providers";
import { LoginStatus } from "../components/LoginStatus";
import { Suspense } from "react";
import Loading from "../components/Loading";
import Navigation from "@/components/Navigation";
import { getServerAuthSession } from "@/server/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Activity time tracker",
  description: "Track your activities",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body className={inter.className} style={{ height: "100vh" }}>
        <Providers>
          <Suspense fallback={<Loading />}>
            {session?.user ? (
              <>
                <header className="bg-black p-4 flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-white">
                    Activity Time Tracker
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex-grow"></div>
                    <LoginStatus />
                  </div>
                </header>
                <Navigation />
              </>
            ) : (
              // Render login component in the middle of the page when user is not signed in
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}
              >
                <h1 className="text-4xl font-bold pb-10">
                  Activity Time Tracker App
                </h1>
                <LoginStatus />
              </div>
            )}
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
