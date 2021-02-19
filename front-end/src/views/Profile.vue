<template>
  <div class="profile">
    <div class="container-fluid mt-2">
      <div class="row">
        <div class="col-12 col-sm-4 col-md-3 mb-3">
        <ProfileCard :user="user"></ProfileCard>
         </div>
        <div class="col-12 col-sm-8 col-md-9">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {apiProtected} from '../services/apiService'
import ProfileCard from '../components/ProfileCard'
export default {
    components: {
        ProfileCard
    },
    data() {
        return {
            user: null
        }
    },
    methods: {
        async onUpdateUser() {
            const id = this.$route.params.userId
            const response = await apiProtected.get(`/user/${id}`)
            this.user = response.data.data
        }
    },
    async mounted () {
        await this.onUpdateUser()
        this.$on("UpdateUser", this.onUpdateUser)
    }
}
</script>

<style>
</style>