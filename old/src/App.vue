<template>
  <div id="app" class="container">
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  --body-font: Avenir, Helvetica, Arial, sans-serif;
  --spotify-green: #1db954;
  --green-accent: #27ae60;
  --turquoise: #1abc9c;
  --border: 2px solid var(--spotify-green);
  --darkBG1: rgba(47, 54, 64, 1);
  --darkBG2: rgba(53, 59, 72, 1);
}

*,
*::before,
*::after {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

html,
body {
  min-width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  font-size: 62.5%;
  background-color: #3a3a3a;
  background-image: linear-gradient(to bottom, var(--darkBG1), var(--darkBG2));
}

#app {
  font-family: var(--body-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  min-width: 100%;
  font-size: 1.6rem;
}

.btn {
  display: inline-block;
  min-height: 54px;
  width: 320px;
  max-width: 320px;
  padding: 12px 22px;
  border: none;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease-out;
  outline: none;
  color: #fff;
  font-weight: 800;
}

.btn a {
  text-decoration: none;
  outline: none;
  color: #fff;
  font-weight: 800;
}

.btn:disabled {
  opacity: 0.5;
}

.btn:hover {
  cursor: pointer;
  transform: translateY(-6px) scale(1);
  box-shadow: 0px 10px 20px -10px #3a3a3a;
}

.btn:disabled:hover {
  transform: none;
  box-shadow: none;
}

.btn:focus {
  outline: none;
  border: none;
}

.btn:active {
  transform: translateY(6px) scale(0.9);
  box-shadow: none;
  outline: none;
  border: none;
}

.btn-primary {
  background-color: var(--spotify-green);
}

.btn-secondary {
  background-color: var(--turquoise);
  margin: 2rem auto;
}

.btn-alt,
.btn-alt:focus,
.btn-alt:active {
  background-color: transparent;
  border: 3px solid var(--turquoise);
  margin: 2rem;
}

.panel {
  background-color: rgba(113, 128, 147, 1);
  padding: 3rem;
  max-width: 100%;
  margin: 3rem auto;
}

.panel-intro {
  margin-bottom: 3rem;
  text-align: left;
}

.container {
  max-width: 1300px;
  margin: auto;
}

form {
  max-width: 100%;
}

.tracks__header {
  font-size: 22px;
  margin-bottom: 3rem;
}

.track {
  display: grid;
  align-items: center;
  justify-items: center;
  border-bottom: var(--border);
  padding-bottom: 3rem;
  margin-top: 3rem;
}

.track__details {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
}

.track__image {
  max-width: 400px;
  margin-bottom: 3rem;
}

.track__name {
  display: inline-block;
}

.track__details .track__name {
  font-weight: 600;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--spotify-green);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--spotify-green);
  cursor: pointer;
}

.text-link {
  color: var(--green-accent);
}

@media only screen and (min-width: 1201px) {
  .track {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
  }

  .track:not(first-child) {
    margin-top: 3rem;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .track {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
  }

  .track > * {
    margin-bottom: 3rem;
  }
}

@media only screen and (max-width: 768px) {
  .track__image {
    max-width: 80%;
  }

  .track {
    grid-template-columns: repeat(1, 1fr);
  }

  .track > *:not(:last-child) {
    margin-bottom: 3rem;
  }
}

@media only screen and (max-width: 576px) {
  .track > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .btn {
    max-width: 100%;
  }

  .container {
    max-width: 100%;
  }

  .panel {
    margin: 1rem auto;
    padding: 1.5rem 1rem;
  }

  .track__image {
    margin-bottom: 1rem;
  }
}
</style>
