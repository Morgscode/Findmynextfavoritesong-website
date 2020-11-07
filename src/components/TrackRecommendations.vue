<template>
  <div id="track-recommnedations" class="panel" v-if="trackRecommendations">
    <p class="panel-intro">
      These are the Spotify's recommendations based on your chosen artist,
      track, track-analysis and seed genres. You can preview the songs here, and
      if you like them... you can add them to your 'Liked Songs' playlist in
      your Spotify library
    </p>
    <div
      class="track"
      v-bind:key="track.id"
      v-for="track in trackRecommendations.tracks"
    >
      <div class="track__details">
        <img
          class="track__image"
          v-bind:src="track.album.images[0].url"
          alt="An image for the current track's album from Spotify"
        />
        <p class="track__name">{{ track.name }}</p>
        <p class="track__artist">{{ track.artists[0].name }}</p>
      </div>
      <div class="track__options">
        <div class="spotify-audio-preview">
          <AudioPlayer v-bind:track="track" />
        </div>
        <div>
          <button
            class="btn btn-primary"
            v-on:click.stop="saveTrackToUserLibrary(track.id)"
          >
            Save&nbsp;<span class="track__title"
              >&nbsp;{{ track.name }} to my liked songs playlist
            </span>
          </button>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
import AudioPlayer from "./AudioPlayer";
export default {
  name: "TrackRecommendations",
  components: {
    AudioPlayer,
  },
  data() {
    return {
      spotifyRecommendationsBaseUrl: `https://api.spotify.com/v1/recommendations`,
      spotifyRecommendationsQuery: null,
      spotifyLibraryEndPoint: `https://api.spotify.com/v1/me/tracks`,
      spotifyIdQueryStringKey: `?ids=`,
      SpotifyApiInterface: null,
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
      genres: null,
    };
  },
  computed: {
    ...mapGetters([
      "getSpotifyAccessKey",
      "getSeedTrackID",
      "getSeedArtistID",
      "getUserGenreOptions",
      "getNewTrackParams",
    ]),
  },
  async created() {
    this.token = this.getSpotifyAccessKey;
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      this.prepareNewTrackParams();
      this.prepareGenreParams();
    }
    this.trackRecommendations = await this.requestSpotifyTrackRecommendations();
    this.$scrollTo("#spotify-user-profile", 200);
  },
  methods: {
    prepareNewTrackParams() {
      this.newTrackParams = this.getNewTrackParams;
      delete this.newTrackParams.analysis_url;
      delete this.newTrackParams.duration_ms;
      delete this.newTrackParams.id;
      delete this.newTrackParams.time_signature;
      delete this.newTrackParams.track_href;
      delete this.newTrackParams.type;
      delete this.newTrackParams.uri;
      return this.newTrackParams;
    },
    prepareGenreParams() {
      this.genres = this.getUserGenreOptions;
      this.genres = this.genres.join(",");
      return this.genres;
    },
    preparespotifyRecommendationsQuery() {
      this.spotifyRecommendationsQuery = `${this.spotifyRecommendationsBaseUrl}?seed_artists=${this.getSeedArtistID}&seed_genres=${this.genres}&seed_track=${this.getSeedTrackID}&target_acousticness=${this.newTrackParams.acousticness}&target_danceability=${this.newTrackParams.danceability}&target_energy=${this.newTrackParams.energy}&target_instrumentalness=${this.newTrackParams.instrumentalness}&target_key=${this.newTrackParams.key}&target_liveness=${this.newTrackParams.liveness}&target_loudness=${this.newTrackParams.loudness}&target_mode=${this.newTrackParams.mode}&target_speechiness=${this.newTrackParams.speechiness}&target_tempo=${this.newTrackParams.tempo}&target_valence=${this.newTrackParams.valence}`;
      return this.spotifyRecommendationsQuery;
    },
    async requestSpotifyTrackRecommendations() {
      this.preparespotifyRecommendationsQuery();
      return await this.SpotifyApiInterface.spotifyGetFetchRequest(
        this.spotifyRecommendationsQuery
      );
    },
    async saveTrackToUserLibrary(trackID) {
      const url = `${this.spotifyLibraryEndPoint}${this.spotifyIdQueryStringKey}${trackID}`;
      const response = await this.SpotifyApiInterface.spotifyPutFetchRequest(
        url
      );
      return response;
    },
  },
};
</script>

<style>
</style>
