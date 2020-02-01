import types from "../../store/types";
import routeNames from "./../../router/routeNames";

export default {
  name: "Header",
  computed: {
    isLoggedIn: {
      get: function() {
        return this.$store.state.userToken !== undefined;
      }
    }
  },
  methods: {
    onLogoutClicked: function() {
      this.$store.dispatch(types.ACTION_LOGOUT);
      console.log("User successfully logged out.");
      this.$router.push({ name: routeNames.ROUTE_HOME });
    }
  }
};
