<template>
  <div id="track-search" class="container">
    <SingleTrack />
    <SingleTrackAnalysis />
  </div>
</template>

<script>
import SingleTrack from "../components/SingleTrack.vue";
import SingleTrackAnalysis from "../components/SingleTrackAnalysis.vue";

export default {
  name: "TrackAnalysis",
  components: {
    SingleTrack,
    SingleTrackAnalysis,
  },
  /**
    we'll need to grab the track ID, artistID, and token to the store
   */
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped>
#home {
  display: block;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
