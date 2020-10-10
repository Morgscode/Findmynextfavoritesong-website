import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import SpotifyUser from "../views/SpotifyUser";
import TrackAnalysis from "../views/TrackAnalysis";
import SpotifyRecommendations from "../views/SpotifyRecommendations";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/spotify-profile",
    name: "SpotifyUser",
    component: SpotifyUser,
  },
  {
    path: "/track-analysis",
    name: "TrackAnalysis",
    component: TrackAnalysis,
  },
  {
    path: "/track-recommendations",
    name: "SpotifyRecommendations",
    component: SpotifyRecommendations,
  },
]; 

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
