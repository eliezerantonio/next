<template>
  <div id="dash" class="container-fluid">
    <div class="row">
      <div class="col-12">
        <JobCard v-if="job" :job="job">
          <template slot="actions">
            <b-button
              v-if="isJobsOwner"
              variant="primary"
              @click="() => $router.push(`/jobs/${job.id}/edit`)"
            >Editar</b-button>
            <b-button
              v-if="!isJobsOwner"
              variant="warning"
              @click="() => $router.push(`/jobs/${job.id}/application/new`)"
            >Enviar Proposta</b-button>
          </template>
        </JobCard>

        <h4 class="mt-3">Propostas</h4>
        <hr />
        <b-alert variant="danger" v-if="errorMessage" show>{{errorMessage}}</b-alert>
        <ApplicationCard
          v-for="application in applications"
          :key="application.id"
          :application="application"
          :selected="application.id == job.selectedApplicationId"
        >
          <template slot="actions">
            <b-button
              v-if="isJobsOwner"
              variant="warning"
              @click="selectApplication(application)"
            >Selecionar</b-button>
          </template>
        </ApplicationCard>
        <Pagination
          :pagination="pagination"
          @onPreviousClick="loadApplications"
          @onNextClick="loadApplications"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { apiProtected } from "../services/apiService";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import ApplicationCard from "../components/ApplicationCard";
export default {
  components: {
    JobCard,
    Pagination,
    ApplicationCard
  },
  data: () => ({
    job: null,
    errorMessage: null,
    pagination: {
      offset: 0,
      limit: 5,
      count: 0
    },
    applications: null
  }),
  methods: {
    async loadApplications() {
      const params = {
        jobId: this.job.id,
        offset: this.pagination.offset,
        limit: this.pagination.limit
      };
      const response = await apiProtected.get("/application", { params });
      this.applications = response.data.data;
      this.pagination = response.data.meta;
    },
    async selectApplication(application) {
      try {
        await apiProtected.patch("job/"+this.$route.params.id, {
          selectedApplicationId: application.id
        });
        this.job.selectedApplicationId = application.id
      } catch (error) {
        console.error(error);
        this.errorMessage = "Erro ao tentar selecionar proposta.";
      }
    }
  },
  async mounted() {
    const response = await apiProtected(`job/${this.$route.params.id}`);
    this.job = response.data.data;
    this.loadApplications();
  },
  computed: {
    isJobsOwner() {
      return this.job.userId == this.$store.state.user.id;
    }
  }
};
</script>

<style>
</style>