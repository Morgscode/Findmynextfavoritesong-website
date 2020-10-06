<template>
  <div id="user-top-artists">
    <div class="container">
      <div class="panel">
        <p>spotify user artists</p>
      </div>
    </div>
    <div v-if="!token" id="error-message">
      <small>Theres a problem with the spotift authorization token.</small>
      <router-link to="/">let's try again</router-link>
    </div>
  </div>
</template>

<script>
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
export default {
  name: "SpotifyUserTopArtists",
  props: {
    token: {
      type: String,
    },
  },
  data() {
    return {
      spotifyUserTopTracks: {},
      SpotifyApiInterface: null,
    };
  },
  created() {
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      this.getSpotifyUserTopArtists();
    }
  },
  methods: {
    getSpotifyUserTopArtists() {
      this.SpotifyApiInterface.spotifyFetchRequest(
        "https://api.spotify.com/v1/me/top/artists"
      );
    },
  },
};
</script>

<style>
</style>