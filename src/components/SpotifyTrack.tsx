"use client";

import React, { type PropsWithChildren } from "react";
import { type SpotifyTrack } from "@src/lib/spotify";

type SpotifyTrackProps = PropsWithChildren<
  SpotifyTrack & { isSelected: boolean }
>;

export default function SpotifyTrack({
  name,
  album,
  artists,
  explicit,
  children,
  isSelected,
}: SpotifyTrackProps) {
  const textStyles = isSelected
    ? "font-bold text-[#1DB954]"
    : "font-bold text-white";
  return (
    <div className="flex items-center max-w-full gap-4">
      <img
        className="relative rounded-md"
        src={album.images[1]?.url ?? album.images[0]?.url}
        height={50}
        width={50}
        alt={name}
      />
      <div className="flex flex-col gap-1 mr-auto">
        <p className={textStyles}>{name}</p>
        <div className="flex flex-row items-center">
          {explicit && (
            <div className="mr-2">
              <p className="text-sm font-bold text-gray-400">E</p>
            </div>
          )}
          <p className="text-xs text-gray-400">
            {artists[0].name} - {album.name}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
