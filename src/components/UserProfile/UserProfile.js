import types from "./../../store/types";

export default {
  name: "user-profile",
  data: function() {
    return {
      username: "",
      uplay: "",
      steam: "",
      psn: "",
      switchFC: "",
      xboxlive: "",
      epicGames: "",
      gog: "",
      eaOrigin: ""
    };
  },
  mounted: function() {
    this.username = this.$store.getters.user.username;
    this.uplay = this.$store.getters.user.uplay;
    this.steam = this.$store.getters.user.steam;
    this.psn = this.$store.getters.user.psn;
    this.switchFC = this.$store.getters.user.switchFC;
    this.xboxlive = this.$store.getters.user.xboxlive;
    this.epicGames = this.$store.getters.user.epicGames;
    this.gog = this.$store.getters.user.gog;
    this.eaOrigin = this.$store.getters.user.eaOrigin;
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
          username: this.username,
          uplay: this.uplay,
          steam: this.steam,
          psn: this.psn,
          switchFC: this.switchFC,
          xboxlive: this.xboxlive,
          epicGames: this.epicGames,
          gog: this.gog,
          eaOrigin: this.eaOrigin
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
