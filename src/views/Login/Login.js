// @ is an alias to /src

// import backend from "./../../api/backend";
import types from "./../../store/types";

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
        await this.$store.dispatch(types.ACTION_FETCH_USER);
        console.log(`User successfully logged in.`);
        this.$router.push("/");
      } catch (error) {
        alert(error);
      }
    }
  }
};
