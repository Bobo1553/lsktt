import Vue from 'vue'
import VueRouter from 'vue-router'
import Love from "../views/Love";
import Test from "../views/Test";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Love',
    component: Love
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
