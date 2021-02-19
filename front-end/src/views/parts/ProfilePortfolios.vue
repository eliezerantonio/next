<template>
    <div>
            <h2>Trabalhos</h2>
    <hr />
    <b-alert variant="danger" v-if="errorMessage" show>{{errorMessage}}</b-alert>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <div class="row">
        <div class="col-12">
          <b-form-group id="input-group-title" label="Título:" label-for="input-title">
            <b-form-input
              id="input-title"
              v-model="form.title"
              placeholder="Informe o título do trabalho"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-12">
          <b-form-group id="input-group-description" label="Descrição:" label-for="text-description">
            <b-form-textarea
              id="text-description"
              v-model="form.description"
              placeholder="Descreva o trabalho..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </div>

        <div class="col-12">
          <b-form-group id="input-group-pic" label="Imagem:" label-for="text-pic">
            <b-form-file
              id="inputPic"
              v-model="form.pic"
              :state="Boolean(form.pic)"
              placeholder="Escolha uma imagem e arraste aqui..."
              browse-text="Buscar"
            ></b-form-file>
          </b-form-group>
        </div>

        <div class="col-12 text-right">
          <b-button type="reset" variant="danger" class="mr-2">Limpar</b-button>
          <b-button type="submit" variant="primary">{{form.id ? "Alterar" : "Adicionar"}}</b-button>
        </div>
      </div>
    </b-form>
    <h4 class="mt-3">Lista de Trabalhos</h4>
    <hr />
    <div v-if="portfolios">
      <b-card
        v-for="portfolio in portfolios"
        :key="portfolio.id"
        :title="portfolio.title"
        :img-src="getPortfolioPic(portfolio)"
        :img-alt="portfolio.title"
         style="max-width: 22rem;"
        img-top
        class="mb-2"
      >
        <b-card-text>{{portfolio.description}}</b-card-text>
        <b-button variant="primary" size="sm" @click="edit(portfolio)" class="mr-2">Editar</b-button>
        <b-button variant="danger" size="sm" @click="remove(portfolio)">Excluir</b-button>
      </b-card>
    </div>
    <p v-else class="text-muted">
      <small>Nenhum trabalho cadastrado.</small>
    </p>
  </div>
</template>
<script>
import { apiProtected } from "../../services/apiService";
export default {
  data: () => ({
    errorMessage: null,
    portfolioPic: require("@/assets/portfolio_pic.jpg"),
    form: {
      id: null,
      title: null,
      descrption: null,
      pic: null
    },
    portfolios: []
  }),
  methods: {
    async refreshPortfolios() {
      const response = await apiProtected.get(
        `/user/${this.$route.params.userId}/portfolio`
      );
      this.portfolios = response.data.data;
    },
    onReset() {
      this.clearForm();
    },
    async onSubmit() {
      try {
        if (this.form.id) {
          await this.sendUpdate();
        } else {
          await this.sendStore();
        }
        this.clearForm();
        await this.refreshPortfolios();
      } catch (error) {
        console.error(error);
        this.errorMessage = "Erro inesperado ao salvar habilidade";
      }
    },
    async sendStore() {
      const formData = this.createFormData();
      await apiProtected.post(
        `/user/${this.$route.params.userId}/portfolio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
    },
    async sendUpdate() {
      const formData = this.createFormData();
      await apiProtected.patch(
        `/user/${this.$route.params.userId}/portfolio/${this.form.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
    },
    createFormData() {
      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      if (this.form.pic) {
        formData.append("pic", this.form.pic);
      }
      return formData
    },
    clearForm() {
      this.form = {
        id: null,
        title: null,
        descrption: null,
        pic: null
      };
    },
    edit(portfolio) {
      this.form = {
        id: portfolio.id,
        title: portfolio.title,
        description: portfolio.description
      };
    },
    async remove(portfolio) {
      try {
        await apiProtected.delete(
          `/user/${this.$route.params.userId}/portfolio/${portfolio.id}`
        );
        await this.refreshPortfolios();
      } catch (error) {
        console.error(error);
        this.errorMessage = "Erro ao excluir usuário";
      }
    },
    getPortfolioPic(portfolio) {
      return portfolio && portfolio.pic != "" || portfolio.pic != null
        ? portfolio.pic
        : this.portfolioPic;
    }
  },
  async mounted() {
    this.refreshPortfolios();
  }
};
</script>

<style>
</style>