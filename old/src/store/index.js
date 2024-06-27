import Vue from "vue";
import Vuex from "vuex";
import SpotifyUserState from "./modules/SpotifyUserState";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    SpotifyUserState,
  },
});
