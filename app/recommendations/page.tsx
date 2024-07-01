"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SpotifyTrack from "@src/components/SpotifyTrack";
import { useAuthContext } from "@src/context/AuthContext";
import { useSampleContext } from "@src/context/SampleConext";
import { useTrackContext } from "@src/context/TrackContext";
import {
  getRecommendations,
  addTrackToLibrary,
  type SpotifyTrack as SpotifyTrackType,
} from "@src/lib/spotify";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<
    Array<SpotifyTrackType>
  >([]);
  const { state: authState } = useAuthContext();
  const { state: trackState, dispatch: trackDispatch } = useTrackContext();
  const { state: sampleState } = useSampleContext();

  async function fetchRecommendations() {
    if (!authState.token || !sampleState.features) return;
    const { tracks } = await getRecommendations(
      authState.token,
      sampleState.tracks,
      sampleState.genres,
      sampleState.features,
    );
    setRecommendations(tracks);
  }

  async function likeTrack(track: SpotifyTrackType) {
    if (!authState.token) return;
    await addTrackToLibrary(authState.token, track);
    toast.success(`Added ${track.name} to Liked Songs`);
  }

  const isSelectedTrack = (track: SpotifyTrackType) =>
    trackState.track && trackState.track.id === track.id;

  const iconColor = (track: SpotifyTrackType) =>
    isSelectedTrack(track) ? "#1DB954" : "#FFFFFF";

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (recommendations.length === 0) {
    return (
      <section className="relative flex items-center justify-center w-full h-full max-h-full overflow-hidden">
        <p className="mb-8 text-2xl text-gray-400 text-bold">
          Finding music to sample...
        </p>
      </section>
    );
  }

  return (
    <section className="relative flex justify-center w-full h-full max-h-full overflow-hidden">
      <div className="relative flex flex-col max-w-[800px] lg:w-[800px]">
        <header className="flex flex-col gap-1 p-4">
          <p className="text-2xl font-bold text-white">Recommendations</p>
        </header>
        <div className="flex flex-col gap-2 px-4 overflow-y-scroll">
          {recommendations.map((track) => (
            <div
              key={track.id}
              onClick={() =>
                track.preview_url &&
                trackDispatch({ type: "SET_TRACK", payload: track })
              }
            >
              <SpotifyTrack
                isSelected={
                  (trackState.track && trackState.track.id === track.id) ||
                  false
                }
                {...track}
              >
                <div className="flex flex-row self-stretch gap-1">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      likeTrack(track);
                    }}
                    className="flex items-center justify-center p-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="20"
                      height="20"
                      fill="#ffffff"
                    >
                      <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                    </svg>
                  </button>
                  {track.preview_url && (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        trackDispatch({ type: "SET_TRACK", payload: track });
                      }}
                      className="flex items-center justify-center p-2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="20"
                        height="20"
                        fill={iconColor(track)}
                      >
                        <path d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80V384 336 288C0 146.6 114.6 32 256 32s256 114.6 256 256v48 48 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z" />
                      </svg>
                    </button>
                  )}
                </div>
              </SpotifyTrack>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
