<template>
  <div id="single-track-analysis" class="panel" v-if="spotifyTrackAnalysis">
    <p class="track-analysis__intro">This is the Spotify tack analysis of your chosen song. Spotify uses these attributes to classify music and suggest new songs to you. You can either search for new music based on these attributes as they are... or modify them with the sliders below.</p>
    <form class="track-analysis-form" @submit.prevent>
      <div class="field-group">
        <p class="slider-label">acousticness</p>
        <small class="slider__description">A measurement of wether or not the track is acoustic</small>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.acousticness" />
      </div>
      <div class="field-group">
        <p class="slider-label">danceability</p>
        <small class="slider__description">A measurement of how suitable the song is for dancing</small>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.danceability" />
      </div>
      <div class="field-group">
        <p class="slider-label">energy</p>
        <small class="slider__description">A measurement of the tracks intensity and activity</small>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.energy" />
      </div>
      <div class="field-group">
        <p class="slider-label">instrumentalness</p>
        <small class="slider__description">Predicts wether or not the track contains vocals</small>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.instrumentalness" />
      </div>
      <div class="field-group">
        <p class="slider-label">key</p>
        <small class="slider__description">A reference to which key the track is in. A reference to the pitch class notation scale (0 to 11).&nbsp;<a href="https://en.wikipedia.org/wiki/Pitch_class#Other_ways_to_label_pitch_classes" target="_blank">see the guide</a></small>
        <input class="slider" type="range" min="0" max="11" step="1" v-model="newTrackParams.key" />
      </div>
      <div class="field-group">
        <p class="slider-label">liveliness</p>
        <small class="slider__description">Detects the presence of an audience in the in the track's recording</small>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.liveliness" />
      </div>
      <div class="field-group">
        <p class="slider-label">loudness</p>
        <small class="slider__description">The overall loudness of the track in decibels (dB)</small>
        <input class="slider" type="range" min="-60" max="0" step="0.001" v-model="newTrackParams.loudness" />
      </div>
      <div class="field-group">
        <p class="slider-label">mode</p>
        <small class="slider__description">Indicates the modality of the track (minor to major)</small>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.mode" />
      </div>
      <div class="field-group">
        <p class="slider-label">speechiness</p>
        <small class="slider__description">Detects the presence of spoken words in the track</small>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.speechiness" />
      </div>
      <div class="field-group">
        <p class="slider-label">tempo</p>
        <small class="slider__description">The overall tempo of the track in beats per minute (BPM)</small>
        <input class="slider" type="range" min="0" max="1000" step="10" v-model="newTrackParams.tempo" />
      </div>
      <div class="field-group">
        <p class="slider-label">valence</p>
        <small class="slider__description">valence describes the muscial 'positivity' of the track. A higher valence is a happier song</small>
        <input class="slider" type="range" min="0" max="1" step="0.001" v-model="newTrackParams.valence" />
      </div>
      <button class="btn btn-primary" v-on:click.stop="recommendationsRedirect(token, trackID, artistID, newTrackParams)">Find me songs with these attributes</button>
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
    },
    artistID: {
      type: String,
    },
  },
  data() {
    return {
      spotifyTrackAnalysisBaseUrl: `https://api.spotify.com/v1/audio-features/${this.trackID}`,
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
    },
    recommendationsRedirect(token, trackID, artistID,trackParams) {
      this.$router.push(
        {
          path: 'track-recommendations', 
          query: {
            token: token,
            trackID: trackID,
            artistID: artistID,
            acousticness: trackParams.acousticness, 
            danceability: trackParams.danceability, 
            energy: trackParams.energy, 
            instrumentalness: trackParams.instrumentalness, 
            key: trackParams.key, 
            liveness: trackParams.liveness, 
            loudness: trackParams.loudness, 
            mode: trackParams.mode, 
            speechiness: trackParams.speechiness, 
            tempo: trackParams.tempo, 
            valence: trackParams.valence,
            }
          });
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

.slider__description {
  font-size: 15px;
  display: block;
  margin-bottom: 3rem;
}

</style>
