<template>
  <div id="spotify-user-profile">
    <div class="container">
      <div class="panel">
        <p>spotify user profile</p>
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
  name: "SpotifyUserProfile",
  props: {
    token: {
      type: String,
    },
  },
  data() {
    return {
      spotifyUserProfile: null,
      SpotifyApiInterface: null,
    };
  },
  created() {
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      this.getSpotifyUserProfile();
    }
  },
  methods: {
    getSpotifyUserProfile() {
      this.SpotifyApiInterface.spotifyFetchRequest(
        "https://api.spotify.com/v1/me"
      );
    },
  },
};
</script>

<style></style>
