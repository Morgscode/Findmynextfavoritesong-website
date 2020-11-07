<template>
  <div id="user-top-tracks">
    <div v-if="!tokenHasExpired">
      <div class="panel tracks" v-if="spotifyTracks">
        <p class="tracks__header">Your favourite tracks on Spotify right now</p>
        <p class="panel-intro">
          These are your current top tracks on Spotify based on your user
          analytics. Find new music similar to these tracks by hitting the 'Find
          me music simlar to' button in the respective track section
        </p>
        <div class="track" v-bind:key="track.id" v-for="track in spotifyTracks">
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
                v-on:click.stop="
                  musicAnalysisRedirect(track.id, track.artists[0].id)
                "
              >
                Find music similar to &nbsp;<span class="track__name"
                  >{{ track.name }}
                </span>
              </button>
            </div>
          </div>
        </div>
        <button
          v-if="spotifyUserTopTracks.previous"
          class="btn btn-alt"
          v-on:click.stop="loadPreviousSpotifyUserTopTracks()"
          v-scroll-to="'#user-top-tracks'"
        >
          See previous tracks
        </button>
        <button
          v-if="spotifyUserTopTracks.next"
          class="btn btn-secondary"
          v-on:click.stop="loadMoreSpotifyUserTopTracks()"
          v-scroll-to="'#user-top-tracks'"
        >
          load more of your top tracks
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
import AudioPlayer from "./AudioPlayer";
export default {
  name: "SpotifyUserTopTracks",
  components: {
    AudioPlayer,
  },
  data() {
    return {
      spotifyUserTopTracks: null,
      SpotifyApiInterface: {},
      tokenHasExpired: null,
      spotifyTracks: null,
      spotifyTrackImage: null,
      spotifyTopTracksBaseUrl: "https://api.spotify.com/v1/me/top/tracks",
    };
  },
  computed: {
    ...mapGetters(["getSpotifyAccessKey"]),
  },
  async created() {
    this.token = this.getSpotifyAccessKey;
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      await this.getSpotifyUserTopTracks(this.spotifyTopTracksBaseUrl);
      this.bindSpotifyUserTopTracks();
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(["setSeedTrackID", "setSeedArtistID"]),
    async getSpotifyUserTopTracks(url) {
      this.spotifyUserTopTracks = await this.SpotifyApiInterface.spotifyGetFetchRequest(
        url
      );
    },
    bindSpotifyUserTopTracks() {
      if (this.spotifyUserTopTracks.error) {
        this.tokenHasExpired = true;
        return;
      }
      this.spotifyTracks = this.spotifyUserTopTracks.items;
    },
    async loadMoreSpotifyUserTopTracks() {
      if (this.spotifyUserTopTracks.next) {
        await this.getSpotifyUserTopTracks(this.spotifyUserTopTracks.next);
        this.bindSpotifyUserTopTracks();
      }
    },
    async loadPreviousSpotifyUserTopTracks() {
      if (this.spotifyUserTopTracks.previous) {
        await this.getSpotifyUserTopTracks(this.spotifyUserTopTracks.previous);
        this.bindSpotifyUserTopTracks();
      }
    },
    /**
      we'll need a function to push the trackID and artist ID to the store
     */
    async musicAnalysisRedirect(trackID, artistID) {
      this.setSeedTrackID(trackID);
      this.setSeedArtistID(artistID);
      this.$router.push("track-analysis");
    },
  },
};
</script>

<style>
</style>
