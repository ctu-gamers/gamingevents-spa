import Vue from "vue";
import VueRouter from "vue-router";
import store from "./../store/index";
import types from "../store/types";
import Home from "../views/Home/Home.vue";
import Login from "../views/Login/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const localJwt = localStorage.getItem("jwt");
  if (!store.state.userToken && localJwt) {
    store.commit(types.MUTATION_SET_USER_TOKEN, localJwt);
    store.dispatch(types.ACTION_FETCH_USER);
  }
  next();
});

// prevent maunally go Login and Signup page when the user is logged in.
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/signup") {
    if (store.getters.isAuthenticated) {
      console.log(
        `Authenticated user tries to access ${to.path} and get redirected.`
      );
      return next("/");
    }
  }
  next();
});

export default router;
