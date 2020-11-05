import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import SpotifyTracks from "../views/SpotifyTracks";
import TrackAnalysis from "../views/TrackAnalysis";
import SelectSpotifyGenres from "../views/SelectSpotifyGenres";
import SpotifyRecommendations from "../views/SpotifyRecommendations";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/spotify-tracks",
    name: "SpotifyTracks",
    component: SpotifyTracks,
  },
  {
    path: "/track-analysis",
    name: "TrackAnalysis",
    component: TrackAnalysis,
  },
  {
    path: "/spotify-genres",
    name: "SpotifyGenres",
    component: SelectSpotifyGenres,
  },
  {
    path: "/track-recommendations",
    name: "SpotifyRecommendations",
    component: SpotifyRecommendations,
  },
  {
    path: "/*",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
