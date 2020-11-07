<template>
  <div id="spotify-user-profile">
    <div class="panel" v-if="!displayErrorMessage">
      <div class="profile">
        <img src="../assets/user.svg" class="user-icon" />
        <div>
          <p class="profile__user-details">
            Your spotify ID:
            <span id="spotify-user-id">{{ spotifyDisplayName }}</span>
          </p>
          <p class="profile__user-details" v-if="spotifyFollowers > 0">
            Followers:
            <span id="spotify-follower-count">{{ spotifyFollowers }}</span>
          </p>
        </div>
        <a target="_blank" v-bind:href="spotifyWebplayerUrl"
          ><button class="btn btn-alt">open your Spotify webplayer</button></a
        >
      </div>
    </div>
    <div v-else id="error-message" class="panel">
      <small
        >Theres a problem with the spotify authorization token. &nbsp;</small
      >
      <router-link to="/"
        ><span class="error-message-link">let's try again</span></router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
export default {
  name: "SpotifyUserProfile",
  data() {
    return {
      token: null,
      spotifyProfileBaseUrl: "https://api.spotify.com/v1/me",
      spotifyUserProfile: null,
      SpotifyApiInterface: null,
      displayErrorMessage: false,
      spotifyWebplayerUrl: null,
      spotifyDisplayName: null,
      spotifyFollowers: 0,
    };
  },
  computed: {
    ...mapGetters(["getSpotifyAccessKey"]),
  },
  async created() {
    this.token = this.getSpotifyAccessKey;
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
    } else {
      this.displayErrorMessage = true;
    }
  },
  updated() {},
  methods: {
    async getSpotifyUserProfile() {
      return await this.SpotifyApiInterface.spotifyGetFetchRequest(
        this.spotifyProfileBaseUrl
      );
    },
  },
};
</script>

<style>
#spotify-user-id {
  color: var(--spotify-green);
  font-weight: 800;
  font-size: 20px;
}

#spotify-follower-count {
  color: var(--spotify-green);
  font-weight: 800;
  font-size: 20px;
}
.user-icon {
  max-width: 150px;
}

.profile {
  display: grid;
  align-items: center;
  justify-items: center;
}

.profile__user-details {
  padding: 1rem;
  text-align: center;
}

.profile .btn-alt {
  margin: 0;
}

@media only screen and (min-width: 768px) {
  .profile {
    grid-template-columns: auto auto auto;
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
