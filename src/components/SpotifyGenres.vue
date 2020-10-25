<template>
  <div id="spotify-genres" class="panel" v-if="spotifyGenreOptions">
    <p class="panel-intro">These are the seed genres that Spotify provides. Select up to 3 and then hit the 'Find me new music based on these genres' button at the bottom of the panel.</p>
    <form class="genre-form" @submit.prevent>
      <div class="genre-form-options">
        <div class="genre-form-group" v-for="genre in spotifyGenreOptions" v-bind:key="genre">
          <label v-bind:for="genre">{{ genre }}</label>
          <input type="checkbox" v-bind:name="genre" v-bind:id="genre" v-bind:value="genre" v-bind:disabled="checkBoxDisabled" v-model="genreOptions">
        </div>
      </div>
      <button id="submit-genres" class="btn btn-primary" v-bind:disabled="submitButtonDisabled" v-on:click.prevent="recommendationsRedirect()">Find me new music based on these genres</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SpotifyApiInterface from "../services/SpotifyApiInterface";
import VueScrollTo from "vue-scrollto";


export default {
  name: "SpotifyUserProfile",
  data() {
    return {
      token: null,
      genreOptions: [],
      spotifyGenreOptions: null,
      SpotifyApiInterface: null,
      checkBoxDisabled: false,
      submitButtonDisabled: true,
      spotifyGenresBaseUrl: 'https://api.spotify.com/v1/recommendations/available-genre-seeds',
    }
  },
  computed: {
    ...mapGetters(["getSpotifyAccessKey"])
  },
  async created() {
    this.token = this.getSpotifyAccessKey;
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      await this.getSpotifyGenreOptions();
    }
  },
  beforeUpdate() {
    this.genreOptions.length <= 0 ? this.submitButtonDisabled = true : this.submitButtonDisabled = false;
    if (this.genreOptions.length >= 3) {
      this.checkBoxDisabled = true
      VueScrollTo.scrollTo("#submit-genres");
    }
  },
  methods: {
    ...mapMutations(["storeNewGenreOptions"]),
    async getSpotifyGenreOptions() {
      const genresResponse = await this.SpotifyApiInterface.spotifyFetchRequest(this.spotifyGenresBaseUrl);
      this.spotifyGenreOptions = genresResponse.genres;
    },
    recommendationsRedirect() {
      this.storeNewGenreOptions(this.genreOptions);
      this.$router.push("track-recommendations")
    }
  }
}
</script>

<style scoped>

.genres-intro {
  margin-bottom: 3rem;
}

.genre-form-options {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 3rem;
  margin-bottom: 3rem;
}

.genre-form-group {
  border: 1px solid var(--spotify-green);
  border-radius: 6px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
}

.genre-form-group label  {
  margin-right: 1rem;
}

@media only screen and (max-width: 768px) {
  .genre-form-options {
    grid-template-columns: auto auto auto;
  }
}

@media only screen and (max-width: 576px) {
  .genre-form-options {
    grid-template-columns: auto auto;
  }
}

@media only screen and (max-width: 350px) {
  .genre-form-options {
    grid-template-columns: auto;
  }
}

</style>