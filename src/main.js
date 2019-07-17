import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

// https://travishorn.com/adding-bootstrap-to-a-vue-cli-project-98c2a30e0ed0

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styleSideBar.css";
import Utils from './utils/Utils';

import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner, faAlignLeft, faYinYang } from '@fortawesome/free-solid-svg-icons'

//https://www.vuetoolbox.com/projects/vue-draggable-resizable
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

library.add(faSpinner, faAlignLeft, faYinYang)
library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
