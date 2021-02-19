<template>
  <div class="profile">
    <h2>Alterar Foto</h2>
    <hr />
    <b-alert variant="danger" v-if="errorMessage" show>{{errorMessage}}</b-alert>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <div class="row">
        <div class="col-12 mb-2">
          <b-form-file 
            id="inputPic"
            v-model="pic"
            :state="Boolean(pic)"
            placeholder="Escolha uma imagem e arraste aqui..."
            browse-text="Buscar">
          </b-form-file>
        </div>
        <div class="col-12 text-right">
          <b-button type="submit" variant="primary">Salvar</b-button>
        </div>
      </div>
    </b-form>
    <h3 class="mt-2">Imagem Atual</h3>
    <hr>
    <b-img v-if="userPic" :src="userPic" fluid alt="Imagem do perfil"></b-img>
    <p v-else class="text-muted"><small>Não possui imagem de perfil.</small></p>
  </div>
</template>

<script>
import { apiProtected } from '../../services/apiService';
export default {
  data: () => ({
    pic: [],
    errorMessage: null
  }),
  methods: {
    async refreshUser() {
      await this.$parent.$emit("UpdateUser");
    },
    async sendUpdate(){
      const formData = new FormData();
      formData.append('pic', this.pic)
      await apiProtected.patch(`/user/${this.$parent.user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    },
    async onSubmit() {
      try {
        await this.sendUpdate()
        this.pic = []
        this.refreshUser()
      } catch (error) {
        console.error(error)
        this.errorMessage = "Não foi possível alterar a sua foto de perfil."
      }
    }
  },
  computed: {
    userPic() {
      return this.$parent.user && this.$parent.user.pic ? this.$parent.user.pic : null
    }
  }
};
</script>

<style>
</style>