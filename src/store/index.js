import Vue from "vue";
import Vuex from "vuex";
import types from "./types";
import backend from "./../api/backend";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken: undefined,
    user: undefined
  },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [types.MUTATION_SET_USER_TOKEN](state, payload) {
      state.userToken = payload;
    },
    [types.MUTATION_SET_USER](state, payload) {
      state.user = payload;
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.userToken !== undefined;
    }
  },
  actions: {
    async [types.ACTION_AUTHENTICATE]({ commit }, payload) {
      console.log(payload);
      const res = await backend.login(payload.emailAddress, payload.password);
      const userToken = res.data.token;
      commit(types.MUTATION_SET_USER_TOKEN, userToken);
      localStorage.setItem("jwt", userToken);
    },
    async [types.ACTION_FETCH_USER]({ commit }) {
      const resUser = await backend.getMe();
      const user = resUser.data.data;
      commit(types.MUTATION_SET_USER, user);
    }
  },
  modules: {}
});
