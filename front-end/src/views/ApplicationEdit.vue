 
<template>
  <div id="job-edit">
    <div class="container mt-2">
      <div class="row">
        <div class="col-12">
          <h3>Alterar Projeto</h3>
          <hr />
          <b-alert variant="danger" v-if="errorMessage" show>{{errorMessage}}</b-alert>
          <ApplicationForm v-if="job" @submit="onSubmit" :data="job"></ApplicationForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApplicationForm from "./forms/ApplicationForm";
import { apiProtected } from "../services/apiService";
export default {
  components: {
    ApplicationForm
  },
  data: () => ({
    errorMessage: "",
    job: null
  }),
  methods: {
    async onSubmit(data) {
      try {
        const response = await apiProtected.patch("application/"+this.$route.params.applicationId, data);
        const application = response.data.data;
        this.$router.push(`/jobs/${application.jobId}/show`);
      } catch (error) {
        console.error(error);
        this.errorMessage = "Erro ao tentar salvar os dados.";
      }
    }
  },
  async mounted() {
    const response = await apiProtected(`application/${this.$route.params.applicationId}`);
    this.job = response.data.data;
  }
};
</script>

<style>
</style>