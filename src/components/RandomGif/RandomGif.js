// @ is an alias to /src
import giphy from "../../api/giphy";

let timer;

export default {
  name: "random-gif",
  data: function() {
    return {
      gifImage: ""
    };
  },
  mounted: async function() {
    const fetchRandomGif = async () => {
      this.gifImage = await giphy.getRandom();
      timer = setTimeout(async () => {
        await fetchRandomGif();
      }, 20000);
    };
    fetchRandomGif();
  },
  beforeDestroy: function() {
    clearTimeout(timer);
  }
};
