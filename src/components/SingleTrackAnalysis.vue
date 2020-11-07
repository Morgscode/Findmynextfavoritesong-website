<template>
  <div id="single-track-analysis" class="panel" v-if="spotifyTrackAnalysis">
    <p class="track-analysis__intro">
      This is the Spotify tack analysis of your chosen song. Spotify uses these
      attributes to classify music and suggest new songs to you. You can either
      search for new music based on these attributes as they are... or modify
      them with the sliders below.
    </p>
    <form class="track-analysis-form" @submit.prevent>
      <div class="field-group">
        <p class="slider-label">
          acousticness:
          <span class="track-attribute-value">{{
            newTrackParams.acousticness
          }}</span>
        </p>
        <small class="slider__description"
          >A measurement of wether or not the track is acoustic</small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="1"
          step="0.001"
          v-model="newTrackParams.acousticness"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          danceability:
          <span class="track-attribute-value">{{
            newTrackParams.danceability
          }}</span>
        </p>
        <small class="slider__description"
          >A measurement of how suitable the song is for dancing</small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="1"
          step="0.001"
          v-model="newTrackParams.danceability"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          energy:
          <span class="track-attribute-value">{{ newTrackParams.energy }}</span>
        </p>
        <small class="slider__description"
          >A measurement of the tracks intensity and activity</small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="1"
          step="0.001"
          v-model="newTrackParams.energy"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          instrumentalness
          <span class="track-attribute-value">{{
            newTrackParams.instrumentalness
          }}</span>
        </p>
        <small class="slider__description"
          >Predicts wether or not the track contains vocals</small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="1"
          step="0.001"
          v-model="newTrackParams.instrumentalness"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          key:
          <span class="track-attribute-value">{{ newTrackParams.key }}</span>
        </p>
        <small class="slider__description"
          >A reference to which key the track is in. A reference to the pitch
          class notation scale (0 to 11).&nbsp;<a
            href="https://en.wikipedia.org/wiki/Pitch_class#Other_ways_to_label_pitch_classes"
            target="_blank"
            class="text-link"
            >see the guide</a
          ></small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="11"
          step="1"
          v-model="newTrackParams.key"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          liveness:
          <span class="track-attribute-value">{{
            newTrackParams.liveness
          }}</span>
        </p>
        <small class="slider__description"
          >Detects the presence of an audience in the in the track's
          recording</small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="1"
          step="0.001"
          v-model="newTrackParams.liveness"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          loudness:
          <span class="track-attribute-value">{{
            newTrackParams.loudness
          }}</span>
        </p>
        <small class="slider__description"
          >The overall loudness of the track in decibels (dB)</small
        >
        <input
          class="slider"
          type="range"
          min="-60"
          max="0"
          step="0.001"
          v-model="newTrackParams.loudness"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          mode:
          <span class="track-attribute-value">{{ newTrackParams.mode }}</span>
        </p>
        <small class="slider__description"
          >Indicates the modality of the track (minor to major)</small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="1"
          step="0.001"
          v-model="newTrackParams.mode"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          speechiness:
          <span class="track-attribute-value">{{
            newTrackParams.speechiness
          }}</span>
        </p>
        <small class="slider__description"
          >Detects the presence of spoken words in the track</small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="1"
          step="0.001"
          v-model="newTrackParams.speechiness"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          tempo:
          <span class="track-attribute-value">{{ newTrackParams.tempo }}</span>
        </p>
        <small class="slider__description"
          >The overall tempo of the track in beats per minute (BPM)</small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="1000"
          step="10"
          v-model="newTrackParams.tempo"
        />
      </div>
      <div class="field-group">
        <p class="slider-label">
          valence:
          <span class="track-attribute-value">{{
            newTrackParams.valence
          }}</span>
        </p>
        <small class="slider__description"
          >valence describes the muscial 'positivity' of the track. A higher
          valence is a happier song</small
        >
        <input
          class="slider"
          type="range"
          min="0"
          max="1"
          step="0.001"
          v-model="newTrackParams.valence"
        />
      </div>
      <button
        class="btn btn-primary"
        v-on:click.stop="genresRedirect(newTrackParams)"
      >
        Select preferred genres
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
export default {
  name: "SingleTrack",
  /**
    we'll need to grab the token and trackID from the store
   */
  data() {
    return {
      spotifyTrackAnalysisBaseUrl: `https://api.spotify.com/v1/audio-features/`,
      spotifyTrackAnalysis: null,
      newTrackParams: {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        key: 0,
        liveness: 0,
        loudness: 0,
        mode: 0,
        speechiness: 0,
        tempo: 0,
        valence: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["getSpotifyAccessKey", "getSeedTrackID"]),
  },
  async created() {
    this.token = this.getSpotifyAccessKey;
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      await this.getSpotifyTrackAnalysis();
    }
  },
  methods: {
    ...mapMutations(["storeNewTrackParams"]),
    async getSpotifyTrackAnalysis() {
      this.spotifyTrackAnalysis = await this.SpotifyApiInterface.spotifyGetFetchRequest(
        `${this.spotifyTrackAnalysisBaseUrl}${this.getSeedTrackID}`
      );
      this.bindInitialTrackAnalysis();
    },
    bindInitialTrackAnalysis() {
      this.newTrackParams = { ...this.spotifyTrackAnalysis };
    },
    /**
      we'll need to persist the newTrackParams to the store 
     */
    genresRedirect(trackParams) {
      this.storeNewTrackParams(trackParams);
      this.$router.push("spotify-genres");
    },
  },
};
</script>

<style scoped>
.track-analysis__intro {
  text-align: left;
  line-height: 1.5;
  margin-bottom: 3rem;
}

.field-group {
  margin-bottom: 3rem;
}

.slider-label {
  font-size: 22px;
  margin-bottom: 1rem;
}

.slider__description {
  font-size: 15px;
  display: block;
  margin-bottom: 3rem;
}

.track-attribute-value {
  color: var(--spotify-green);
}
</style>
