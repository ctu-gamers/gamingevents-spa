import axios from "axios";
import store from "./../store/index";

const getClient = function(attachUserToken = false) {
  let headers = {
    "X-Client-Id": process.env.VUE_APP_CLIENT_ID
  };
  if (attachUserToken) {
    if (!store.state.userToken) {
      throw Error("User not logged in.");
    } else {
      headers = {
        "X-Client-Id": process.env.VUE_APP_CLIENT_ID,
        Authorization: `Bearer ${store.state.userToken}`
      };
    }
  }

  const client = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: headers
  });
  return client;
};

export default {
  login: async function(emailAddress, password) {
    const res = await getClient().post("api/v1/users/login", {
      email: emailAddress,
      password: password
    });
    return res;
  },

  getMe: async function() {
    const res = await getClient(true).get("api/v1/users/me");
    return res;
  }
};
