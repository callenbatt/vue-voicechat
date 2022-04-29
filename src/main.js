import Vue from "vue";
import App from "./App.vue";
import { firestorePlugin } from "vuefire";
import VueRouter from "vue-router";
import VueCompositionApi from "@vue/composition-api";

Vue.use(VueCompositionApi);
Vue.use(VueRouter);
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

import HomePage from "./components/HomePage";

const router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
