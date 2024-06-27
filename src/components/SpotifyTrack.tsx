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
    <div className="flex items-center gap-4">
      <img
        className="relative rounded-md"
        src={album.images[1]?.url ?? album.images[0]?.url}
        height={64}
        width={64}
        alt={name}
      />
      <div className="flex flex-col gap-1 mr-auto">
        <p className={textStyles}>{name}</p>
        <div className="flex flex-row items-center">
          {explicit && (
            <div className="mr-2">
              <p className="text-[#191414] text-gray-400 text-sm font-bold">
                E
              </p>
            </div>
          )}
          <p className="text-gray-400 text-xs">
            {artists[0].name} - {album.name}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
