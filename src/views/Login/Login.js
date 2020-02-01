// @ is an alias to /src

import types from "./../../store/types";
import routeNames from "./../../router/routeNames";

export default {
  name: "login",
  data: function() {
    return {
      emailAddress: "",
      password: ""
    };
  },
  methods: {
    onLoginClicked: async function() {
      console.log(this.emailAddress);
      try {
        await this.$store.dispatch(types.ACTION_AUTHENTICATE, {
          emailAddress: this.emailAddress,
          password: this.password
        });
        console.log(`User successfully logged in.`);
        this.$router.push({ name: routeNames.ROUTE_HOME });
      } catch (error) {
        alert(error);
      }
    }
  }
};
