"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { getSpotifyAuthUrl } from "@/src/lib/spotify";
import { useAuthContext } from "@/src/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Home() {
  const { state: authState, dispatch: authDispatch } = useAuthContext();
  const path = usePathname();

  useEffect(() => {
    if (path && !authState.isLoggedIn) {
      const { hash } = window.location;
      if (hash && hash.startsWith("#access_token")) {
        authDispatch({ type: "SET_TOKEN", payload: hash });
        authDispatch({ type: "LOGIN" });
      }
    }
  }, [path]);

  const action = () => {
    if (!authState.isLoggedIn) {
      return (
        <Link
          href={getSpotifyAuthUrl(
            window.location.origin,
            process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? "CLIENT ID NOT SET"
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
    <section className="h-full w-full flex flex-col items-center justify-center bg-[#191414]">
      <p className="text-gray-400 text-center text-2xl p-8 mb-4">
        Sample music from over 100 genres based on your current top tracks, your
        own personal taste and mood.
      </p>
      {action()}
    </section>
  );
}
