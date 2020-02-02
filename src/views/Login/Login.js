// @ is an alias to /src

import types from "./../../store/types";
import routeNames from "./../../router/routeNames";

export default {
  name: "login",
  data: function() {
    return {
      emailAddress: "",
      password: "",
      isLogging: false
    };
  },
  computed: {
    loginBtnText: {
      get: function() {
        return this.isLogging === false ? "Login" : "Logging...";
      }
    }
  },
  methods: {
    handleSubmit: async function() {
      try {
        this.isLogging = true;
        await this.$store.dispatch(types.ACTION_AUTHENTICATE, {
          emailAddress: this.emailAddress,
          password: this.password
        });
        console.log(`User successfully logged in.`);
        this.$router.push({ name: routeNames.ROUTE_HOME });
        this.$alert("success", "Login Successfully.");
      } catch (error) {
        this.$alert("error", error.response.data.message);
      }
      this.isLogging = false;
    }
  }
};
