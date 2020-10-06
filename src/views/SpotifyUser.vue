<template>
  <div id="spotify-user">
    <SpotifyProfile v-bind:token="spotifyAccessToken" />
    <SpotifyUserTopTracks v-bind:token="spotifyAccessToken" />
    <SpotifyUserTopArtists v-bind:token="spotifyAccessToken" />
  </div>
</template>

<script>
import SpotifyProfile from "../components/SpotifyProfile.vue";
import SpotifyUserTopTracks from "../components/SpotifyUserTopTracks";
import SpotifyUserTopArtists from "../components/SpotifyUserTopArtists";

export default {
  name: "SpotifyUser",
  components: {
    SpotifyProfile,
    SpotifyUserTopTracks,
    SpotifyUserTopArtists,
  },
  data() {
    return {
      urlHash: null,
      urlHashArray: [],
      spotifyAccessToken: null,
    };
  },
  methods: {
    manageUrlHash(hash) {
      if (hash) {
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
        this.spotifyAccessToken = this.urlHashArray[0][1];
        return this.spotifyAccessToken;
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
