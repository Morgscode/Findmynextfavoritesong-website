<template>
  <div id="track-recommnedations" class="panel" v-if="trackRecommendations">
    <p>recommendations works!</p>
  </div>
</template>

<script>
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
export default {
  name: "TrackRecommendations",
  /**
    we'll need to grab the token, trackID, artistID and genres
    from the store
   */
  data() {
    return {
      spotifyRecommendationsBaseUrl: `https://api.spotify.com/v1/recommendations`,
      recommendationsUrl: null,
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
      trackRecommendations: null,
      genres: 'deep-house',
    };
  },
  created() {
    this.prepareNewTrackParams();
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
    }
    this.requestSpotifyTrackRecommendations();
  },
  methods: {
    prepareNewTrackParams() {
      this.newTrackParams = {...this.$route.query};
      delete this.newTrackParams.token;
      delete this.newTrackParams.trackID;
      return this.newTrackParams;
    },
    prepareRecommendationsUrl() {
      this.recommendationsUrl = `${this.spotifyRecommendationsBaseUrl}?seed_artists=${this.artistID}&seed_genres=${this.genres}&seed_track=${this.trackID}&target_acousticness=${this.newTrackParams.acousticness}&target_danceability=${this.newTrackParams.danceability}&target_energy=${this.newTrackParams.energy}&target_instrumentalness=${this.newTrackParams.instrumentalness}&target_key=${this.newTrackParams.key}&target_liveness=${this.newTrackParams.liveness}&target_loudness=${this.newTrackParams.loudness}&target_mode=${this.newTrackParams.mode}&target_speechiness=${this.newTrackParams.speechiness}&target_tempo=${this.newTrackParams.tempo}&target_valence=${this.newTrackParams.valence}`;
    },
    async requestSpotifyTrackRecommendations() {
      this.prepareRecommendationsUrl();
      console.log(this.recommendationsUrl);
      this.trackRecommendations = await this.SpotifyApiInterface.spotifyFetchRequest(this.recommendationsUrl);
      console.log(this.trackRecommendations);
    }
  },
};
</script>

<style>
</style>
