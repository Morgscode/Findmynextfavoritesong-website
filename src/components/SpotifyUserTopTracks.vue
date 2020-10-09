<template>
  <div id="user-top-tracks">
    <div class="container" v-if="!tokenHasExpired">
      <div class="panel tracks">
        <p class="tracks__header">Your favourite tracks on Spotify right now</p>
        <div class="track" v-bind:key="track.id" v-for="track in spotifyTracks">
          <img class="track__image" v-bind:src="track.album.images[0].url" alt="An image for the current track from Spotify">
          <div class="track-artist-details">
              <p> {{ track.name}} </p>
              <p> {{ track.album.name }} </p>
              <p> {{ track.artists[0].name }} </p>
          </div>
          <div class="spotify-audio-preview" v-if="track.preview_url">
            <audio controls>
              <source v-bind:src="track.preview_url" type="audio/mpeg">
            </audio>
          </div>
          <div v-else>there is no audio preview available</div>
          <div>
            <button class="btn btn-primary" v-on:click.stop="musicSearchRedirect(track.id, token)">
              Find music similar to <span class="track__name">{{ track.name }}</span>
            </button>
          </div>
        </div>
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
    };
  },
  async created() {
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      this.spotifyUserTopTracks = await this.getSpotifyUserTopTracks();
      console.log(this.spotifyUserTopTracks);

       if (this.spotifyUserTopTracks.error) {
        this.tokenHasExpired = true;
        return;
      }

      this.spotifyTracks = this.spotifyUserTopTracks.items;

    }
  },
  methods: {
    getSpotifyUserTopTracks() {
      return this.SpotifyApiInterface.spotifyFetchRequest(
        "https://api.spotify.com/v1/me/top/tracks"
      );
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

  .track__image {
    max-width: 300px;
  }

  .track__name {
    display: inline-block;
  }

  @media  only screen and (min-width: 1201px) {
    .track {
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 1rem;
      margin-bottom: 3rem;
    }
  }

  @media only screen and (min-width: 576.1px) and (max-width: 1200px) {
    .track {
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 1rem;
    }

    .track > * {
      margin-bottom: 3rem;
    }
  }

  @media only screen and (max-width: 576px) {

    .track__image {
       max-width: 80%;
    }
  
    .track {
      grid-template-columns: repeat(1, 1fr);
    }

    .track > * {
      margin-bottom: 1.5rem;
    }
  }


</style>