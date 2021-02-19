<template>
  <div id="register" class="container">
    <div class="row">
      <div class="col-12-8 offset-sma-2 col-md-6 offset-md-3">
        <h2>Faça seu cadastro</h2>

        <hr />

        <b-alert variant="danger" v-if="error.message" show>{{ error.message }}</b-alert>
        <b-form v-if="show" @reset.prevent="onReset()" @submit.prevent="onSubmite()">
          <!-- nome -->
          <b-form-group id="input-group-name" label="Nome" label-for="input-name">
            <b-form-input
              id="input-name"
              v-model="form.name"
              type="text"
              :state="error.name.state"
              placeholder="Informe seu nome completo"
            >
            </b-form-input>
            <b-form-invalid-feedback id="input-name-feedback"
              >{{ error.name.state }}
            </b-form-invalid-feedback>
          </b-form-group>

          <!--Email -->
          <b-form-group id="input-group-email" label="E-mail" label-for="input-email">
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
              :state="error.email.state"
              placeholder="Informe seu E-mail"
            >
            </b-form-input>
            <b-form-invalid-feedback id="input-email-feedback"
              >{{ error.email.state }}
            </b-form-invalid-feedback>
          </b-form-group>
          <!--password -->
          <b-form-group
            id="input-group-password"
            label="Senha "
            label-for="input-password"
          >
            <b-form-input
              id="input-password"
              v-model="form.password"
              type="password"
              :state="error.password.state"
              placeholder="Informe no minimo 6 caracteres "
            >
            </b-form-input>
            <b-form-invalid-feedback id="input-password-feedback"
              >{{ error.password.message }}
            </b-form-invalid-feedback>
          </b-form-group>

          <!--password confirm-->
          <b-form-group
            id="input-group-password-confirmation"
            label="Senha "
            label-for="input-password-confirmation"
          >
            <b-form-input
              id="input-password"
              v-model="form.passwordConfirmation"
              type="password"
              placeholder="Informe  a mesma senha para confirmar"
            >
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" size="lg" block>Criar conta</b-button>
          <b-button type="reset" variant="danger" size="sm" block>Limpar</b-button>

          <b-button
            @click="$router.push('login')"
            type="reset"
            variant="outline-info"
            size="sm"
            block
            >Ja tem uma conta?</b-button
          >
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPublic } from "../services/apiService";
export default {
  data: () => ({
    form: {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    },
    show: true,
    error: {
      message: null,
      name: {
        state: null,
        message: null,
      },
      email: {
        state: null,
        message: null,
      },
      password: {
        state: null,
        message: null,
      },
    },
  }),
  methods: {
    //limpar formulario
    onReset() {
      this.form = { name: null, email: null, password: null, passwordConfirmation: null };
      this.erroReset();
    },
    //limpar msm error
    erroReset() {
      this.error = {
        message: null,
        name: {
          state: null,
          message: null,
        },
        email: {
          state: null,
          message: null,
        },
        password: {
          state: null,
          message: null,
        },
      };
    },
    async onSubmite() {
      try {
        this.erroReset();
        if (this.form.passwordConfirmation != this.form.password) {
          this.error.message = "Senha de confirmacao nao confere";
          this.error.password.state = false;
          this.error.password.message =
            "Os valores informadonos campos de senha devem ser iguais";
          return;
        }

        await apiPublic.post("/user", {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        });

        //if success, redirect login page

        this.$router.push("login");
      } catch (error) {
        console.error(error);
        this.error.message = "Nao foi possivel criar a conta";
        if (!error.response || !error.response.data) return;
        if (error.response.data.message)
          this.erroReset.message = error.response.data.message;

        if (error.response.data.error) {
          this.error.response.data.error.forEach((err) => {
            this.error[err.filed].state = false;
            this.error[err.filed].message = err.message;
          });
        }
      }
    },
  },
};
</script>

<style></style>
