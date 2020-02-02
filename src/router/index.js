import Vue from "vue";
import VueRouter from "vue-router";
import store from "./../store/index";
import types from "../store/types";
import routeNames from "./routeNames";

import UserProfile from "./../components/UserProfile/UserProfile.vue";
import Password from "./../components/Password/Password.vue";
import GamingEvents from "./../components/GamingEvents/GamingEvents.vue";

import Error from "./../components/Error/Error.vue";

import Home from "../views/Home/Home.vue";
import Login from "../views/Login/Login.vue";
// import Signup from "../views/Signup/Signup.vue";
import Me from "../views/Me/Me.vue";

Vue.use(VueRouter);

// prevent anonymouse user maunally access protected routes
const protect = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    console.log(
      `Anonymouse user tries to access ${to.name} but get redirected to ${routeNames.ROUTE_LOGIN}.`
    );
    return next({ name: routeNames.ROUTE_LOGIN });
  }
  next();
};

const routes = [
  {
    path: "/",
    name: routeNames.ROUTE_HOME,
    component: Home
  },
  {
    path: "/login",
    name: routeNames.ROUTE_LOGIN,
    component: Login
  },
  // {
  //   path: "/signup",
  //   name: routeNames.ROUTE_SIGNUP,
  //   component: Signup
  // },
  {
    path: "/me",
    name: routeNames.ROUTE_ME,
    component: Me,
    beforeEnter: protect,
    redirect: { name: routeNames.ROUTE_PROFILE },
    children: [
      {
        name: routeNames.ROUTE_PROFILE,
        path: "profile",
        component: UserProfile
      },
      {
        name: routeNames.ROUTE_PASSWORD,
        path: "password",
        component: Password
      },
      {
        name: routeNames.ROUTE_EVENTS,
        path: "events",
        component: GamingEvents
      }
    ]
  },
  {
    path: "*",
    component: Error
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
  if (
    to.name === routeNames.ROUTE_LOGIN ||
    to.name === routeNames.ROUTE_SIGNUP
  ) {
    if (store.getters.isAuthenticated) {
      console.log(
        `Authenticated user tries to access ${to.name} but get redirected.`
      );
      return next({ name: routeNames.ROUTE_HOME });
    }
  }
  next();
});

export default router;
