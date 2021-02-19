<template>
  <div id="dash" class="container-fluid">
    <div class="row">
      <div class="col-12 col-sm-4 col-md-3 sidebar">
        <b-card title="Filtros" tag="article" class="my-2" bg-variant="dark" text-variant="white">
          <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
            <div class="row">
              <div class="col-12">
                <b-form-input
                  id="input-title"
                  v-model="filters.title"
                  type="text"
                  placeholder="Buscar pelo título"
                ></b-form-input>
              </div>
              <div class="col-12 my-3">
                <b-form-checkbox
                  id="checkbox-my-jobs"
                  v-model="filters.myJobs"
                  name="myJobs"
                  :value="true"
                  :unchecked-value="false"
                >Meus Projetos</b-form-checkbox>
              </div>
              <div class="col-12">
                <b-button type="submit" variant="primary" size="lg" block>Buscar</b-button>
                <b-button type="reset" variant="danger" size="sm" block>Limpar</b-button>
              </div>
            </div>
          </b-form>
        </b-card>
      </div>
      <div class="col-12 col-sm-8 col-md-9 lista my-2">
        <b-button
          class="float-right"
          @click="() => $router.push('./jobs/new')"
          variant="success"
        >Novo Projeto</b-button>
        <h3>Projetos</h3>
        <hr />
        <div v-if="jobs && jobs.length > 0">
          <JobCard v-for="job in jobs" :key="job.id" :job="job">
            <template slot="actions">
              <b-button variant="primary" @click="() => $router.push(`./jobs/${job.id}/show`)">Mais detalhes...</b-button>
            </template>
          </JobCard>

          <Pagination :pagination="pagination" @onPreviousClick="search" @onNextClick="search"></Pagination>
        </div>
        <div v-else>
          <span class="text-muted">Nenhum projeto encontrado...</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { apiProtected } from "../services/apiService";
import JobCard from "../components/JobCard"
import Pagination from "../components/Pagination"
export default {
  components: {
    JobCard,
    Pagination
  },
  data() {
    return {
      jobs: null,
      filters: {
        title: "",
        myJobs: false
      },
      pagination: {
        offset: 0,
        limit: 5,
        count: 0
      }
    };
  },
  methods: {
    async search() {
      try {
        this.jobs = null;
        const params = {};
        if (this.filters.title) {
          params.title = this.filters.title;
        }
        if (this.filters.myJobs) {
          params.userId = this.$store.state.user.id;
        }
        params.limit = this.pagination.limit;
        params.offset = this.pagination.offset;
        const response = await apiProtected.get("/job", {
          params
        });
        this.jobs = response.data.data;
        this.pagination = response.data.meta;
      } catch (error) {
        console.error(error);
      }
    },
  
    onSubmit() {
      this.pagination = {
        offset: 0,
        limit: 5,
        count: 0
      };
      this.search();
    },
    onReset() {
      this.filters = {
        title: "",
        myJobs: false
      };
    }
  },
  mounted() {
    this.search();
  }
};
</script>

<style>
</style>