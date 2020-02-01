// @ is an alias to /src
import giphy from "./../../api/giphy";
import store from "./../../store/index";

let timer;

const fetchRandomGif = async function() {
  const randomGif = await giphy.getRandom();
  store.commit("setRandomGif", randomGif);
  timer = setTimeout(async () => {
    await fetchRandomGif();
  }, 20000);
};

export default {
  name: "home",
  computed: {
    gifImage: {
      get: function() {
        return this.$store.state.randomGif;
      }
    }
  },
  mounted: async function() {
    fetchRandomGif();
  },
  beforeDestroy: function() {
    clearTimeout(timer);
  }
};
