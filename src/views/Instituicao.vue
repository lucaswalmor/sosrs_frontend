<template>
    <div id="instituicao">
        <Header />
        
        <div v-if="isLoading">
            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
        </div>

        <div class="container mt-4" v-else>
            <div class="col-md-12 d-flex gap-3 align-items-center">
                <div>
                    <router-link to="/encontre-seu-pet" class="fw-bold fs-5">Instituições</router-link>
                </div>
                <div>
                    <span class="text-secondary">>></span>
                </div>
                <div>
                    <router-link to="" class="text-secondary fw-bold fs-5">Pets</router-link>
                </div>
            </div>
            
            <hr>

            <div class="col-md-12">
                <span class="fw-bold">Dados da instituição </span>
            </div>
            <div class="col-md-12">
                <span class="fw-bold">Nome: </span> {{ instituicao.nome_instituicao }}
            </div>
            <div class="col-md-12">
                <span class="fw-bold">Instagram: </span> {{ instituicao.instagram }}
            </div>
            <div class="col-md-12">
                <span class="fw-bold">Whatsapp: </span> {{ instituicao.whatsapp }}
            </div>
            <div class="col-md-12">
                <span class="fw-bold">Email: </span> {{ instituicao.email }}
            </div>
            <div class="col-md-12">
                <span class="fw-bold">Endereço: </span> {{ instituicao.rua }}, {{ instituicao.numero }} {{ instituicao.bairro }} {{ instituicao.cidade }}-{{ instituicao.estado }} 
            </div>

            <hr>

            <div class="d-flex gap-2 mt-3">
                <div class="card col-md-4" v-for="(pet, index) in pets" :key="index">
                    <div class="card-header text-center fw-bold text-secondary">
                        {{ pet.nome }}
                    </div>
                    <div class="card-body text-center">
                        <img :src="pet.foto" alt="instituicao_logo" style="width: 200px">
                    </div>
                    <div class="card-footer text-center bg-dark text-light fw-bold cursor-pointer" @click="verPet(pet)">
                        <span class="text-light">Informações</span>
                    </div>
                </div>
            </div>
        </div>

        <Dialog v-model:visible="dialogPetSelecionado" modal :header="petSelecionado.nome" :style="{ width: '25rem' }">
            <div class="row flex-column justify-content-center align-items-center">
                <div class="col text-center">
                    <img :src="petSelecionado.foto" alt="instituicao_logo" style="width: 200px">
                </div>
                <div class="col">
                    <div class="col-md-12 mt-2">
                        <span class="fw-bold">Nome:</span> {{ petSelecionado.nome }}
                    </div>
                    <div class="col-md-12 mt-2">
                        <span class="fw-bold">Porte:</span> {{ petSelecionado.porte }}
                    </div>
                    <div class="col-md-12 mt-2">
                        <span class="fw-bold">Pelagem:</span> {{ petSelecionado.pelagem }}
                    </div>
                    <div class="col-md-12 mt-2">
                        <span class="fw-bold">Espécie:</span> {{ petSelecionado.especie }}
                    </div>
                    <div class="col-md-12 mt-2" v-if="petSelecionado.especie == 'Outro'">
                        <span class="fw-bold">Outra espécie:</span> {{ petSelecionado.outra_especie }}
                    </div>
                    <div class="col-md-12 mt-2" v-if="petSelecionado.raca != ''">
                        <span class="fw-bold">Raça:</span> {{ petSelecionado.raca }}
                    </div>
                    <div class="col-md-12 mt-2" v-if="petSelecionado.encontrado != ''">
                        <span class="fw-bold">Aonde foi encontrado:</span> {{ petSelecionado.encontrado }}
                    </div>
                    <div class="col-md-12 mt-2" v-if="petSelecionado.descricao != ''">
                        <span class="fw-bold">Descrição:</span> {{ petSelecionado.descricao }}
                    </div>
                    <div class="col-md-12 mt-2" v-if="petSelecionado.status != ''">
                        <span class="fw-bold me-2">Status:</span> 
                        <Tag :severity="statusPetColor(petSelecionado.status)" value="Secondary">{{ petSelecionado.status }}</Tag>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ProgressBar from 'primevue/progressbar';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

export default {
    components: {
        Header,
        ProgressBar,
        Dialog,
        Tag,
    },
    data() {
        return {
            isLoading: false,
            dialogPetSelecionado: false,
            instituicao: {},
            pets: [],
            petSelecionado: {}
        }
    },
    methods: {
        buscarPets() {
            this.isLoading = true;

            this.axios.get(`pets/${this.$route.params.nome}`).then(res => {
                this.instituicao = res.data.instituicao
                this.pets = res.data.pets
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                this.isLoading = false;
            });
        },
        verPet(pet) {
            this.petSelecionado = pet;
            this.dialogPetSelecionado = true;
        },
        statusPet(status) {

        },
        statusPetColor(status) {
            var color = '';

            switch (status) {
                case 'Aguardando':
                    color = 'warning';
                    break;
                case 'Em processo de adoção':
                    color = 'info';
                    break;
                case 'Adotado':
                    color = 'success';
                    break;
            }

            return color;
        },
    },
    mounted() {
        this.buscarPets();
    }
}
</script>

<style>

</style>