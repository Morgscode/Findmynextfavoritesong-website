import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import { type SpotifyTrack, type TrackFeatures } from "@src/lib/spotify";

type SampleState = {
  tracks: Array<SpotifyTrack> | [];
  features: TrackFeatures | null;
  genres: Array<string> | [];
};

type SetTracksAction = { type: "SET_TRACKS"; payload: Array<SpotifyTrack> };
type SetFeaturesAction = { type: "SET_FEATURES"; payload: TrackFeatures };
type SetGenresAction = { type: "SET_GENRES"; payload: Array<string> };

type SampleAction = SetTracksAction | SetFeaturesAction | SetGenresAction;

const initialState: SampleState = {
  tracks: [],
  features: null,
  genres: [],
};

type SampleContextProps = {
  state: SampleState;
  dispatch: Dispatch<SampleAction>;
};

const SampleContext = createContext<SampleContextProps | undefined>(undefined);

function sampleReducer(state: SampleState, action: SampleAction) {
  switch (action.type) {
    case "SET_TRACKS":
      return {
        ...state,
        tracks: action.payload,
      };
    case "SET_FEATURES":
      return {
        ...state,
        features: action.payload,
      };
    case "SET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
}

type SampleProviderProps = {
  children: ReactNode;
};

export function SampleProvider({ children }: SampleProviderProps) {
  const [state, dispatch] = useReducer(sampleReducer, initialState);

  return (
    <SampleContext.Provider value={{ state, dispatch }}>
      {children}
    </SampleContext.Provider>
  );
}

export function useSampleContext() {
  const context = useContext(SampleContext);
  if (context === undefined) {
    throw new Error("useSampleContext must be used within an SampleProvider");
  }
  return context;
}
