<template>
  <div v-bind:id="`audio-track-preview-${track.id}`">
    <aside
      class="audio-player"
      v-bind:id="`audio-player-id-${track.id}`"
      v-if="track.preview_url"
    >
      <audio
        class="audio-player__audio"
        v-bind:ref="`playerID-${track.id}`"
        v-bind:id="`playerID-${track.id}`"
        v-on:click="audioPlayerEvent()"
      >
        <source
          v-bind:src="track.preview_url"
          v-on:click="audioPlayerEvent()"
          type="audio/mpeg"
        />
      </audio>
      <div class="audio-player__controls">
        <div
          class="audio-player__icon-wrapper"
          v-bind:id="`play-${track.id}`"
          v-on:click="pauseSample()"
        >
          <img
            class="audio-player__icon"
            src="./../assets/play.svg"
            v-bind:alt="`play icon for ${track.name}`"
            v-on:click="playSample()"
          />
        </div>
        <div
          class="audio-player__icon-wrapper"
          v-bind:id="`pause-${track.id}`"
          v-on:click="pauseSample()"
        >
          <img
            class="audio-player__icon"
            src="./../assets/pause.svg"
            v-bind:alt="`pause icon for ${track.name}`"
          />
        </div>
        <div
          class="audio-player__icon-wrapper"
          v-bind:id="`pause-${track.id}`"
          v-on:click="toggleMute()"
        >
          <img
            class="audio-player__icon"
            v-on:click="toggleMute()"
            v-bind:alt="`mute icon for ${track.name}`"
            v-bind:src="muteIconSrc"
          />
        </div>
      </div>
    </aside>
    <div class="no-audio-preview-message" v-else>
      There is no audio preview available for {{ track.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  props: {
    track: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      domRef: null,
      muteIconSrc: "../assets/mute.svg",
    };
  },
  created() {},
  mounted() {
    this.domRef = this.$refs[`playerID-${this.track.id}`];
  },
  methods: {
    playSample() {
      console.log();
      this.domRef.play();
    },
    pauseSample() {
      console.log();
      this.domRef.pause();
    },
    toggleMute() {
      if (!this.domRef.muted) {
        this.domRef.muted = true;
        this.muteIconSrc = "./../assets/unmute.svg";
      } else {
        this.domRef.muted = false;
        this.muteIconSrc = "./../assets/mute.svg";
      }
    },
  },
};
</script>

<style>
.audio-player__controls {
  display: grid;
  grid-template-columns: auto auto auto;
  margin-bottom: 3rem;
}
.audio-player__icon-wrapper {
  padding: 1rem;
  transition: background-color 0.6s ease;
  display: grid;
  align-content: center;
  justify-items: center;
}
.audio-player__icon-wrapper:hover {
  background-color: var(--darkBG1);
}
.audio-player__icon {
  max-width: 40px;
  max-height: 40px;
  opacity: 0.75;
}
.no-audio-preview-message {
  margin-bottom: 3rem;
}
</style>