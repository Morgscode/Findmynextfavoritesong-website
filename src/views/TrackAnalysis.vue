<template>
  <div id="track-search" class="container">
    <SingleTrack v-bind:token="token" v-bind:trackID="trackID" v-bind:artistID="artistID"/>
    <SingleTrackAnalysis v-bind:token="token" v-bind:trackID="trackID" v-bind:artistID="artistID" />
  </div>
</template>

<script>
import SingleTrack from "../components/SingleTrack.vue";
import SingleTrackAnalysis from "../components/SingleTrackAnalysis.vue";

export default {
  name: "TrackAnalysis",
  components: {
    SingleTrack,
    SingleTrackAnalysis
  },
  /**
    we'll need to grab the track ID, artistID, and token to the store
   */
  data() {
    return {
      trackID: null,
      token: null,
      artistID: null,
    };
  },
  created() {
    this.token = this.$route.query.token;
    this.trackID = this.$route.query.trackID;
    this.artistID = this.$route.query.artistID;
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
