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
    console.log("fetching next");
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
    console.log(authState);
    getTracks();
  }, []);

  if (tracks.length === 0) {
    return (
      <section className="h-full max-h-full w-full flex flex-col items-center justify-center bg-[#191414]">
        <p className="text-2xl font-bold text-gray-400 mb-8s">
          Fetching top tracks...
        </p>
      </section>
    );
  }

  return (
    <section className="h-full relative max-h-full w-full flex justify-center bg-[#191414] overflow-hidden">
      <div className="max-w-[800px] lg:w-[800px] pt-4">
        <header className="mb-4 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Top tracks</h1>
          <p>Select up to 3 to sample similar music from.</p>
          {tracks && <p>{tracks.length} songs</p>}
        </header>
        <div
          ref={tracksRef}
          className="h-calc-h-full-100 lg:h-calc-h-full-150 overflow-y-scroll max-w-[800px] flex flex-col gap-2"
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
                  <div
                    className="p-2 flex items-center justify-center"
                    onClick={() => toggleTrack(track)}
                  >
                    select
                  </div>
                  <div className="p-2" onClick={() => sampleRedirect(track)}>
                    analyse
                  </div>
                </div>
              </SpotifyTrack>
            </div>
          ))}
        </div>
        {tracksSelected() && (
          <Link
            className="rounded-full bg-[#1DB954] p-4 m-4 text-[#191414] text-center absolute bottom-0 left-1/2 translate-x-[-50%]"
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
