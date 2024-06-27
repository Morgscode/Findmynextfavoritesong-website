<template>
  <div id="spotify-recommendations" class="container">
    <SpotifyProfile />
    <TrackRecommendations />
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
  created() {},
};
</script>

<style></style>
