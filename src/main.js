import Vue from "vue";
import VueScrollTo from "vue-scrollto";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VueScrollTo, {
  container: "body",
  duration: 1400,
  easing: "ease",
  offset: -50,
  cancellable: false,
  y: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
