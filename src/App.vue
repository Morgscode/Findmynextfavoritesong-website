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
  min-width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 100vh;
  font-size: 62.5%;
  background-color: #3a3a3a;
  background-image: linear-gradient(
    to bottom,
    rgba(47, 54, 64, 1),
    rgba(53, 59, 72, 1)
  );
}

#app {
  font-family: var(--body-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  min-width: 100vw;
  font-size: 1.6rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 300px;
  border: none;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease-out;
  outline: none;
  color: #fff;
  font-weight: 800;
}

.btn:hover {
  transform: translateY(-6px) scale(1);
  box-shadow: 0px 10px 20px -10px #3a3a3a;
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
  margin: 2rem;
}

.btn-alt, .btn-alt:focus, .btn-alt:active {
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

.container {
  max-width: 1300px;
  margin: auto;
}

form {
  max-width: 100%;
}

@media only screen and (max-width: 576px) {
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
}

</style>
