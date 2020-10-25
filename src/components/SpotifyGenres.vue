<template>
  <div id="spotify-genres" class="panel" v-if="spotifyGenreOptions">
    <form class="genre-form">
      <div class="genre-form-group" v-for="genre in spotifyGenreOptions" v-bind:key="genre">
        <label v-bind:for="genre">{{ genre }}</label>
        <input type="checkbox" v-bind:name="genre" v-bind:id="genre" v-bind:value="genre" v-bind:disbaled="checkBoxDisabled">
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SpotifyApiInterface from "../services/SpotifyApiInterface";

export default {
  name: "SpotifyUserProfile",
  data() {
    return {
      token: null,
      genreOptions: [],
      spotifyGenreOptions: null,
      SpotifyApiInterface: null,
      checkBoxDisabled: false,
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
  updated() {
    return (this.genreOptions.length >= 3) ? this.checkBoxDisabled = true : this.checkBoxDisabled = false;
  },
  methods: {
    ...mapMutations(["storeNewGenreOptions"]),
    async getSpotifyGenreOptions() {
      const genresResponse = await this.SpotifyApiInterface.spotifyFetchRequest(this.spotifyGenresBaseUrl);
      this.spotifyGenreOptions = genresResponse.genres;
    }
  }
}
</script>

<style scoped>

.genre-form {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 3rem;
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
  .genre-form {
    grid-template-columns: auto auto auto;
  }
}

@media only screen and (max-width: 576px) {
  .genre-form {
    grid-template-columns: auto;
  }
}

</style>