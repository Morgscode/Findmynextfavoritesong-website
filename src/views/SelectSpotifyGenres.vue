<template>
  <div id="spotify-genres" class="container">
    <SpotifyProfile />
    <SpotifyGenres />
  </div>
</template>

<script>
import SpotifyProfile from "../components/SpotifyProfile";
import SpotifyGenres from "../components/SpotifyGenres";
export default {
  name: "SelectSpotifyGenres",
  components: {
    SpotifyProfile,
    SpotifyGenres,
  },
};
</script>

<style>
</style>