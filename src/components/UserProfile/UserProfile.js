import types from "./../../store/types";

export default {
  name: "user-profile",
  data: function() {
    return {
      username: ""
    };
  },
  mounted: function() {
    console.log(this.$store.state.user);
    this.username = this.$store.state.user.username;
  },
  methods: {
    updateMe: async function(e) {
      e.preventDefault();
      try {
        await this.$store.dispatch(types.ACTION_UPDATEME, {
          username: this.username
        });
        alert("Update Successfully");
      } catch (error) {
        alert(error);
      }
    }
  }
};
