const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=<<<CLIENT_ID>>>&redirect_uri=<<<REDIRECT_URI>>>&scope=<<<SCOPES>>>&response_type=token";
const AUTH_SCOPES =
  "user-read-email%20user-top-read%20user-library-read%20user-library-modify";
const BASE_URL = "https://api.spotify.com/v1";
const TRACKS_ENDPOINT = "/me/top/tracks";
const LIBRARY_ENDPOINT = "/me/tracks";
const TRACK_FEATURES_ENDPOINT = "/audio-features";
const RECOMMENDATIONS_ENDPOINT = "/recommendations";
const SEED_GENRES_ENDPOINT = "/recommendations/available-genre-seeds";

type SpotifyImage = {
  height: number;
  width: number;
  url: string;
};

type Artist = {
  "external urls": Record<string, string>;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Album = {
  "album type": string;
  artists: Array<Artist>;
  "available markets": Array<string>;
  "external urls": Record<string, string>;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  "release date": string;
  "release day precision": string;
  "total tracks": number;
  type: string;
  uri: string;
};

export type SpotifyTrack = {
  album: Album;
  artists: Array<Artist>;
  "available markets": Array<string>;
  "duration ms": number;
  "disc number": number;
  "external urls": Record<string, string>;
  "external ids": Record<string, string>;
  explicit: boolean;
  href: string;
  id: string;
  "is local": boolean;
  name: string;
  popularity: number;
  preview_url: string;
  "track number": number;
  type: string;
  uri: string;
};

export type TrackFeatures = {
  [key: string]: number | string;
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  url: string;
  valence: number;
};

type TrackFeatureInfo = {
  name: string;
  description: string;
  min: number;
  max: number;
  step: number;
};

type TrackFeaturesInfo = {
  [key: string]: TrackFeatureInfo;
};

type RecommendationsRequestParam = {
  limit: number;
  seed_tracks: string;
  seed_genres: string;
  target_acousticness: number;
  target_danceability: number;
  target_duration_ms: number;
  target_energy: number;
  target_instrumentalness: number;
  target_key: number;
  target_liveness: number;
  target_loudness: number;
  target_mode: number;
  target_speechiness: number;
  target_tempo: number;
  target_time_signature: number;
  target_valence: number;
};

type RecommendationSeedType = "track" | "artist" | "genre";

type RecommendationSeed = {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: RecommendationSeedType;
};

type RecommendationsResponse = {
  tracks: Array<SpotifyTrack>;
  seeds: Array<RecommendationSeed>;
};

export function getSpotifyAuthUrl(returnUrl:  string, client: string) {
  return AUTH_URL.replace(
    "<<<CLIENT_ID>>>", client
  )
    .replace("<<<REDIRECT_URI>>>", returnUrl)
    .replace("<<<SCOPES>>>", AUTH_SCOPES);
}

export async function getTopTracks(token: string, url: string | null = null) {
  try {
    const response = await fetch(url ?? `${BASE_URL}${TRACKS_ENDPOINT}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line
    console.log(response.status);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    const body = await response.json();
    return {
      tracks: body.items as Array<SpotifyTrack>,
      next: body.next as string,
    };
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return {
      tracks: [],
      next: null,
    };
  }
}

export async function getTrackFeatures(token: string, id: string) {
  try {
    const response = await fetch(
      `${BASE_URL}${TRACK_FEATURES_ENDPOINT}/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // eslint-disable-next-line
    console.log(response.status);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return (await response.json()) as TrackFeatures;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return null;
  }
}

export async function getSeedGenres(token: string) {
  try {
    const response = await fetch(`${BASE_URL}${SEED_GENRES_ENDPOINT}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line
    console.log(response.status);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    const body = await response.json();
    return body.genres as Array<string>;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return [];
  }
}

function getRecommendationsRequestParams(
  seed_tracks: Array<SpotifyTrack>,
  seed_genres: Array<string>,
  features: TrackFeatures,
  limit: number = 100,
): RecommendationsRequestParam {
  return {
    limit,
    seed_tracks: seed_tracks
      .filter((_, index) => index < 2)
      .map((t) => t.id)
      .join(","),
    seed_genres: [...seed_genres].join(","),
    target_acousticness: features.acousticness,
    target_danceability: features.danceability,
    target_duration_ms: features.duration_ms,
    target_energy: features.energy,
    target_instrumentalness: features.instrumentalness,
    target_key: features.key,
    target_liveness: features.liveness,
    target_loudness: features.loudness,
    target_mode: features.mode,
    target_speechiness: features.speechiness,
    target_tempo: features.tempo,
    target_time_signature: features.time_signature,
    target_valence: features.valence,
  };
}

export async function getRecommendations(
  token: string,
  seed_tracks: Array<SpotifyTrack>,
  seed_genres: Array<string>,
  features: TrackFeatures,
) {
  const params = getRecommendationsRequestParams(
    seed_tracks,
    seed_genres,
    features,
  ) as unknown as Record<string, string>;
  const query = new URLSearchParams(params);
  try {
    const response = await fetch(
      `${BASE_URL}${RECOMMENDATIONS_ENDPOINT}?${query.toString()}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // eslint-disable-next-line
    console.log(response.status);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    const body = await response.json();
    return {
      tracks: body.tracks as Array<SpotifyTrack>,
      seeds: body.seeds as Array<RecommendationSeed>,
    } as RecommendationsResponse;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return {
      tracks: [],
      seeds: [],
    };
  }
}

export async function addTrackToLibrary(
  token: string,
  tracks: SpotifyTrack | Array<SpotifyTrack>,
) {
  const trackIds = Array.isArray(tracks)
    ? tracks.map((t) => t.id)
    : [tracks.id];
  try {
    const response = await fetch(`${BASE_URL}${LIBRARY_ENDPOINT}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids: trackIds }),
    });
    // eslint-disable-next-line
    console.log(response.status);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return true;
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return false;
  }
}

export const TRACK_FEATURES_INFO: TrackFeaturesInfo = {
  acousticness: {
    name: "Acousticness",
    description:
      "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
    min: 0,
    max: 1,
    step: 0.01,
  },
  analysis_url: {
    name: "Analysis URL",
    description:
      "A URL to access the full audio analysis of this track. An access token is required to access this data.",
    min: 0,
    max: 0,
    step: 0,
  },
  danceability: {
    name: "Danceability",
    description:
      "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
    min: 0,
    max: 1,
    step: 0.01,
  },
  duration_ms: {
    name: "Durations (ms)",
    description: "The duration of the track in milliseconds.",
    min: 0,
    max: 1000000,
    step: 100,
  },
  energy: {
    name: "Energy",
    description:
      "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.",
    min: 0,
    max: 1,
    step: 0.01,
  },
  id: {
    name: "Id",
    description: "The ID of the track",
    min: 0,
    max: 0,
    step: 0,
  },
  instrumentalness: {
    name: "Instrumentalness",
    description:
      'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.',
    min: 0,
    max: 1,
    step: 0.01,
  },
  key: {
    name: "Key",
    description:
      "The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.",
    min: -1,
    max: 11,
    step: 1,
  },
  liveness: {
    name: "Liveness",
    description:
      "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.",
    min: 0,
    max: 1,
    step: 0.01,
  },
  loudness: {
    name: "Loudness",
    description:
      "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.",
    min: -60,
    max: 0,
    step: 0.1,
  },
  mode: {
    name: "Mode",
    description:
      "Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.",
    min: 0,
    max: 1,
    step: 0.1,
  },
  speechiness: {
    name: "Speechiness",
    description:
      "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.",
    min: 0,
    max: 1,
    step: 0.01,
  },
  tempo: {
    name: "Tempo",
    description:
      "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.",
    min: 0,
    max: 300,
    step: 1,
  },
  time_signature: {
    name: "Time signature",
    description:
      'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".',
    min: 3,
    max: 7,
    step: 1,
  },
  track_href: {
    name: "Track HREF",
    description:
      "A link to the Web API endpoint providing full details of the track.",
    min: 0,
    max: 0,
    step: 0,
  },
  type: {
    name: "type",
    description: "The object type.",
    min: 0,
    max: 0,
    step: 0,
  },
  uri: {
    name: "URI",
    description: "The Spotify URI for the track.",
    min: 0,
    max: 0,
    step: 0,
  },
  valence: {
    name: "Valence",
    description:
      "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).",
    min: 0,
    max: 1,
    step: 0.01,
  },
};
