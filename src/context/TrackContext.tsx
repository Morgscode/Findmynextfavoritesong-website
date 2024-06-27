import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import { type SpotifyTrack } from "@src/lib/spotify";

type TrackState = {
  track: SpotifyTrack | null;
};

type SetTrackAction = { type: "SET_TRACK"; payload: SpotifyTrack };

type TrackAction = SetTrackAction;

const initialState: TrackState = {
  track: null,
};

type TrackContextProps = {
  state: TrackState;
  dispatch: Dispatch<TrackAction>;
};

const TrackContext = createContext<TrackContextProps | undefined>(undefined);

function trackReducer(state: TrackState, action: TrackAction) {
  switch (action.type) {
    case "SET_TRACK":
      return {
        ...state,
        track: action.payload,
      };
    default:
      return state;
  }
}

type TrackProviderProps = {
  children: ReactNode;
};

export function TrackProvider({ children }: TrackProviderProps) {
  const [state, dispatch] = useReducer(trackReducer, initialState);

  return (
    <TrackContext.Provider value={{ state, dispatch }}>
      {children}
    </TrackContext.Provider>
  );
}

export function useTrackContext() {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error("useTrackContext must be used within an TrackProvider");
  }
  return context;
}
