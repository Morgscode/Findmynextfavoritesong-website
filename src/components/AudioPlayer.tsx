"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTrackContext } from "@src/context/TrackContext";

export default function AudioPlayer() {
  const { state } = useTrackContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [paused, setPaused] = useState<boolean>(true);

  useEffect(() => {
    if (!state.track) return;
    audioRef.current?.play();
    setPaused(false);
  }, [state.track?.preview_url]);

  function toggleAudio() {
    if (paused) {
      audioRef.current?.play();
      setPaused(false);
    } else {
      audioRef.current?.pause();
      setPaused(true);
    }
  }

  function handleEnded() {
    if (!audioRef?.current) return;
    audioRef.current.currentTime = 0;
    setPaused(true);
  }

  const icon = () =>
    paused ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="#FFFFFF"
        width={25}
        height={25}
      >
        <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        fill="#FFFFFF"
        width={25}
        height={25}
      >
        <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
      </svg>
    );

  if (!state.track) return;

  return (
    <div className="w-full">
      <audio
        ref={audioRef}
        id={state.track.id}
        preload="auto"
        src={state.track.preview_url}
        onEnded={() => handleEnded()}
      />
      <div className="flex flex-row items-center gap-4 bg-[#083518] px-2 py-2 rounded-lg">
        <img
          className="rounded-lg"
          src={
            state.track.album.images[1]?.url ?? state.track.album.images[0]?.url
          }
          height={50}
          width={50}
        />
        <div className="">
          <p className="text-white">{state.track.name}</p>
          <p className="text-sm text-white">{state.track.artists[0].name}</p>
        </div>
        <button onClick={() => toggleAudio()} className="ml-auto mr-2">
          {icon()}
        </button>
      </div>
    </div>
  );
}
