"use client";

import React from "react";
import { AuthProvider } from "@/src/context/AuthContext";
import { TrackProvider } from "@/src/context/TrackContext";
import { SampleProvider } from "@/src/context/SampleConext";
import AudioPlayer from "@/src/components/AudioPlayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
            <body className="relative w-screen h-screen max-h-screen bg-[#191414]">
              <main className="bg-[#191414] h-full flex flex-col items-stretch">
                <div className="h-full max-h-full overflow-y-hidden ">
                  {children}
                </div>
                <div className="w-full max-w-[800px] mx-auto">
                  <div className="mx-4 my-2">
                    <AudioPlayer />
                  </div>
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    theme="dark"
                  />
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
