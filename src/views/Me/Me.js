export default {
  name: "me",
  computed: {
    isAdmin: {
      get: function() {
        return this.$store.state.user.role === "admin";
      }
    }
  },
  beforeRouteUpdate: function(from, to, next) {
    next();
  }
};
