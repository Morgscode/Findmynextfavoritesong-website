<template>
  <div id="login-form">
    <form @submit.prevent>
      <p>Find new music based on your current top tracks on Spotify.</p>
      <p>You'll need to login via Spotify to Authorize this service.</p>
      <button
        class="btn btn-primary login-btn"
        v-on:click.stop="spotifyRedirect()"
      >
        Login via Spotify
      </button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "LoginForm",
  data() {
    return {
      env: "prod",
      spotifyClientID: `083f78d343ae4a98b5b4e843b87f7b61`,
      redirectBaseUrl: `http://localhost:8080/`,
      redirectPath: "spotify-tracks",
      scopes: `user-read-email%20user-top-read%20user-library-read%20user-library-modify`,
      spotifyAuthUrl: ``,
    };
  },
  created() {
    this.setRedirectBaseUrl();
    this.resetSpotifyAccessKey();
    this.spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${this.spotifyClientID}&redirect_uri=${this.redirectBaseUrl}${this.redirectPath}&scope=${this.scopes}&response_type=token`;
  },
  methods: {
    ...mapMutations(["resetSpotifyAccessKey"]),
    setRedirectBaseUrl() {
      return this.env === "dev"
        ? (this.redirectBaseUrl = "http://localhost:8080/")
        : (this.redirectBaseUrl =
            "https://findmynextfavoritesong.luke-morgan.com/");
    },
    spotifyRedirect() {
      window.location.href = this.spotifyAuthUrl;
    },
  },
};
</script>

<style>
#login-form {
  width: 100%;
}

#login-form form {
  position: relative;
  display: inline-block;
  padding: 3rem;
  font-size: 1.6rem;
}

#login-form form > * {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#login-form form > *:not(:last-child) {
  margin-bottom: 2rem;
}

#login-form form {
  color: #3a3a3a;
  background-color: rgba(220, 221, 225, 0.35);
  box-shadow: 2px 5px 20px rgba(0, 0, 0, 0.4);
}
</style>
