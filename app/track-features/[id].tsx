"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "@src/context/AuthContext";
import { useSampleContext } from "@src/context/SampleConext";
import { getTrackFeatures, type TrackFeatures } from "@src/lib/spotify";

export default function TrackFeatures() {
  const { state } = useAuthContext();
  const { id } = useLocalSearchParams();
  const { state: sampleState, dispatch: sampleDispatch } = useSampleContext();

  async function fetchTrackFeatures() {
    if (!id) return;
    const trackId = typeof id === "string" ? id : id[0];
    if (sampleState.features && sampleState.features.id === trackId) return;
    const features = await getTrackFeatures(state.token!, trackId);
    sampleDispatch({
      type: "SET_FEATURES",
      payload: features as TrackFeatures,
    });
  }

  function updateFeatures(feature: string, value: number) {
    const updated = {
      ...(sampleState.features as TrackFeatures),
    };
    updated[feature] = value;
    sampleDispatch({ type: "SET_FEATURES", payload: updated });
  }

  useEffect(() => {
    fetchTrackFeatures();
  }, []);

  function sliders(features: TrackFeatures) {
    if (!features) return;
    return Object.entries(features)
      .filter(([, value]) => typeof value === "number")
      .map(([key, value], index) => {
        
        return (
        <div>
          <label>{key}</label>
          <input
            type="range"
            value={value}
            key={`${index}-${key}`}
            onChange={(e) => updateFeatures(key, parseInt(e.target.value))}
          />
        </div>
      ))};
  }

  if (!sampleState.features) {
    return (
      <section className="h-full max-h-full w-full flex flex-col items-center justify-center bg-[#191414]">
        <p className="text-2xl font-bold text-gray-400 mb-8s">
          Fetching track analysis...
        </p>
      </section>
    );
  }

  return (
    <section className="h-full relative max-h-full w-full flex justify-center bg-[#191414] overflow-hidden">
      <div className="max-w-[800px] lg:w-[800px] pt-4">
        <header className="mb-4 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Top features</h1>
          <p>
            This is how Spotify classifies it's songs and suggests new music to
            you. You can either keep these features as they are or modify them
            to your own taste and mood.
          </p>
        </header>
        <div className="h-calc-h-full-100">{sliders(sampleState.features)}</div>
        {sampleState.features && (
          <Link
            className="rounded-full bg-[#1DB954] p-4 m-4 text-[#191414] text-center absolute bottom-0 left-1/2 translate-x-[-50%]"
            href="/recommendations"
          >
            Set Sample Preferences
          </Link>
        )}
      </div>
    </section>
  );
}
