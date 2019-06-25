import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Group from "./views/Group.vue";
import NotFound from './views/404.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home      
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
        // () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/group",
      name: "group",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: // Group
         () => import(/* webpackChunkName: "about" */ "./views/Group.vue")
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});
