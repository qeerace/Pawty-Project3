import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Places from "@/components/Places";
import ListsPlaces from "@/components/ListsPlaces";
//import MainPage from '@/components/MainPage'
import registerPlaces from "@/components/registerPlaces";
import ListPlace from "@/components/home/ListPlace";
import editPlace from "@/components/editPlace";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/post",
    name: "post",
    component: () => import(/* webpackChunkName: "post" */ "../views/Post.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("../views/Detail.vue")
  },
  {
    path: "/my-posts",
    name: "mypost",
    component: () => import("../views/MyPost.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/petservices/:typePlace",
    name: "type",
    props: true,
    component: ListsPlaces
  },
  {
    path: "/petservices/place/:id",
    name: "Places",
    props: true,
    component: Places
  },
  {
    path: "/petservices/admin/register",
    name: "registerPlaces",
    props: true,
    component: registerPlaces,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/main",
    name: "ListPlace",
    props: true,
    component: ListPlace
  },
  {
    path: "/petservices/edit/:id",
    name: "editPlace",
    props: true,
    component: editPlace
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) next();
  else next();
});
export default router;
