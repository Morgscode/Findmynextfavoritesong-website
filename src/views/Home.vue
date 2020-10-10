<template>
  <div id="home" class="container">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
  name: "Home",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
#home {
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
