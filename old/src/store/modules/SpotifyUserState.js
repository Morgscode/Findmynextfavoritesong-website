const state = {
  SpotifyUserState: {
    token: null,
    artistID: null,
    trackID: null,
    trackParams: {
      acousticness: null,
      danceability: null,
      energy: null,
      instrumentalness: null,
      key: null,
      liveness: null,
      loudness: null,
      mode: null,
      speechiness: null,
      tempo: null,
      valence: null,
    },
    userGenreOptions: [],
    currentSampleTrackID: null,
  },
};

const getters = {
  getSpotifyAccessKey: (state) => {
    return state.SpotifyUserState.token;
  },
  getSeedTrackID: (state) => {
    return state.SpotifyUserState.trackID;
  },
  getSeedArtistID: (state) => {
    return state.SpotifyUserState.artistID;
  },
  getUserGenreOptions: (state) => {
    return state.SpotifyUserState.userGenreOptions;
  },
  getNewTrackParams: (state) => {
    return state.SpotifyUserState.trackParams;
  },
  getCurrentSampleTrack: (state) => {
    return state.SpotifyUserState.currentSampleTrackID;
  },
};

const mutations = {
  resetSpotifyAccessKey: (state) => {
    return (state.SpotifyUserState.token = null);
  },
  setSpotifyAccessKey: (state, token) => {
    return (state.SpotifyUserState.token = token);
  },
  setSeedTrackID: (state, trackID) => {
    return (state.SpotifyUserState.trackID = trackID);
  },
  setSeedArtistID: (state, artistID) => {
    return (state.SpotifyUserState.artistID = artistID);
  },
  storeNewTrackParams: (state, newTrackParams) => {
    return (state.SpotifyUserState.trackParams = newTrackParams);
  },
  storeNewUserGenreOptions: (state, options) => {
    return (state.SpotifyUserState.userGenreOptions = options);
  },
  setCurrentSampleTrack: (state, track) => {
    return (state.SpotifyUserState.currentSampleTrackID = track);
  },
};

export default {
  state,
  getters,
  mutations,
};
