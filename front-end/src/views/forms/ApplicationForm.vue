<template>
  <b-form @submit.stop.prevent="onSubmit" @reset.prevent="onReset">
    <div class="row">
    
      <div class="col-12">
        <b-form-group id="input-group-description" label="Descrição:" label-for="text-description">
          <b-form-textarea
            id="text-description"
            v-model="$v.form.description.$model"
            placeholder="Descreva sua proposta..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <b-form-invalid-feedback
            :state="$v.form.description.$dirty ? !$v.form.description.$error : null"
          >Este campo deve ser informado.</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-6">
        <b-form-group id="input-group-titulo" label="Proposta:" label-for="input-budget">
          <b-form-input
            id="input-budget"
            v-model="$v.form.budget.$model"
            type="number"
            placeholder="Valor proposta..."
            aria-describedby="input-budget-feedback"
          ></b-form-input>
          <b-form-invalid-feedback
            :state="$v.form.budget.$dirty ? !$v.form.budget.$error : null"
          >Este campo deve ser informado.</b-form-invalid-feedback>
        </b-form-group>
 
     
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import moment from "moment";
export default {
  mixins: [validationMixin],
  props: {
    data: Object
  },
  data: () => ({
    form: {
      description: null,
      budget: null,
   
    },
  }),
  validations: {
    form: {
    
      description: {
        required
      },
      budget: {
        required
      },
    
    }
  },
  methods: {
    async onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;
      this.$emit("submit", {
        description: this.form.description,
        budget: this.form.budget,
     
      });
    },
    onReset() {
      this.$v.$reset();
      this.form = this.data
        ? {
            description: this.data.description,
            budget: this.data.budget,
     
          }
        : {
           
            description: null,
            budget: null,
         
          };
    }
  },

};
</script>

<style>
</style>