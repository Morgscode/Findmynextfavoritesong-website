"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTrackContext } from "@/src/context/TrackContext";
import { useSampleContext } from "@/src/context/SampleConext";
import {
  getTopTracks,
  type SpotifyTrack as SpotifyTrackType,
} from "@/src/lib/spotify";
import SpotifyTrack from "@/src/components/SpotifyTrack";

export default function SpotifyTracks() {
  const tracksRef = useRef(null);
  const { state: authState } = useAuthContext();
  const { state: trackState, dispatch: trackDispatch } = useTrackContext();
  const { state: sampleState, dispatch: sampleDispatch } = useSampleContext();
  const [tracks, setTracks] = useState<Array<SpotifyTrackType>>([]);
  const [next, setNext] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function getTracks(url: string | null = null) {
    if (!authState.token) return;
    setLoading(true);
    const { tracks, next } = await getTopTracks(authState.token, url);
    setTracks((topTracks) => [...topTracks, ...tracks]);
    setNext(next);
    setLoading(false);
  }

  async function handleListEndReached() {
    await getTracks(next);
  }

  function toggleTrack(track: SpotifyTrackType) {
    sampleState.tracks.find((t) => t.id === track.id)
      ? sampleDispatch({
          type: "SET_TRACKS",
          payload: sampleState.tracks.filter((t) => t.id !== track.id),
        })
      : sampleDispatch({
          type: "SET_TRACKS",
          payload: [...sampleState.tracks, track],
        });
  }

  const isDisabled = (track: SpotifyTrackType) =>
    sampleState.tracks.length === 3 &&
    !sampleState.tracks.find((t) => t.id === track.id);

  function handleScroll() {
    if (!tracksRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = tracksRef.current;
    const bottomDistance = scrollHeight - scrollTop - clientHeight;
    return bottomDistance <= 200;
  }

  const tracksSelected = () => sampleState.tracks.length > 0;

  const isSelectedTrack = (track: SpotifyTrackType) =>
    sampleState.tracks.find((t) => t.id === track.id);

  const iconColor = (track: SpotifyTrackType) =>
    isSelectedTrack(track) ? "#1DB954" : "#FFFFFF";

  function sampleRedirect(track: SpotifyTrackType) {
    if (
      !trackState.track ||
      (trackState.track && trackState.track.id !== track.id)
    ) {
      trackDispatch({ type: "SET_TRACK", payload: track });
    }
    if (!isSelectedTrack(track)) {
      sampleDispatch({
        type: "SET_TRACKS",
        payload: [...sampleState.tracks, track],
      });
    }
    router.replace(`/track-features/${track.id}`);
  }

  useEffect(() => {
    getTracks();
  }, []);

  if (tracks.length === 0) {
    return (
      <section className="h-full max-h-full w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-gray-400 mb-8s">
          Fetching top tracks...
        </p>
      </section>
    );
  }

  return (
    <section className="h-full relative max-h-full w-full flex justify-center overflow-hidden">
      <div className="max-w-[800px] lg:w-[800px] pt-4">
        <header className="p-4 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Top tracks</h1>
          <p>Select up to 3 to sample similar music from.</p>
          {tracks && <p>{tracks.length} songs</p>}
        </header>
        <div
          ref={tracksRef}
          className="h-calc-h-full-100  overflow-y-scroll flex flex-col gap-2 p-4"
          onScroll={() => {
            handleScroll() && !loading && handleListEndReached();
          }}
        >
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() =>
                trackDispatch({ type: "SET_TRACK", payload: track })
              }
            >
              <SpotifyTrack
                key={track.id}
                isSelected={
                  (trackState.track && trackState.track.id === track.id) ||
                  false
                }
                {...track}
              >
                <div className="flex flex-row gap-1">
                  <button
                    className="p-2 flex items-center justify-center cursor-pointer"
                    onClick={() => toggleTrack(track)}
                    disabled={isDisabled(track)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="20"
                      height="20"
                      fill={iconColor(track)}
                    >
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 flex items-center justify-center cursor-pointer"
                    onClick={() => sampleRedirect(track)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="20"
                      height="20"
                      fill={iconColor(track)}
                    >
                      <path d="M48 256C48 141.1 141.1 48 256 48c63.1 0 119.6 28.1 157.8 72.5c8.6 10.1 23.8 11.2 33.8 2.6s11.2-23.8 2.6-33.8C403.3 34.6 333.7 0 256 0C114.6 0 0 114.6 0 256v40c0 13.3 10.7 24 24 24s24-10.7 24-24V256zm458.5-52.9c-2.7-13-15.5-21.3-28.4-18.5s-21.3 15.5-18.5 28.4c2.9 13.9 4.5 28.3 4.5 43.1v40c0 13.3 10.7 24 24 24s24-10.7 24-24V256c0-18.1-1.9-35.8-5.5-52.9zM256 80c-19 0-37.4 3-54.5 8.6c-15.2 5-18.7 23.7-8.3 35.9c7.1 8.3 18.8 10.8 29.4 7.9c10.6-2.9 21.8-4.4 33.4-4.4c70.7 0 128 57.3 128 128v24.9c0 25.2-1.5 50.3-4.4 75.3c-1.7 14.6 9.4 27.8 24.2 27.8c11.8 0 21.9-8.6 23.3-20.3c3.3-27.4 5-55 5-82.7V256c0-97.2-78.8-176-176-176zM150.7 148.7c-9.1-10.6-25.3-11.4-33.9-.4C93.7 178 80 215.4 80 256v24.9c0 24.2-2.6 48.4-7.8 71.9C68.8 368.4 80.1 384 96.1 384c10.5 0 19.9-7 22.2-17.3c6.4-28.1 9.7-56.8 9.7-85.8V256c0-27.2 8.5-52.4 22.9-73.1c7.2-10.4 8-24.6-.2-34.2zM256 160c-53 0-96 43-96 96v24.9c0 35.9-4.6 71.5-13.8 106.1c-3.8 14.3 6.7 29 21.5 29c9.5 0 17.9-6.2 20.4-15.4c10.5-39 15.9-79.2 15.9-119.7V256c0-28.7 23.3-52 52-52s52 23.3 52 52v24.9c0 36.3-3.5 72.4-10.4 107.9c-2.7 13.9 7.7 27.2 21.8 27.2c10.2 0 19-7 21-17c7.7-38.8 11.6-78.3 11.6-118.1V256c0-53-43-96-96-96zm24 96c0-13.3-10.7-24-24-24s-24 10.7-24 24v24.9c0 59.9-11 119.3-32.5 175.2l-5.9 15.3c-4.8 12.4 1.4 26.3 13.8 31s26.3-1.4 31-13.8l5.9-15.3C267.9 411.9 280 346.7 280 280.9V256z" />
                    </svg>
                  </button>
                </div>
              </SpotifyTrack>
            </div>
          ))}
        </div>
        {tracksSelected() && (
          <Link
            className="rounded-full bg-[#1DB954] p-4 mb-8 text-[#191414] text-center absolute bottom-0 left-1/2 translate-x-[-50%]"
            href={`track-features/${
              (trackState.track && trackState.track.id) ||
              sampleState.tracks[0].id
            }`}
          >
            Set Sample Preferences
          </Link>
        )}
      </div>
    </section>
  );
}
