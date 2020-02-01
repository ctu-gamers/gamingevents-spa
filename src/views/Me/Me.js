export default {
  name: "me",

  beforeRouteUpdate: function(from, to, next) {
    next();
  }
};
