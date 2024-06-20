"use client";

import { AuthProvider } from "../src/context/AuthContext";
import { TrackProvider } from "@/src/context/TrackContext";
import { SampleProvider } from "@/src/context/SampleConext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SampleProvider>
        <TrackProvider>
          <html lang="en">
            <body className="relative h-screen max-h-screen w-screen flex items-center">
              {children}
            </body>
          </html>
        </TrackProvider>
      </SampleProvider>
    </AuthProvider>
  );
}
