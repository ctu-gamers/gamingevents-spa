import types from "./../../store/types";
import routeNames from "./../../router/routeNames";

export default {
  name: "password",
  data: function() {
    return {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
      isSaving: false,
      errors: []
    };
  },
  computed: {
    saveBtnText: {
      get: function() {
        return this.isSaving ? "Saving..." : "Save password";
      }
    }
  },
  methods: {
    validate: function() {
      this.errors = [];
      if (
        this.currentPassword !== "" &&
        this.password !== "" &&
        this.currentPassword === this.password
      ) {
        this.errors.push("New password must not be equal to current password");
      }
      if (
        this.password !== "" &&
        this.passwordConfirm !== "" &&
        this.password !== this.passwordConfirm
      ) {
        this.errors.push("Confirm password must equal to new password");
      }
    },
    updatePassword: async function() {
      if (this.errors.length !== 0) {
        return;
      }
      try {
        this.isSaving = true;
        await this.$store.dispatch(types.ACTION_CHANGE_PASSWORD, {
          currentPassword: this.currentPassword,
          password: this.password
        });
        console.log("User successfully update password.");
        this.$alert("success", "Update password successfully.");
        this.$store.dispatch(types.ACTION_LOGOUT);
        this.$router.replace({ name: routeNames.ROUTE_LOGIN });
      } catch (error) {
        this.$alert("error", error.response.data.message);
      }
      this.isSaving = false;
    }
  }
};
