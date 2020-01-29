export default {
  name: "Header",
  computed: {
    isLoggedIn: {
      get: function() {
        return this.$store.state.userToken !== undefined;
      }
    }
  }
};
