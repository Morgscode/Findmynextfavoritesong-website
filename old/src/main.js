import Vue from "vue";
import VueScrollTo from "vue-scrollto";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VueScrollTo, {
  container: "body",
  duration: 2000,
  easing: "ease",
  offset: -50,
  cancelable: false,
  y: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
