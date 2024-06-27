<template>
  <div v-bind:id="`audio-track-preview-${track.id}`" v-if="track">
    <aside
      class="audio-player"
      v-bind:id="`audio-player-id-${track.id}`"
      v-if="track.preview_url"
    >
      <audio
        class="audio-player__audio"
        v-bind:ref="`playerID-${track.id}`"
        v-bind:id="`playerID-${track.id}`"
      >
        <source v-bind:src="track.preview_url" type="audio/mpeg" />
      </audio>
      <div class="audio-player__controls">
        <div
          class="audio-player--play-button audio-player__icon-wrapper"
          v-bind:id="`play-${track.id}`"
          v-on:click.stop="managePlayState()"
        >
          <img
            class="audio-player__icon"
            v-bind:src="playStateIconSrc"
            v-bind:alt="`play icon for ${track.name}`"
            v-on:click.stop="managePlayState()"
          />
        </div>
        <div class="audio-player__controls--slider" v-if="domRef">
          <div
            class="audio-player__icon-wrapper"
            v-bind:id="`pause-${track.id}`"
            v-on:click.stop="toggleMute()"
          >
            <img
              v-bind:src="muteStateToggleSrc"
              class="audio-player__icon"
              v-on:click.stop="toggleMute()"
              v-bind:alt="`mute icon for ${track.name}`"
            />
          </div>
          <div class="audio-player__slider--wrapper">
            <input
              class="slider"
              type="range"
              min="0"
              max="1"
              step="0.1"
              v-model="domRef.volume"
            />
          </div>
        </div>
      </div>
    </aside>
    <div class="no-audio-preview-message" v-else>
      There is no audio preview available for {{ track.name }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AudioPlayer",
  props: {
    track: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      domRef: null,
      isMuted: false,
      isPaused: true,
    };
  },
  computed: {
    ...mapGetters(["getCurrentSampleTrack"]),
    muteStateToggleSrc: function () {
      if (this.isMuted) {
        return require("./../assets/unmute.svg");
      } else {
        return require("./../assets/mute.svg");
      }
    },
    playStateIconSrc: function () {
      if (this.isPaused) {
        return require("./../assets/play.svg");
      } else {
        return require("./../assets/pause.svg");
      }
    },
  },
  created() {},
  mounted() {
    this.domRef = this.$refs[`playerID-${this.track.id}`];
  },
  methods: {
    ...mapMutations(["setCurrentSampleTrack"]),
    manageCurrentSampleTrack() {
      const sampleTrack = this.getCurrentSampleTrack;
      if (sampleTrack) {
        sampleTrack.pause();
        return (sampleTrack.paused = true);
      }
    },
    play() {
      const currentTrack = this.getCurrentSampleTrack;
      if (currentTrack) {
        currentTrack.pause();
      }
      this.domRef.play();
      this.isPaused = false;
      this.setCurrentSampleTrack(this.domRef);
    },
    pause() {
      this.isPaused = true;
      this.domRef.pause();
    },
    managePlayState() {
      if (this.isPaused) {
        this.play();
        this.isPaused = false;
      } else {
        this.pause();
        this.isPaused = true;
      }
    },
    toggleMute() {
      if (this.domRef.muted) {
        this.domRef.muted = false;
        this.isMuted = false;
      } else {
        this.domRef.muted = true;
        this.isMuted = true;
      }
    },
  },
};
</script>

<style>
.audio-player__controls {
  display: grid;
  grid-template-columns: auto auto;
  margin-bottom: 3rem;
}
.audio-player__controls--icons {
  display: grid;
  grid-template-columns: auto auto;
  margin-bottom: 3rem;
}
.audio-player__controls--slider {
  display: grid;
  grid-template-columns: auto auto;
}
.audio-player__slider--wrapper {
  display: grid;
  align-content: center;
  justify-items: center;
  padding: 1rem;
}
.audio-player__icon-wrapper {
  transition: background-color 0.6s ease;
  display: grid;
  align-content: center;
  justify-items: center;
  padding: 1rem;
}
.audio-player__icon-wrapper:hover,
.audio-player__icon-wrapper:active,
.audio-player__slider--wrapper:hover,
.audio-player__slider--wrapper:active {
  cursor: pointer;
  background-color: var(--darkBG1);
}

.audio-player__icon {
  width: 30px;
  height: 30px;
  opacity: 0.75;
}
.no-audio-preview-message {
  margin-bottom: 3rem;
}

@media only screen and (max-width: 576px) {
  .audio-player-controls {
    margin-bottom: 1.5rem;
  }
  .audio-player__controls--icons {
    margin-bottom: 1.5rem;
  }
}
</style>