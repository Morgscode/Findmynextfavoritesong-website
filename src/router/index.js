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
  /**
    we'll need to define a route with some components
    that will allow us to see and select the spotify 
    seed genres (maximum of 3), 
    persist them in the store and then retrieve 
    them in the recommendations route
   */
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
