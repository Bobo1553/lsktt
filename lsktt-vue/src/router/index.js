import Vue from 'vue'
import VueRouter from 'vue-router'
import Love from "../views/Love";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Love',
    component: Love
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
