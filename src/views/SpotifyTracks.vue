<template>
  <div id="spotify-user" class="container">
    <SpotifyProfile />
    <SpotifyUserTopTracks />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import SpotifyProfile from "../components/SpotifyProfile.vue";
import SpotifyUserTopTracks from "../components/SpotifyUserTopTracks";

export default {
  name: "SpotifyTracks",
  components: {
    SpotifyProfile,
    SpotifyUserTopTracks,
  },
  data() {
    return {
      urlHash: null,
      urlHashArray: null,
      spotifyAccessToken: null,
    };
  },
  methods: {
    ...mapMutations(["setSpotifyAccessKey"]),
    manageUrlHash(hash) {
      if (hash && typeof hash === "string") {
        this.urlHash = hash;
        this.urlHashArray = this.urlHash.split("&");
        this.urlHashArray[0] = this.urlHashArray[0].split("=");
        return this.urlHash;
      } else {
        return false;
      }
    },
    setNewSpotifyAccessToken() {
      if (
        typeof this.urlHashArray[0][0] === "string" &&
        typeof this.urlHashArray[0][1] === "string" &&
        this.urlHashArray[0][0].startsWith("#access_token")
      ) {
        /**
          this is where we will push the token to the store
         */
        this.setSpotifyAccessKey(this.urlHashArray[0][1]);
      } else {
        return false;
      }
    },
  },
  created() {
    const urlHash = this.manageUrlHash(this.$router.history.current.hash);
    if (urlHash) {
      this.setNewSpotifyAccessToken();
    }
  },
};
</script>
