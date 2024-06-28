"use client";

import { AuthProvider } from "@/src/context/AuthContext";
import { TrackProvider } from "@/src/context/TrackContext";
import { SampleProvider } from "@/src/context/SampleConext";
import AudioPlayer from "@/src/components/AudioPlayer";
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
            <body className="relative h-screen max-h-screen w-screen">
              <main className="bg-[#191414] h-full">
                <div className="relative h-calc-h-full-75">{children}</div>
                <div className="max-w-[800px] mx-auto">
                  <div className="mx-2">
                    <AudioPlayer />
                  </div>
                </div>
              </main>
            </body>
            <script
              src="https://kit.fontawesome.com/0ab8f87329.js"
              crossOrigin="anonymous"
              async
            ></script>
          </html>
        </TrackProvider>
      </SampleProvider>
    </AuthProvider>
  );
}
