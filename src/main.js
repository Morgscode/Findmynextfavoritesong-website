import Vue from "vue";
import VueScrollTo from "vue-scrollto";
import App from "./App.vue";
import router from "./router";

Vue.use(VueScrollTo, {
  container: "body",
  duration: 1400,
  easing: "ease",
  offset: -50,
  cancellable: false,
  y: true,
});

/**
   we are going to need a store
 */

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
