<template>
  <div class="sidebar">
      <b-card
        v-if="user"
        :title="user.name"
        :img-src="profilePic"
        :img-alt="user.name"
        img-top
        tag="article"
        class="mb-2"
        bg-variant="dark"
        text-variant="white"
      >

      <b-card-text>{{user.description}}</b-card-text>
      <hr>
      <h4 class="text-center">Habilidades</h4>
      <ul class="list-unstyled">
          <li v-for="skill in user.UserSkills" :key="skill.id">
              {{skill.name}}
              <b-badge class="float-right">{{skill.levelName}}</b-badge>
          </li>
      </ul>
      <div class="actions" v-if="isOwner">
          <hr>
          <b-button @click="()=>$router.push(`/profile/${user.id}`)" block>Meu Perfil</b-button>
          <b-button @click="()=>$router.push(`/profile/${user.id}/skills`)" block>Habilidades</b-button>
          <b-button @click="()=>$router.push(`/profile/${user.id}/portfolios`)" block>Trabalhos</b-button>
          <b-button @click="()=>$router.push(`/profile/${user.id}/pic`)" block>Alterar Foto</b-button>
      </div>

      </b-card>
  </div>
</template>

<script>
export default {
    props: {
        user: Object
    },
    computed: {
        profilePic() {
            const pic = require("@/assets/profile_pic.jpg") 
            return !this.user || !this.user.pic ? pic : this.user.pic
        },
        isOwner () {
            return parseInt(this.user.id) === parseInt(this.$store.state.user.id)
        }
    }
}
</script>

<style>
</style>