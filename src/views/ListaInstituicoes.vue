<template>
    <div id="lista-instituicoes">
        <Header />

        <div v-if="isLoading">
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>

        <div class="container mt-4" v-else>
            <div class="col-md-12 d-flex gap-3">
                <div>
                    <router-link to="" class="text-secondary fw-bold fs-5">Instituições</router-link>
                </div>
            </div>
            
            <hr>

            <div class="d-flex gap-2 mt-3">
                <div class="card col-md-4" v-for="(instituicao, index) in instituicoes" :key="index">
                    <div class="card-header text-center fw-bold text-secondary">
                        {{ instituicao.nome }}
                    </div>
                    <div class="card-body text-center">
                        <img :src="instituicao.path_logo" alt="instituicao_logo" style="width: 200px">
                    </div>
                    <div class="card-footer text-center bg-dark text-light fw-bold cursor-pointer" @click="acessarInstituicao(instituicao)">
                        <span class="text-light">Procurar PETS aqui</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ProgressBar from 'primevue/progressbar';

export default {
    components: {
        Header,
        ProgressBar,
    },
    data() {
        return {
            instituicoes: [],
            isLoading: false,
        }
    },
    methods: {
        buscarInstituicoes() {
            this.isLoading = true;
            
            this.axios.get('instituicoes').then(res => {
                this.instituicoes = res.data;
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                this.isLoading = false;
            });
        },
        acessarInstituicao(instituicao) {
            console.log(instituicao)
            this.$router.push({path: `/encontre-seu-pet/${instituicao.nome}`});
        },
    },
    mounted() {
        this.buscarInstituicoes();
    }
}
</script>

<style>

</style>