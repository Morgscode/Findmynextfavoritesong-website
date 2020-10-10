<template>
  <div id="single-track" class="panel" v-if="spotifyTrack">
    <div class="track">
     <div class="track__details">
        <img class="track__image" v-bind:src="spotifyTrack.album.images[0].url" alt="An image for the current track's album cover from Spotify">
        <div class="track__details--text">
          <p class="track__name"> {{ spotifyTrack.name }} </p>
          <p class="track__artist"> {{ spotifyTrack.artists[0].name }} </p>
        </div>
      </div>
      <div class="track__options">
        <div class="spotify-audio-preview" v-if="spotifyTrack.preview_url">
          <audio controls>
            <source v-bind:src="spotifyTrack.preview_url" type="audio/mpeg" />
          </audio>
        </div>
        <div v-else>There is no audio preview available for {{ spotifyTrack.name }} </div>
      </div>
    </div>
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
      spotifyTrack: null,
      spotifyTrackBaseUrl: `https://api.spotify.com/v1/tracks/${this.trackID}`
    };
  },
  created() {
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      this.getSpotifyTrack();
    }
  },
  methods: {
    async getSpotifyTrack() {
       this.spotifyTrack = await this.SpotifyApiInterface.spotifyFetchRequest(this.spotifyTrackBaseUrl);
    }
  },
};
</script>

<style scoped>

  #single-track {
    margin-bottom: 3rem;
  }

  .track {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
  }

  .track__details {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-items: center;
    font-size: 22px;
  }

  .track__image {
    max-width: 200px;
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

  @media only screen and (min-width: 768px) {
     .track__details {
      border-right: var(--border);
    }
  }

  @media only screen and (max-width: 768px) {

    .track__details {
      border-bottom: var(--border);
      padding-bottom: 3rem;
    }

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
