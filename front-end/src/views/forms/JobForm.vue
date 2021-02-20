<template>
  <b-form @submit.stop.prevent="onSubmit" @reset.prevent="onReset">
    <div class="row">
      <div class="col-12">
        <b-form-group id="input-group-titulo" label="Título:" label-for="input-title">
          <b-form-input
            id="input-title"
            v-model="$v.form.title.$model"
            type="text"
            placeholder="Título do projeto"
          ></b-form-input>
          <b-form-invalid-feedback
            :state="$v.form.title.$dirty ? !$v.form.title.$error : null"
          >Este campo deve conter pelo menos 5 caracteres.</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-12">
        <b-form-group id="input-group-description" label="Descrição:" label-for="text-description">
          <b-form-textarea
            id="text-description"
            v-model="$v.form.description.$model"
            placeholder="Descreva este trabalho..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <b-form-invalid-feedback
            :state="$v.form.description.$dirty ? !$v.form.description.$error : null"
          >Este campo deve ser informado.</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group id="input-group-titulo" label="Orçamento:" label-for="input-budget">
          <b-form-input
            id="input-budget"
            v-model="$v.form.budget.$model"
            type="number"
            placeholder="Valor estimado..."
            aria-describedby="input-budget-feedback"
          ></b-form-input>
          <b-form-invalid-feedback
            :state="$v.form.budget.$dirty ? !$v.form.budget.$error : null"
          >Este campo deve ser informado.</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group id="input-group-titulo" label="Prazo:" label-for="input-deadline">
          <b-form-input
            id="input-deadline"
            v-model="$v.form.deadline.$model"
            type="date"
            placeholder="Prazo para propostas..."
            aria-describedby="input-deadline-feedback"
          ></b-form-input>
          <b-form-invalid-feedback
            :state="$v.form.deadline.$dirty ? !$v.form.deadline.$error : null"
          >Este campo deve ser informado.</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-12">
        <b-form-group id="input-group-skills" label="Habilidades:" label-for="group-skills">
          <b-form-checkbox-group
            v-if="skills"
            id="group-skills"
            v-model="$v.form.Skills.$model"
            name="flavour-2"
            aria-describedby="group-skills-feedback"
          >
            <div class="row" v-if="skills">
              <div class="col-6 col-sm-4 col-lg-3" v-for="skill in skills" :key="skill.id">
                <b-form-checkbox :value="skill.id">{{skill.name}}</b-form-checkbox>
              </div>
            </div>
          </b-form-checkbox-group>
          <b-form-invalid-feedback
            :state="$v.form.$dirty ? !$v.form.Skills.$error : null"
          >Pelo menos uma habilidade deve ser selecionada.</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-12 text-right">
        <b-button type="reset" variant="danger">Limpar</b-button>&nbsp;
        <b-button type="submit" variant="primary">{{form.id ? "Alterar" : "Salvar"}}</b-button>
      </div>
    </div>
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { apiProtected } from "../../services/apiService";
import moment from "moment";
export default {
  mixins: [validationMixin],
  props: {
    data: Object
  },
  data: () => ({
    form: {
      title: null,
      description: null,
      budget: null,
      deadline: null,
      Skills: []
    },
    skills: []
  }),
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5)
      },
      description: {
        required
      },
      budget: {
        required
      },
      deadline: {
        required
      },
      Skills: {
        required
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;
      this.$emit("submit", {
        title: this.form.title,
        description: this.form.description,
        budget: this.form.budget,
        deadline: moment(this.form.deadline, "YYYY-MM-DD").toDate(),
        Skills: this.form.Skills
      });
    },
    onReset() {
      this.$v.$reset();
      this.form = this.data
        ? {
            title: this.data.title,
            description: this.data.description,
            budget: this.data.budget,
            deadline: moment(this.data.deadline).format("YYYY-MM-DD"),
            Skills: this.data.Skills.map(skill => skill.id)
          }
        : {
            title: null,
            description: null,
            budget: null,
            deadline: null,
            Skills: []
          };
    }
  },
  async mounted() {
    const responseSkills = await apiProtected.get("skill/");
    this.skills = responseSkills.data.data;
    this.onReset();
  }
};
</script>

<style>
</style>