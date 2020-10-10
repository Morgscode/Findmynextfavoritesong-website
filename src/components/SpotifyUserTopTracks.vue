<template>
  <div id="user-top-tracks">
    <div class="container" v-if="!tokenHasExpired">
      <div class="panel tracks">
        <p class="tracks__header">Your favourite tracks on Spotify right now</p>
        <div class="track" v-bind:key="track.id" v-for="track in spotifyTracks">
          <div class="track__details">
               <img class="track__image" v-bind:src="track.album.images[0].url" alt="An image for the current track from Spotify">
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
              <button class="btn btn-primary" v-on:click.stop="musicSearchRedirect(track.id, token)">
                Find music similar to <span class="track__name"> {{ track.name }} </span>
              </button>
            </div>
          </div>
        </div>
        <button v-if="spotifyUserTopTracks.previous" class="btn btn-alt" v-on:click.stop="loadPreviousSpotifyUserTopTracks()">See previous tracks</button>
        <button v-if="spotifyUserTopTracks.next" class="btn btn-secondary" v-on:click.stop="loadMoreSpotifyUserTopTracks()">load more of your top tracks</button>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
export default {
  name: "SpotifyUserTopTracks",
  props: {
    token: {
      type: String,
    },
  },
  data() {
    return {
      spotifyUserTopTracks: {},
      SpotifyApiInterface: {},
      tokenHasExpired: false,
      spotifyTracks:[],
      spotifyTrackImage: '',
      spotifyTopTracksBaseUrl: "https://api.spotify.com/v1/me/top/tracks",
    };
  },
  async created() {
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      await this.getSpotifyUserTopTracks(this.spotifyTopTracksBaseUrl);
      this.bindSpotifyUserTopTracks();
      console.log(this.spotifyUserTopTracks);
    }
  },
  methods: {
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
    musicSearchRedirect(id, token) {
      console.log(id)
      console.log(token);
    }
  },
};
</script>

<style>
  .tracks__header {
    font-size: 22px;
    margin-bottom: 3rem;
  }

  .track {
    display: grid;
    align-items: center;
    justify-items: center;
  }

  .track__details {
    display: flex;
    flex-direction: column;
    align-items: center;
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
      margin-bottom: 3rem;
    }
  }

  @media only screen and (min-width: 768.1px) and (max-width: 1200px) {
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

    .track > * {
      margin-bottom: 3rem;
    }
  }

  @media only screen and (max-width: 576px) {
    
    .track > * {
      margin-bottom: 1.5rem;
    }

    .track__options div:first-child {
      margin-bottom: 1.5rem;
    }
  }
</style>