<template>
  <div id="spotify-genres" class="panel" v-if="spotifyGenreOptions">
    <p class="panel-intro">
      These are the seed genres that Spotify provides. Select up to 3 and then
      hit the 'Find me new music based on these genres' button at the bottom of
      the panel.
    </p>
    <form class="genre-form" @submit.prevent>
      <div class="genre-form-options">
        <div
          class="genre-form-group"
          v-for="genre in spotifyGenreOptions"
          v-bind:key="genre"
        >
          <label class="checkbox-container" v-bind:for="genre"
            >{{ genre }}
            <input
              type="checkbox"
              v-bind:name="genre"
              v-bind:id="genre"
              v-bind:value="genre"
              v-bind:disabled="checkBoxDisabled"
              v-model="genreOptions"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <button
        id="submit-genres"
        class="btn btn-primary"
        v-bind:disabled="submitButtonDisabled"
        v-on:click.prevent="recommendationsRedirect()"
      >
        Find me new music based on these genres
      </button>
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
      spotifyGenresBaseUrl:
        "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    };
  },
  computed: {
    ...mapGetters(["getSpotifyAccessKey"]),
  },
  async created() {
    this.token = this.getSpotifyAccessKey;
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      this.spotifyGenreOptions = await this.getSpotifyGenreOptions();
    }
    this.$scrollTo("#spotify-user-profile", 1000);
  },
  beforeUpdate() {
    this.genreOptions.length <= 0
      ? (this.submitButtonDisabled = true)
      : (this.submitButtonDisabled = false);
    if (this.genreOptions.length >= 3) {
      this.checkBoxDisabled = true;
      VueScrollTo.scrollTo("#submit-genres");
    }
  },
  methods: {
    ...mapMutations(["storeNewGenreOptions"]),
    async getSpotifyGenreOptions() {
      const response = await this.SpotifyApiInterface.spotifyGetFetchRequest(
        this.spotifyGenresBaseUrl
      );
      if (response.genres) {
        return response.genres;
      } else {
        return response.error;
      }
    },
    recommendationsRedirect() {
      this.storeNewGenreOptions(this.genreOptions);
      this.$router.push("track-recommendations");
    },
  },
};
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
  border-radius: 50px;
  background: linear-gradient(225deg, #79899d, #667384);
  box-shadow: -20px 20px 60px #606d7d, 20px -20px 60px #8293a9;
  padding: 2rem;
  border: 1px solid var(--spotify-green);
}

/* Customize the label (the container) */
.checkbox-container {
  display: block;
  position: relative;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .checkmark {
  background-color: var(--spotify-green);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
  top: 10px;
  left: 5px;
  width: 40%;
  height: 75%;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg) translate(-50%, -50%);
  -ms-transform: rotate(45deg) translate(-50%, -50%);
  transform: rotate(45deg) translate(-50%, -50%);
}

@media only screen and (max-width: 991px) {
  .genre-form-options {
    grid-template-columns: auto auto auto;
  }
}

@media only screen and (max-width: 768px) {
  .genre-form-options {
    grid-template-columns: auto auto;
  }
}

@media only screen and (max-width: 576px) {
  .genre-form {
    padding-right: 5rem;
  }

  .genre-form-options {
    grid-template-columns: auto;
  }
}
</style>