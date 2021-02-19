<template>
  <div class="profile">
    <h2>Trabalhos</h2>
    <hr />
    <b-card
      v-for="portfolio in portfolios"
      :key="portfolio.id"
      :title="portfolio.title"
      :img-src="portfolioPic(portfolio)"
       style="max-width: 30rem;"
       
      :img-alt="portfolio.title"
      img-top
      tag="article"
      
      class="mb-2"
    >
      <b-card-text>{{portfolios.description}}</b-card-text>
    </b-card>
  </div>
</template>

<script>
import { apiProtected } from "../../services/apiService";
export default {
  data: () => ({
    portfolios: []
  }),
  methods: {
    portfolioPic(portfolio) {
      const pic = require("@/assets/portfolio_pic.jpg");
      return !portfolio || !portfolio.pic ? pic : portfolio.pic;
    }
  },
  async mounted() {
    const id = this.$route.params.userId;
    const response = await apiProtected.get(`/user/${id}/portfolio`);
    this.portfolios = response.data.data;
  }
};
</script>

<style>
</style>