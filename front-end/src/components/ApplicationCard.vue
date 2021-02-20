<template>
  <b-card v-if="application" :title="title" :sub-title="application.Freelancer.email" class="my-2" 
    :bg-variant="selected ? 'info' : 'light'"
    :text-variant="selected ? 'white' : 'dark'">
    <b-card-text>{{application.description}}</b-card-text>
    <div class="row">
      <div class="col-6">
        <strong>Orçamento</strong>
        {{application.budget | money}}
      </div>
      <div class="col-12 mt-2">
        <h5>Habilidades do Freelancer</h5>
        <div class="row">
          <div
            class="col-6 col-sm-4 col-lg-3"
            v-for="skill in application.Freelancer.UserSkill"
            :key="skill.id"
          >{{skill.Skill.name}}</div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <hr />
      <b-button
        variant="primary"
        v-if="isApplicationsOwner"
        @click="()=>$router.push(`/jobs/${application.jobId}/application/${application.id}/edit`)"
        class="mr-2"
      >Editar</b-button>
      <slot name="actions"></slot>
    </div>
  </b-card>
</template>

<script>
export default {
    name: "ApplicationCard",
    props: {
        application: Object,
        selected: Boolean
    },
    filters: {
        money(value) {
            return parseFloat(value).toLocaleString('pt-AO', {
                style: 'currency',
                currency: 'AOA'
            })
        },
    },
    computed: {
        title() {
            if (this.selected) {
                return this.application.Freelancer.name + " (Escolha do contratante)"
            }
            return this.application.Freelancer.name
        },
        isApplicationsOwner() {
            return this.application.userId == this.$store.state.user.id
        }
    }
};
</script>

<style>
</style>