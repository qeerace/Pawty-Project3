import Vue from "vue";
import VueDisqus from "vue-disqus";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import lineClamp from "vue-line-clamp";
import { firebaseConfig } from "../firebase.config";
import VueAxios from "vue-axios";
import UUID from "vue-uuid";
import VueQRCodeComponent from "vue-qrcode-component";

let app = "";
var SocialSharing = require("vue-social-sharing");

Vue.config.productionTip = false;
Vue.use(VueDisqus);
Vue.use(SocialSharing);
Vue.use(lineClamp, { importCss: true });
Vue.use(VueAxios, axios);
Vue.use(UUID);
Vue.component("qr-code", VueQRCodeComponent);
Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (!app) {
    Vue.config.devtools = process.env.NODE_ENV === "development";
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
      created() {
        store.dispatch("setUser", firebaseUser);
      }
    }).$mount("#app");
  }
});
