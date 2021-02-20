<template>
    <div id="application-new">
        <div class="container mt-2">
            <div class="row">
                <div class="col-12">
                    <h3>Nova Proposta</h3>
                    <hr>
                    <b-alert variant="danger" v-if="errorMessage" show>{{errorMessage}}</b-alert>
                    <ApplicationForm @submit="onSubmit"></ApplicationForm>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApplicationForm from './forms/ApplicationForm'
import { apiProtected } from '../services/apiService'
export default {
    components: {
        ApplicationForm
    },
    data: () => ({
        errorMessage: "" 
    }),
    methods: {
        async onSubmit(data) {
            try {
                const response = await apiProtected.post('application/', data)
                const application = response.data.data
                this.$router.push(`/jobs/${application.jobId}/show`)
            } catch (error) {
                console.error(error)
                this.errorMessage = "Erro ao tentar salvar os dados."
            }
        }
    },
}
</script>

<style>
</style>