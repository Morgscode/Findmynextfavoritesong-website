<template>
  <div id="single-track-analysis" class="panel" v-if="spotifyTrackAnalysis">
    <p class="track-analysis__intro">This is the Spotify tack analysis of your chosen song. Spotify uses these attributes to classify music and suggest new songs to you. You can either search for new music based on these attributes as they are... or modify them with the sliders below.</p>
    <form class="track-analysis-form" @submit.prevent>
      <div class="field-group">
        <p class="slider-label">acousticness</p>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.acousticness" />
      </div>
      <div class="field-group">
        <p class="slider-label">danceability</p>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.danceability" />
      </div>
      <div class="field-group">
        <p class="slider-label">energy</p>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.energy" />
      </div>
      <div class="field-group">
        <p class="slider-label">instrumentalness</p>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.instrumentalness" />
      </div>
      <div class="field-group">
        <p class="slider-label">key</p>
        <input class="slider" type="range" min="0" max="11" step="1" v-model="newTrackParams.instrumentalness" />
      </div>
      <div class="field-group">
        <p class="slider-label">liveliness</p>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.liveliness" />
      </div>
      <div class="field-group">
        <p class="slider-label">loudness</p>
        <input class="slider" type="range" min="-60" max="0" step="0.001" v-model="newTrackParams.loudness" />
      </div>
      <div class="field-group">
        <p class="slider-label">mode</p>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.mode" />
      </div>
      <div class="field-group">
        <p class="slider-label">speechiness</p>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.speechiness" />
      </div>
      <div class="field-group">
        <p class="slider-label">tempo</p>
        <input class="slider" type="range" min="0" max="1000" step="10" v-model="newTrackParams.tempo" />
      </div>
      <div class="field-group">
        <p class="slider-label">valence</p>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.valence" />
      </div>
      <button class="btn btn-primary" v-on:click.stop>Find me songs with these attributes</button>
    </form>
  </div>
</template>

<script>
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
export default {
  name: "SingleTrack",
  props: {
    token: {
      type: String,
    },
    trackID: {
      type: String,
    }
  },
  data() {
    return {
      spotifyTrackAnalysis: null,
      newTrackParams: {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        key: 0,
        liveliness: 0,
        loudness: 0,
        mode: 0,
        speechiness: 0,
        tempo: 0,
        valence: 0,
      },
      spotifyTrackAnalysisBaseUrl: `https://api.spotify.com/v1/audio-features/${this.trackID}`
    };
  },
  created() {
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      this.getSpotifyTrackAnalysis();
    }
  },
  methods: {
    async getSpotifyTrackAnalysis() {
       this.spotifyTrackAnalysis = await this.SpotifyApiInterface.spotifyFetchRequest(this.spotifyTrackAnalysisBaseUrl);
       this.bindInitialTrackAnalysis();
    },
    bindInitialTrackAnalysis() {
      this.newTrackParams = {...this.spotifyTrackAnalysis};
    }
  },
};
</script>

<style scoped>

.track-analysis__intro {
  text-align: left;
  line-height: 1.5;
  margin-bottom: 3rem;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: var(--spotify-green);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--spotify-green);
  cursor: pointer;
}

.field-group {
  margin-bottom: 3rem;
}

.slider-label {
  font-size:22px;
  margin-bottom: 1rem;
}

</style>
