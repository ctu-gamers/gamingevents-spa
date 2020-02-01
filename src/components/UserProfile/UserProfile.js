// import backend from "./../../api/backend";
// import types from "./../../store/types";

export default {
  name: "user-profile",
  data: function() {
    return {
      username: "",
      photo: ""
    };
  },
  mounted: function() {
    console.log(this.$store.state.user);
    this.username = this.$store.state.user.username;
    this.photo = this.$store.state.user.photo;
  },
  methods: {
    updateMe: function() {
      try {
        this.$store.dispatch();
      } catch (error) {
        alert(error);
      }
    }
  }
};
