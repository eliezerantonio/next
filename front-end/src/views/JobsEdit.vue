 
<template>
  <div id="job-edit">
    <div class="container mt-2">
      <div class="row">
        <div class="col-12">
          <h3>Alterar Projeto</h3>
          <hr />
          <b-alert variant="danger" v-if="errorMessage" show>{{errorMessage}}</b-alert>
          <JobForm v-if="job" @submit="onSubmit" :data="job"></JobForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JobForm from "./forms/JobForm";
import { apiProtected } from "../services/apiService";
export default {
  components: {
    JobForm
  },
  data: () => ({
    errorMessage: "",
    job: null
  }),
  methods: {
    async onSubmit(data) {
      try {
        const response = await apiProtected.patch("job/"+this.$route.params.id, data);
        const job = response.data.data;
        this.$router.push(`/jobs/${job.id}/show`);
      } catch (error) {
        console.error(error);
        this.errorMessage = "Erro ao tentar salvar os dados.";
      }
    }
  },
  async mounted() {
    const response = await apiProtected(`job/${this.$route.params.id}`);
    this.job = response.data.data;
  }
};
</script>

<style>
</style>