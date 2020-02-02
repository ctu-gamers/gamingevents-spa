import ToastAlert from "../components/ToastAlert/ToastAlert.vue";

export default {
  install(Vue) {
    const CONSTRUCTOR = Vue.extend(ToastAlert);

    function alert(type, msg, timeout = 2000) {
      let alert = new CONSTRUCTOR();
      // prepare data
      alert.msg = msg;
      alert.type = type;
      // wire up the component with html and data
      let vm = alert.$mount();
      document
        .querySelector("body")
        .insertAdjacentElement("afterbegin", vm.$el);

      setTimeout(() => {
        vm.$el.remove();
        alert.$destroy();
      }, timeout);
    }
    Vue.prototype.$alert = alert;
  }
};
