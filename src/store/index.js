import url from "url";

import Vue from "vue";
import Vuex from "vuex";
import types from "./types";
import backend from "./../api/backend";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken: undefined,
    user: {
      _id: "",
      username: "",
      photo: "",
      role: ""
    },
    randomGif: ""
  },
  mutations: {
    setRandomGif(state, payload) {
      state.randomGif = payload;
    },
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [types.MUTATION_SET_USER_TOKEN](state, payload) {
      state.userToken = payload;
    },
    [types.MUTATION_SET_USER](state, payload) {
      state.user.id = payload._id;
      state.user.username = payload.username;
      state.user.emailAddress = payload.email;
      state.user.photo = url.resolve(
        process.env.VUE_APP_API_BASE_URL,
        `img/users/${payload.photo}`
      );
      state.user.role = payload.role;
      console.log(state.user.photo);
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.userToken !== undefined;
    },
    user: state => {
      return { ...state.user };
    }
  },
  actions: {
    async [types.ACTION_AUTHENTICATE]({ commit }, payload) {
      const res = await backend.login(payload.emailAddress, payload.password);
      const userToken = res.data.data.token;
      const user = res.data.data.user;
      commit(types.MUTATION_SET_USER_TOKEN, userToken);
      commit(types.MUTATION_SET_USER, user);
      localStorage.setItem("jwt", userToken);
    },
    async [types.ACTION_FETCH_USER]({ commit }) {
      const resUser = await backend.getMe();
      const user = resUser.data.data;
      commit(types.MUTATION_SET_USER, user);
    },
    [types.ACTION_LOGOUT]({ commit }) {
      commit(types.MUTATION_SET_USER_TOKEN, undefined);
      commit(types.MUTATION_SET_USER, {});
      localStorage.removeItem("jwt");
    },
    async [types.ACTION_UPDATEME]({ commit }, payload) {
      const resUser = await backend.updateMe(payload);
      const user = resUser.data.data;
      commit(types.MUTATION_SET_USER, user);
    },
    async [types.ACTION_CHANGE_PASSWORD](context, payload) {
      await backend.updateMyPassword(payload.currentPassword, payload.password);
    }
  },
  modules: {},
  strict: process.env.NODE_ENV !== "production"
});
