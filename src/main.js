import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

// https://travishorn.com/adding-bootstrap-to-a-vue-cli-project-98c2a30e0ed0

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styleSideBar.css";
import store from './store/store'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
