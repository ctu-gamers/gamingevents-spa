import types from "./../../store/types";

export default {
  name: "user-profile",
  data: function() {
    return {
      username: ""
    };
  },
  mounted: function() {
    this.username = this.$store.state.user.username;
  },
  methods: {
    updateMe: async function() {
      try {
        await this.$store.dispatch(types.ACTION_UPDATEME, {
          username: this.username
        });
        this.$alert("success", "Update Successfully.");
      } catch (error) {
        this.$alert("error", error.response.data.message);
      }
    }
  }
};
