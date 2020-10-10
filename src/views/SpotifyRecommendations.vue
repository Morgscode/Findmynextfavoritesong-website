<template>
  <div id="spotify-recommendations" class="container">
    <SpotifyProfile v-bind:token="token"/>
    <TrackRecommendations v-bind:token="token" v-bind:trackID="trackID" v-bind:artistID="artistID"/>
  </div>
</template>

<script>
import SpotifyProfile from "../components/SpotifyProfile";
import TrackRecommendations from "../components/TrackRecommendations";

export default {
  name: "SpotifyRecommendations",
  components: {
    SpotifyProfile,
    TrackRecommendations,
  },
  data() {
    return {
      token: null,
      trackID: null,
    };
  },
  created() {
    this.token = this.$route.query.token;
    this.trackID = this.$route.query.trackID;
    this.artistID = this.$route.query.artistID;
  }
};
</script>

<style></style>
