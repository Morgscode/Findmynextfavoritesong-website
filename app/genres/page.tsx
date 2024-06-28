"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSampleContext } from "@src/context/SampleConext";
import { useAuthContext } from "@/src/context/AuthContext";
import { getSeedGenres } from "@/src/lib/spotify";

export default function Genres() {
  const [genres, setGenres] = useState<Array<string>>([]);
  const { state: authState } = useAuthContext();
  const { state: sampleState, dispatch: sampleDispatch } = useSampleContext();

  async function fetchGenres() {
    if (!authState.token) return;
    const genres = await getSeedGenres(authState.token);
    setGenres(genres);
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  const genreStyles = (genre: string) =>
    sampleState.genres.includes(genre)
      ? "p-2 rounded-full border-2 border-[#1DB954] bg-[#1DB954]"
      : "p-2 rounded-full border-2 border-solid border-gray-400";

  const textStyles = (genre: string) =>
    sampleState.genres.includes(genre)
      ? "px-2 text-[#191414]"
      : "px-2 text-gray-400";

  const genreDisabled = (genre: string) =>
    sampleState.tracks.length + sampleState.genres.length === 5 &&
    sampleState.genres.includes(genre) === false;

  const genresSelected = () => sampleState.genres?.length > 0;

  function toggleGenre(genre: string) {
    sampleState.genres.includes(genre)
      ? sampleDispatch({
          type: "SET_GENRES",
          payload: sampleState.genres.filter((g) => g !== genre),
        })
      : sampleDispatch({
          type: "SET_GENRES",
          payload: [...sampleState.genres, genre],
        });
    // stuff and things
  }

  if (!genres.length) {
    return (
      <section className="h-full relative max-h-full w-full flex justify-center items-center overflow-hidden">
        <p className="text-2xl text-gray-400 font-bold mb-8">
          Fetching Genres...
        </p>
      </section>
    );
  }

  return (
    <section className="h-full relative max-h-full w-full flex justify-center overflow-hidden">
      <div className="relative flex flex-col max-w-[800px] lg:w-[800px]">
        <header className="p-4 flex flex-col gap-2 p-4">
          <p className="text-white text-2xl font-bold">Available Seed Genres</p>
          <p className="text-gray-400">
            Select up to {5 - sampleState.tracks.length} to tell Spotify what
            genres you want to sample music from.
          </p>
          {genresSelected() && (
            <div className="flex flex-row flex-wrap gap-2 mt-1">
              {sampleState.genres.map((genre, index) => (
                <button
                  key={`selected-${genre}-${index}`}
                  className="p-2 rounded-full bg-[#1DB954]"
                  onClick={() => toggleGenre(genre)}
                >
                  <p className="px-2 text-[#191414]">{genre}</p>
                </button>
              ))}
            </div>
          )}
        </header>
        <div className="overflow-y-scroll relative flex flex-col gap-4 p-4">
          <div className="flex flex-row flex-wrap gap-2">
            {genres.map((genre, index) => (
              <button
                className={genreStyles(genre)}
                key={`${genre}-${index}`}
                onClick={() => toggleGenre(genre)}
                disabled={genreDisabled(genre)}
              >
                <p className={textStyles(genre)}>{genre}</p>
              </button>
            ))}
          </div>
        </div>
        {genresSelected() && (
          <Link
            className="rounded-full bg-[#1DB954] p-4 mx-4 my-2 text-[#191414] text-center"
            href="/recommendations"
          >
            Get Recommendations
          </Link>
        )}
      </div>
    </section>
  );
}
