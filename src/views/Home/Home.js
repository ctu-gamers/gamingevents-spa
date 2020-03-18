// @ is an alias to /src

import backend from "./../../api/backend";
import GameOverview from "./../../components/GameOverview/GameOverview.vue";

export default {
  name: "home",
  data: function() {
    return {
      games: []
    };
  },
  mounted: async function() {
    const res = await backend.getPopularGames();
    this.games = res.data.data;
  },
  components: {
    GameOverview
  }
};
