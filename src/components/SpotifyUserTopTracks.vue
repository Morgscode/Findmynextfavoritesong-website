<template>
  <div id="user-top-tracks">
    <div v-if="!tokenHasExpired">
      <div class="panel tracks" v-if="spotifyTracks">
        <p class="tracks__header">Your favourite tracks on Spotify right now</p>
        <div class="track" v-bind:key="track.id" v-for="track in spotifyTracks">
          <div class="track__details">
               <img class="track__image" v-bind:src="track.album.images[0].url" alt="An image for the current track's album from Spotify">
              <p class="track__name"> {{ track.name }} </p>
              <p class="track__artist"> {{ track.artists[0].name }} </p>
          </div>
          <div class="track__options">
            <div class="spotify-audio-preview" v-if="track.preview_url">
              <audio controls>
                <source v-bind:src="track.preview_url" type="audio/mpeg" />
              </audio>
            </div>
            <div v-else>There is no audio preview available for {{ track.name }} </div>
            <div>
              <button class="btn btn-primary" v-on:click.stop="musicAnalysisRedirect(track.id, track.artists[0].id)">
                Find music similar to &nbsp;<span class="track__name">&nbsp;{{ track.name }} </span>
              </button>
            </div>
          </div>
        </div>
        <button v-if="spotifyUserTopTracks.previous" class="btn btn-alt" v-on:click.stop="loadPreviousSpotifyUserTopTracks()" v-scroll-to="'#user-top-tracks'">See previous tracks</button>
        <button v-if="spotifyUserTopTracks.next" class="btn btn-secondary" v-on:click.stop="loadMoreSpotifyUserTopTracks()" v-scroll-to="'#user-top-tracks'">load more of your top tracks</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
export default {
  name: "SpotifyUserTopTracks",
  /**
    we'll need a function to retrieve the token from the store
   */
  data() {
    return {
      spotifyUserTopTracks: null,
      SpotifyApiInterface: {},
      tokenHasExpired: null,
      spotifyTracks:null,
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
  methods: {
    ...mapMutations(["setSeedTrackID", "setSeedArtistID"]),
    async getSpotifyUserTopTracks(url) {
        this.spotifyUserTopTracks = await this.SpotifyApiInterface.spotifyFetchRequest(url);
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
      this.$router.push('track-analysis');
    }
  },
};
</script>

<style scoped>
  .tracks__header {
    font-size: 22px;
    margin-bottom: 3rem;
  }

  .track {
    display: grid;
    align-items: center;
    justify-items: center;
    border-bottom: var(--border);
    padding-bottom: 3rem;
    margin-top: 3rem;
  }

  .track__details {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 22px;
  }

  .track__image {
    max-width: 400px;
    margin-bottom: 3rem;
  }

  .track__name {
    display: inline-block;
  }

  .track__details .track__name {
    font-weight: 600;
  }

  .track__options div:first-child {
    display: block;
    margin-bottom: 3rem;
  }

  @media  only screen and (min-width: 1201px) {
    .track {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 1rem;
      
    }

    .track:not(first-child) {
      margin-top: 3rem
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1200px) {
    .track {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 1rem;
    }

    .track > * {
      margin-bottom: 3rem;
    }
  }

  @media only screen and (max-width: 768px) {

    .track__image {
       max-width: 80%;
    }
  
    .track {
      grid-template-columns: repeat(1, 1fr);
    }

    .track > *:not(:last-child) {
      margin-bottom: 3rem;
    }
  }

  @media only screen and (max-width: 576px) {
    
    .track > *:not(:last-child) {
      margin-bottom: 1.5rem;
    }

  }
</style>
