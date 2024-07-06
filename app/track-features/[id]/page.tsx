"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAuthContext } from "@src/context/AuthContext";
import { useSampleContext } from "@src/context/SampleConext";
import { getTrackFeatures, type TrackFeatures } from "@src/lib/spotify";
import { usePathname } from "next/navigation";
import { TRACK_FEATURES_INFO } from "@src/lib/spotify";
import { accessToken } from "@/src/lib/helpers";
import { useRouter } from "next/router";

export default function TrackFeatures() {
  const { state: authState } = useAuthContext();
  const path = usePathname().split("/");
  const id = path[path.length - 1];
  const { state: sampleState, dispatch: sampleDispatch } = useSampleContext();
  const router = useRouter();

  async function fetchTrackFeatures() {
    if (!id) return;
    const trackId = typeof id === "string" ? id : id[0];
    if (sampleState.features && sampleState.features.id === trackId) return;
    const token = await accessToken(authState.token);
    if (!token) router.push("/");
    const features = await getTrackFeatures(token, trackId);
    sampleDispatch({
      type: "SET_FEATURES",
      payload: features as TrackFeatures,
    });
  }

  function updateFeatures(feature: string, value: number) {
    const updated = {
      ...(sampleState.features as TrackFeatures),
      [`${feature}`]: value,
    };
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
        const info = TRACK_FEATURES_INFO[key];
        return (
          <div className="flex flex-col gap-4 pr-4 mb-4" key={key}>
            <label className="text-lg" htmlFor={`slider-${key}`}>
              {info.name} - <span className="text-[#1DB954]">{value}</span>
            </label>
            <p className="text-sm text-gray-400">{info.description}</p>
            <input
              className="fmnfs-range-slider"
              id={`slider-${key}`}
              type="range"
              value={parseFloat(value as string)}
              key={`${index}-${key}`}
              onChange={(e) => updateFeatures(key, parseFloat(e.target.value))}
              min={info.min}
              max={info.max}
              step={info.step}
            />
          </div>
        );
      });
  }

  if (!sampleState.features) {
    return (
      <section className="flex flex-col items-center justify-center w-full h-full max-h-full">
        <p className="text-2xl font-bold text-gray-400 mb-8s">
          Fetching track analysis...
        </p>
      </section>
    );
  }

  return (
    <section className="relative flex justify-center w-full h-full max-h-full overflow-hidden">
      <div className="relative flex flex-col max-w-[800px] lg:w-[800px]">
        <header className="flex flex-col gap-1 p-4">
          <h1 className="text-2xl font-bold">Track features</h1>
          <p className="text-sm text-gray-400">
            These attributes are a measure of how Spotify classifies music. You
            can either keep these features as they are or modify them to your
            own taste and mood to influence the kind of recommendations you will
            recieve
          </p>
        </header>
        <div className="relative flex flex-col gap-4 px-4 overflow-y-scroll">
          {sliders(sampleState.features)}
        </div>
        {sampleState.features && (
          <Link
            className="rounded-full bg-[#1DB954] p-4 mx-4 mt-2 text-[#191414] text-center"
            href="/genres"
          >
            Select Genres
          </Link>
        )}
      </div>
    </section>
  );
}
