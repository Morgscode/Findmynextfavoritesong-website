"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSampleContext } from "@src/context/SampleConext";
import { useAuthContext } from "@/src/context/AuthContext";
import { getSeedGenres } from "@/src/lib/spotify";
import { accessToken } from "@src/lib/helpers";

export default function Genres() {
  const [genres, setGenres] = useState<Array<string>>([]);
  const { state: authState } = useAuthContext();
  const { state: sampleState, dispatch: sampleDispatch } = useSampleContext();
  const router = useRouter();

  async function fetchGenres() {
    const token = await accessToken(authState.token);
    if (!token) return router.push("/");
    const genres = await getSeedGenres(token);
    setGenres(genres);
  }

  useEffect(() => {
    if (!sampleState.tracks.length || !sampleState.features)
      router.push("/spotify-tracks");
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
  }

  if (!genres.length) {
    return (
      <section className="relative flex items-center justify-center w-full h-full max-h-full overflow-hidden">
        <p className="mb-8 text-2xl font-bold text-gray-400">
          Fetching Genres...
        </p>
      </section>
    );
  }

  return (
    <section className="relative flex justify-center w-full h-full max-h-full overflow-hidden">
      <div className="relative flex flex-col max-w-[800px] lg:w-[800px]">
        <header className="flex flex-col gap-1 p-4">
          <p className="text-2xl font-bold text-white">Available Seed Genres</p>
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
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleGenre(genre);
                  }}
                >
                  <p className="px-2 text-[#191414]">{genre}</p>
                </button>
              ))}
            </div>
          )}
        </header>
        <div className="relative flex flex-col gap-4 px-4 overflow-y-scroll">
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
            className="rounded-full bg-[#1DB954] p-4 mx-4 mt-2 text-[#191414] text-center"
            href="/recommendations"
          >
            Get Recommendations
          </Link>
        )}
      </div>
    </section>
  );
}
