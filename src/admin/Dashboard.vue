<template>
    <div id="dashboard">
        <Header />

        <div class="container mt-4">
            <div class="row fw-bold text-secondary">
                <h4>Painel de admin</h4>
            </div>

            <div class="row mt-3">
                <div class="card p-4 fw-bold text-primary" @click="cadastrarPet">
                    Cadastrar um novo PET
                </div>
            </div>

            <!-- <div class="row mt-3">
                <div class="card p-4 fw-bold text-primary" @click="listaPets">
                    Ver PETS cadastrados
                </div>
            </div> -->

            <div class="row mt-4">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
    components: {
        Header,
    },
    methods: {
        cadastrarPet() {
            this.$router.push({name: 'cadastrar-pet'});
        },
        listaPets() {
            this.$router.push('/pets')
        }
    }

}
</script>

<style>

</style>