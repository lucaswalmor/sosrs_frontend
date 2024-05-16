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

            <!-- botoes -->
            <div class="col-md-12 mt-3 d-flex flex-wrap gap-2 align-items-center">
                <Button
                    type="button"
                    icon="pi pi-filter"
                    class="rounded pt-1 pb-1"
                    label="Filtros"
                    @click="toggle"
                />
                <Button
                    type="button"
                    severity="danger"
                    icon="pi pi-filter-slash"
                    class="rounded pt-1 pb-1"
                    label="Remover Filtros"
                    @click="removerFiltro"
                    v-if="tem_filtro"
                />
            </div>

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

        <!-- overlay de menu de filtros do paciente -->
        <OverlayPanel ref="op">
            <div class="col-md-12 mt-2">
                <label for="" class="form-label">Nome</label>
                <InputText type="text" v-model="filtros.nome" class="w-full" />
            </div>

            <div class="col-md-12 mt-2">
                <label for="" class="form-label">Cidade</label>
                <Dropdown v-model="filtros.cidade" :options="cidades" filter placeholder="Sleceione" class="w-full">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex align-items-center">
                            <div>{{ slotProps.value }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <div>{{ slotProps.option }}</div>
                        </div>
                    </template>
                </Dropdown>
            </div>

            <div class="col-md-12 mt-2">
                <Button label="Filtrar" class="rounded w-full" @click="filtrar" />
            </div>
        </OverlayPanel>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ProgressBar from 'primevue/progressbar';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

export default {
    components: {
        Header,
        ProgressBar,
        Button,
        OverlayPanel,
        InputText,
        Dropdown,
    },
    data() {
        return {
            instituicoes: [],
            isLoading: false,
            tem_filtro: false,
            filtros: {
                nome: "",
                cidade: "",
            },
            estados: [],
            cidades: [],
        }
    },
    methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        },
        buscarCidades() {
            this.axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/RS/municipios`).then(res => {
                this.cidades = res.data.map(cidade => cidade.nome);
            })
        },
        buscarInstituicoes(page = 1) {
            this.isLoading = true;
            
            const parametros = `&nome=${this.filtros.nome}&cidade=${this.filtros.cidade}`;

            this.axios.get(`instituicoes?page=${page}${parametros}`).then(res => {
                this.instituicoes = res.data;
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                this.isLoading = false;
            });
        },
        filtrar() {
            this.$refs.op.hide();
            this.tem_filtro = true;
            this.buscarInstituicoes();
        },
        removerFiltro() {
            this.tem_filtro = !this.tem_filtro;
            this.filtros = {
                cidade: "",
                nome: "",
            };
            this.buscarInstituicoes();
        },
        acessarInstituicao(instituicao) {
            this.$router.push({path: `/encontre-seu-pet/${instituicao.nome}`});
        },
    },
    mounted() {
        this.buscarInstituicoes();
        this.buscarCidades();
    }
}
</script>

<style>

</style>