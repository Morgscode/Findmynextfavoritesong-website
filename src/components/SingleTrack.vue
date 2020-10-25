<template>
  <div id="single-track" class="panel" v-if="spotifyTrack">
    <div class="track">
      <div class="track__details">
        <img
          class="track__image"
          v-bind:src="spotifyTrack.album.images[0].url"
          alt="An image for the current track's album cover from Spotify"
        />
        <div class="track__details--text">
          <p class="track__name">{{ spotifyTrack.name }}</p>
          <p class="track__artist">{{ spotifyTrack.artists[0].name }}</p>
        </div>
      </div>
      <div class="track__options">
        <div class="spotify-audio-preview" v-if="spotifyTrack.preview_url">
          <audio controls>
            <source v-bind:src="spotifyTrack.preview_url" type="audio/mpeg" />
          </audio>
        </div>
        <div v-else>
          There is no audio preview available for {{ spotifyTrack.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SpotifyApiInterface from "./../services/SpotifyApiInterface";
export default {
  name: "SingleTrack",
  /**
    we'll need to grab the trackID and token from the store
   */
  data() {
    return {
      spotifyTrack: null,
      spotifyTrackBaseUrl: `https://api.spotify.com/v1/tracks/`,
    };
  },
  computed: {
    ...mapGetters(["getSeedTrackID", "getSpotifyAccessKey"]),
  },
  async created() {
    this.token = this.getSpotifyAccessKey;
    if (this.token) {
      this.SpotifyApiInterface = new SpotifyApiInterface(this.token);
      await this.getSpotifyTrack();
    }
  },
  methods: {
    async getSpotifyTrack() {
      this.spotifyTrack = await this.SpotifyApiInterface.spotifyGetFetchRequest(
        `${this.spotifyTrackBaseUrl}${this.getSeedTrackID}`
      );
    },
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
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 1rem;
  align-items: center;
  justify-items: center;
  font-size: 22px;
}

.track__image {
  max-width: 200px;
}

.track__options div:first-child {
  display: block;
  margin-bottom: 1rem;
}

@media only screen and (min-width: 1201px) {
  .track {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
  }
}

@media only screen and (max-width: 991px) {
  .track__details {
    grid-template-columns: auto;
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

@media only screen and (min-width: 768.1px) {
  .track__details {
    border-right: var(--border);
  }
}

@media only screen and (max-width: 768px) {
  .track__details {
    padding-bottom: 1rem;
  }

  .track {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media only screen and (max-width: 576px) {
  .track__details {
  }
}
</style>
