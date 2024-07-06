"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSpotifyAuthUrl } from "@/src/lib/spotify";
import { useAuthContext } from "@/src/context/AuthContext";
import { usePathname } from "next/navigation";
import { setSessionToken } from "./actions";

export default function Home() {
  const { state: authState, dispatch: authDispatch } = useAuthContext();
  const [appUrl, setAppUrl] = useState<string>("/");
  const path = usePathname();

  useEffect(() => {
    setAppUrl(window.location.origin);
  }, [window?.location.origin]);

  useEffect(() => {
    if (path && !authState.isLoggedIn) {
      const { hash } = window.location;
      if (hash && hash.startsWith("#access_token")) {
        authDispatch({
          type: "SET_TOKEN",
          payload: new URLSearchParams(hash).get("#access_token") as string,
        });
        authDispatch({ type: "LOGIN" });
        setSessionToken(hash);
      }
    }
  }, [path]);

  const action = () => {
    if (!authState.isLoggedIn) {
      return (
        <Link
          href={getSpotifyAuthUrl(
            appUrl,
            process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? "CLIENT ID NOT SET",
          )}
          className="rounded-full bg-[#1DB954] p-4 text-[#191414]"
        >
          Authorise with Spotify
        </Link>
      );
    }
    return (
      <Link
        href="/spotify-tracks"
        className="rounded-full bg-[#1DB954] p-4 text-[#191414]"
      >
        Sample Music
      </Link>
    );
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <p className="p-8 mb-4 text-2xl text-center text-gray-400">
        Sample music from over 100 genres based on your current top tracks, your
        own personal taste and mood.
      </p>
      {action()}
    </section>
  );
}
