import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Places from "@/components/Places";
import ListsPlaces from "@/components/ListsPlaces";
//import MainPage from '@/components/MainPage'
import registerPlaces from "@/components/registerPlaces";
import editPlace from "@/components/editPlace";
import LostFound from "../views/LostFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/lost-found-pets",
    name: "LostFound",
    component: LostFound
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
    path: "/petservices/edit/:id",
    name: "editPlace",
    props: true,
    component: editPlace
  },
  {
    path: "/petid",
    name: "petid",
    component: () => import("../views/Profile.vue")
  },
  {
    path: "/formuser",
    name: "formuser",
    component: () => import("../views/vFormuser.vue")
  },
  {
    path: "/formpetid",
    name: "formpetid",
    component: () => import("../views/vFormpetid.vue")
  },
  {
    path: "/petcard",
    name: "petcard",
    component: () => import("../views/vPetid.vue")
  },
  {
    path: "/formvets",
    name: "formvets",
    component: () => import("../views/VFormvet.vue")
  },
  {
    path: "/vetscard",
    name: "vetscard",
    component: () => import("../views/VVets.vue")
  },
  {
    path: "/medrecs",
    name: "medrecs",
    component: () => import("../views/VMedical.vue")
  },
  {
    path: "/formmedrec",
    name: "formmedrec",
    component: () => import("../views/VFormmedrec.vue")
  },
  {
    path: "/qrcode",
    name: "qrcode",
    component: () => import("../views/VQr.vue")
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
