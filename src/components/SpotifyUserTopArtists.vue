<template>
  <div id="user-top-artists">
    <div class="container" v-if="!tokenHasExpired">
      <div class="panel">
        <p>spotify user artists</p>
      </div>
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
      spotifyUserTopArtists: [{}],
      SpotifyApiInterface: {},
      tokenHasExpired: false
    };

  },
  async created() {
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      this.spotifyUserTopArtists = await this.getSpotifyUserTopArtists();
      //console.log(this.spotifyUserTopArtists);

       if (this.spotifyUserTopArtists.error) {
        this.tokenHasExpired = true;
      }
    }
  },
  methods: {
    getSpotifyUserTopArtists() {
      return this.SpotifyApiInterface.spotifyFetchRequest(
        "https://api.spotify.com/v1/me/top/artists"
      );
    },
  },
};
</script>

<style>
</style>