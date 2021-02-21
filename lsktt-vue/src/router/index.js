import Vue from 'vue'
import VueRouter from 'vue-router'
import Love from "../views/Home";
import Test from "../views/Test";
import Word from "../views/Word";
import Record from "../views/Record";

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
  },
  {
    path: '/word',
    name: 'Word',
    component: Word
  },
  {
    path: '/record',
    name: 'Record',
    component: Record
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
