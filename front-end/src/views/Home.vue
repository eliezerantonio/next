<template>
<div class="home text-center">
    <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark" header="NEXT" lead="Os melhores Desenvolvidores estão aqui!">
 
    <hr class="my-4">
        <p>
            Coloque os seus projectos de desenvolviento de software na mão de quem
            sabe o que faz.!
        </p>
        <b-button variant="primary" @click="$router.push('/register')">Mas informações</b-button>
    </b-jumbotron>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-6 pb-2">
                <b-card b-card border-variant="primary" body-text-variant="primary" text-variant="black" title=" Sou um Freelancer" sub-title="Busque um novo projecto">
                    <b-card-text>
                        Trabalhe em projectos interessantes que você realmente deseja
                        trabalhar</b-card-text>
                    <router-link to="/register" class="card-link text-white btn btn-primary">Cadastrar-se</router-link>
                </b-card>
            </div>
            <div class="col-12 col-sm-6 pb-2">
                <b-card b-card border-variant="danger" body-text-variant="danger" text-variant="black" title=" Busco Freelancer" sub-title="Cadastre o seu novo projecto">
                    <b-card-text>
                        Trabalhe em projectos interessantes que você realmente deseja
                        trabalhar</b-card-text>
                    <router-link to="/register" class="card-link text-white btn btn-danger">Cadastrar-se</router-link>
                </b-card>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Home",
};
</script>