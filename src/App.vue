<script>
import Header from "./components/Header/Header.vue";

export default {
  name: "App",
  components: { Header }
};
</script>

<template lang="pug">
body#app
  Header
  main.main
    router-view
</template>

<style lang="scss" src="./assets/styles/main.scss"></style>
<style lang="scss">
.main {
  background-color: #f7f7f7;
  padding: 8rem 6rem;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
}
</style>
