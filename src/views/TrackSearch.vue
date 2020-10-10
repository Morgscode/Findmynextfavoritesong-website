<template>
  <div id="track-search" class="container">
    <p>track search works!</p>
    <SingleTrack v-bind:token="token" v-bind:trackID="trackID" />
    <SingleTrackAnalysis v-bind:token="token" v-bind:trackID="trackID" />
  </div>
</template>

<script>
import SingleTrack from "../components/SingleTrack.vue";
import SingleTrackAnalysis from "../components/SingleTrackAnalysis.vue";

export default {
  
  name: "TrackSearch",
  components: {
    SingleTrack,
    SingleTrackAnalysis
  },
  data() {
    return {
      trackID: null,
      token: null,
    };
  },
  created() {
    this.token = this.$route.query.token;
    this.trackID = this.$route.query.trackID;
  }
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
