// @ is an alias to /src

import types from "./../../store/types";
import routeNames from "./../../router/routeNames";
import BusyLoader from "./../../components/BusyLoader/BusyLoader.vue";

export default {
  name: "login",
  components: {
    BusyLoader
  },
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
        console.log(error);
        this.$alert("error", error.response.data.message);
      }
      this.isLogging = false;
    }
  }
};
