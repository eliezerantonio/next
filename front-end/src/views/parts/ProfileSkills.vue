<template>
  <div class="profile">
    <h2>Habilidades</h2>
    <hr />
    <b-alert variant="danger" v-if="errorMessage" show> {{ errorMessage }}</b-alert>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <div class="row">
        <div class="col-12 col-sm-6">
          <b-form-group
            id="input-group-skill"
            label="Habilidade:"
            label-for="input-skill"
          >
            <b-form-select id="input-skill" v-model="form.skill" :options="skills">
            </b-form-select>
          </b-form-group>
        </div>
        <div class="col-12 col-sm-6">
          <b-form-group
            id="input-group-level"
            label="Habilidade:"
            label-for="input-level"
          >
            <b-form-select id="input-level" v-model="form.level" :options="levels">
            </b-form-select>
          </b-form-group>
        </div>
        <div class="col-12 text-right">
          <b-button type="submit" variant="primary">{{
            form.edit ? "Alterar" : "Adicionar"
          }}</b-button>
        </div>
      </div>
    </b-form>
    <h4 class="mt-3">Lista de Habiliddes</h4>
    <ul class="list-unstyled" v-if="userSkills">
      <li v-for="skill in userSkills" :key="skill.id">
        <div class="row">
          <div class="col-6">
            <h5>{{ skill.name }}</h5>
            <b-badge>{{ skill.levelName }}</b-badge>
          </div>
          <div class="col-6 text-right">
            <b-button variant="primary" class="mr-2" size="sm" @click="edit(skill)"
              >Editar
            </b-button>
            <b-button variant="danger" size="sm" @click="remove(skill)">Exluir </b-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { apiProtected } from "../../services/apiService";
export default {
  data: () => ({
    errorMessage: null,
    form: {
      id: null,
      skill: null,
      level: null,
    },
    skills: [],
    levels: [
      { value: 1, text: "Iniciante" },
      { value: 2, text: "Intermédiario" },
      { value: 3, text: "Avançado" },
    ],
  }),
  methods: {
    async refreshUser() {
      await this.$parent.$emit("UpdateUser");
    },
    async onSubmit() {
      try {
        if (this.form.id) {
          await this.sendUpdate();
        } else {
          await this.sendStore();
        }
        this.clearForm();
        this.refreshUser();
      } catch (error) {
        console.error(error);
        this.errorMessage = "Erro inesperado ao salvar habilidade";
      }
    },
    async sendStore() {
      await apiProtected.post(`/user/${this.$parent.user.id}/skill`, {
        skillId: this.form.skill,
        level: this.form.level,
      });
    },
    async sendUpdate() {
      await apiProtected.patch(`/user/${this.$parent.user.id}/skill/${this.form.id}`, {
        skillId: this.form.skill,
        level: this.form.level,
      });
    },
    clearForm() {
      this.form = {
        id: null,
        skill: null,
        level: null,
      };
    },
    edit(skill) {
      this.form = {
        id: skill.id,
        skill: skill.skillId,
        level: skill.level,
      };
    },
    async remove(skill){
    try {
           await apiProtected.delete(`/user/${this.$parent.user.id}/skill/${skill.id}`);

      this.refreshUser()
    } catch (error) {
      console.error(error)
        this.errorMessage = "Erro ao excluir usuário"
    }
    }
  },
  async mounted() {
    const response = await apiProtected.get("/skill");
    this.skills = response.data.data.map((skill) => ({
      value: skill.id,
      text: skill.name,
    }));
  },
  computed: {
    userSkills() {
      return this.$parent.user ? this.$parent.user.UserSkills : null;
    },
  },
};
</script>

<style lang="stylus"></style>
