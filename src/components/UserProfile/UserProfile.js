import types from "./../../store/types";

export default {
  name: "user-profile",
  data: function() {
    return {
      username: ""
    };
  },
  mounted: function() {
    this.username = this.$store.getters.user.username;
  },
  computed: {
    photo: {
      get: function() {
        return this.$store.state.user.photo;
      }
    }
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
    },
    onPhotoChange: async function(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      const form = new FormData();
      form.append("photo", files[0]);

      try {
        await this.$store.dispatch(types.ACTION_UPDATEME, form);
        this.$alert("success", "Update Successfully.");
      } catch (error) {
        this.$alert("error", error.response.data.message);
      }
    }
  }
};
