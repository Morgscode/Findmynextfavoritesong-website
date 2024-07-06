"use client";

import React, { useState, useEffect } from "react";
import { AuthProvider } from "@/src/context/AuthContext";
import { TrackProvider } from "@/src/context/TrackContext";
import { SampleProvider } from "@/src/context/SampleConext";
import AudioPlayer from "@/src/components/AudioPlayer";
import { getSessionToken } from "./actions";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [token, setToken] = useState<string>("");

  async function getToken() {
    const token = await getSessionToken();
    setToken(token ?? "");
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AuthProvider>
      <SampleProvider>
        <TrackProvider>
          <html lang="en">
            <body className="relative w-screen h-screen max-h-screen bg-[#191414]">
              <main className="bg-[#191414] h-full w-full max-w-full max-h-full flex flex-col items-stretch">
                <input
                  type="hidden"
                  name="_spotify_api_token"
                  value={token as unknown as string}
                />
                <div className="relative w-full h-full max-w-full max-h-full overflow-y-hidden ">
                  {children}
                  <ToastContainer
                    className="absolute max-w-[800px] w-full px-4 lg:px-8 text-sm rounded-lg sm:rounded-lg"
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    theme="light"
                    transition={Zoom}
                  />
                </div>
                <div className="relative w-full max-w-[800px] mx-auto">
                  <div className="m-2">
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
