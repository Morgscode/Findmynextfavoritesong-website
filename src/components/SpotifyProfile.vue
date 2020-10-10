<template>
  <div id="spotify-user-profile">
    <div class="container">
      <div class="panel" v-if="!displayErrorMessage">
        <div class="profile" >
          <img src="../assets/user.svg" class="user-icon" />
          <p class="profile__user-details">Your spotify ID: {{ spotifyDisplayName }}</p>
          <p class="profile__user-details">Followers: {{ spotifyFollowers }}</p>
          <a target="_blank" class="btn btn-alt" v-bind:href="spotifyWebplayerUrl">open your Spotify webplayer</a>
        </div> 
      </div>
      <div v-else id="error-message" class="panel">
        <small>Theres a problem with the spotify authorization token. &nbsp;</small>
        <router-link to="/"><span class="error-message-link">let's try again</span></router-link>
      </div>
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
      spotifyUserProfile: {},
      SpotifyApiInterface: {},
      displayErrorMessage: false,
      spotifyWebplayerUrl: '',
      spotifyDisplayName: '',
      spotifyFollowers: 0,
    };
  },
  async created() {
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      this.spotifyUserProfile = await this.getSpotifyUserProfile();
      
        if (this.spotifyUserProfile.error) {
          this.displayErrorMessage = true;
          return;
        }

      this.spotifyWebplayerUrl = this.spotifyUserProfile.external_urls.spotify;
      this.spotifyDisplayName = this.spotifyUserProfile.display_name;
      this.spotifyFollowers = this.spotifyUserProfile.followers.total;
    }
  },
  updated() {},
  methods: {
    getSpotifyUserProfile() {
      return this.SpotifyApiInterface.spotifyFetchRequest(
        "https://api.spotify.com/v1/me"
      );
    },
  },
};
</script>

<style>
.user-icon {
  max-width: 150px;
}

.profile {
    display: grid;
    align-items: center;
    justify-items: center;
}

.profile .btn-alt {
  margin: 0;
}

@media only screen and (min-width: 768px) {
  .profile {
    grid-template-columns: auto auto auto auto;
  }
}

@media only screen and (max-width: 767.9px) {
  .profile {
    grid-template-columns: auto auto;
    grid-row-gap: 3rem;
  }
}

@media only screen and (max-width: 576px) {
   .profile {
    grid-template-columns: auto;
    grid-row-gap: 1.5rem;
  }
}
</style>
