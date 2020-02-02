import BusyLoader from "./../components/BusyLoader/BusyLoader.vue";

export default {
  install(Vue) {
    const CONSTRUCTOR = Vue.extend(BusyLoader);

    const showLoader = function() {
      const loader = new CONSTRUCTOR();
      const vm = loader.$mount();
      const main = document.querySelector("main");
      main.insertAdjacentElement("beforebegin", vm.$el);
    };
    Vue.prototype.$loader.showLoader = showLoader;
  }
};
