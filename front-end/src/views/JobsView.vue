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
            </template>
          </JobCard>
          </div>

      </div>

  </div>
</template>

<script>
import JobCard from '../components/JobCard.vue'
import { apiProtected } from '../services/apiService'
export default {
  components: { JobCard },
data:()=>({
    job:null

}),
async mounted(){
    const response =await apiProtected(`job/${this.$route.params.id}`)
    this.job=response.data.data
},
computed:{
    isJobsOwner(){
        return this.job.userId==this.$store.state.user.id
    }
}
}
</script>

<style>

</style>