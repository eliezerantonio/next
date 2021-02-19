<template>
  <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand @click="$router.push('/')">NEXT</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item @click="$router.push('/dashboard')">Sou Freelancer</b-nav-item>
              <b-nav-item @click="$router.push('/jobs/new')">Busco Freelancer</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item @click="$router.push('/register')" v-if="!isAuthenticated">Cadastrar-se</b-nav-item>
              <b-nav-item @click="$router.push('/login')" v-if="!isAuthenticated">Entrar</b-nav-item>
              <b-nav-item-dropdown right v-if="isAuthenticated">
                <template v-slot:button-content>
                  <em>{{username}}</em>
                </template>
                <b-dropdown-item @click="$router.push('/profile/'+userId)">Perfil</b-dropdown-item>
                <b-dropdown-item @click="logout()">Sair</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
</template>

<script>
export default {
    methods: {
        logout() {
          this.$store.dispatch('logout')
          this.$router.push('/')
        }
    },
    computed: {
      isAuthenticated() {
        return this.$store.state.authenticated
      },
      username() {
        return this.$store.state.user.name
      },
      userId() {
        return this.$store.state.user.id
      }
    }
}
</script>

<style>
</style>