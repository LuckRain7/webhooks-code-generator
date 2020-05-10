/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-05-10 22:00:24
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Add",
    name: "Add",
    component: () => import(/* webpackChunkName: "Add" */ "../views/Add.vue"),
  },
  {
    path: "/New",
    name: "New",
    component: () => import(/* webpackChunkName: "New" */ "../views/New.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
