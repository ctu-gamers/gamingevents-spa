import axios from "axios";

export default {
  getRandom: async function() {
    const url = `https://api.giphy.com/v1/gifs/random?tag=pets&rating=G&api_key=${process.env.VUE_APP_GIPYH_API_KEY}`;
    const res = await axios.get(url);
    const result = res.data.data.fixed_height_downsampled_url;
    return result;
  }
};
