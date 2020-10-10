import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SpotifyUser from "../views/SpotifyUser.vue";
import TrackSearch from "../views/TrackSearch";

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
    path: "/search",
    name: "TrackSearch",
    component: TrackSearch,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
