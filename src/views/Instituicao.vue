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

            <!-- botoes -->
            <div class="col-md-12 mt-3 d-flex flex-wrap gap-2 align-items-center mb-3">
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

            <div class="col-md-12">
                <span class="fw-bold text-purple-700">DADOS DA INSTITUIÇÃO </span>
            </div>
            <div class="col-md-12">
                <span class="fw-bold">Nome: </span> {{ instituicao.nome_instituicao }}
            </div>
            <div class="col-md-12">
                <span class="fw-bold">Instagram: </span>
                <span class="text-indigo-300 cursor-pointer" @click="linkInsta">
                    <i class="fa-brands fa-instagram"></i>
                    Enviar mensagem
                </span>
            </div>
            <div class="col-md-12">
                <span class="fw-bold">Whatsapp: </span>
                <span class="text-primary cursor-pointer" @click="linkWpp">
                    <i class="fa-brands fa-whatsapp"></i>
                    Enviar mensagem
                </span>
            </div>
            <div class="col-md-12">
                <span class="fw-bold">Email: </span>
                <span class="text-cyan-700 cursor-pointer" @click="copiarEmail">
                    <i class="fa-solid fa-envelope"></i>
                    Copiar email
                </span>
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

        <!-- overlay de menu de filtros do paciente -->
        <OverlayPanel ref="op">
            <div class="col-md-12 mt-2">
                <label for="" class="form-label">Nome</label>
                <InputText type="text" v-model="filtros.nome" class="w-full" />
            </div>

            <div class="col-md-12 mt-2">
                <label for="" class="form-label">Porte</label>
                <Dropdown v-model="filtros.porte" :options="['Grande', 'Medio', 'Pequeno']" placeholder="Selecione" class="w-full" />
            </div>
            
            <div class="col-md-12 mt-2">
                <label for="" class="form-label">Espécie</label>
                <Dropdown v-model="filtros.especie" :options="especies" placeholder="Selecione" class="w-full" />
            </div>

            <div class="col-md-12 mt-2" v-if="filtros.especie == 'Outro'">
                <label for="pelagem">Outro tipo de espécie</label>
                <InputText type="text" v-model="filtros.outra_especie" placeholder="Digite a espécie do pet" class="w-full" />
            </div>

            <div class="col-md-12 mt-2">
                <label for="" class="form-label">Pelagem</label>
                <Dropdown v-model="filtros.pelagem" :options="['Alta', 'Média', 'Baixa', 'Sem Pelagem']" placeholder="Selecione" class="w-full" />
            </div>
            
            <div class="col-md-12 mt-2">
                <label for="raca">Raça</label>
                <InputText type="text" v-model="filtros.raca" placeholder="Raça do pet" class="w-full" />
            </div>

            <div class="col-md-12 mt-2">
                <label for="status">Status</label>
                <Dropdown v-model="filtros.status" :options="['Aguardando', 'Adotado', 'Em processo de adoção']" placeholder="Selecione" class="w-full" />
            </div>

            <div class="col-md-12 mt-2">
                <Button label="Filtrar" class="rounded w-full" @click="filtrar" />
            </div>
        </OverlayPanel>

        <Toast />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ProgressBar from 'primevue/progressbar';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

export default {
    components: {
        Header,
        ProgressBar,
        Dialog,
        Tag,
        Toast,
        Button,
        OverlayPanel,
        InputText,
        Dropdown,
    },
    data() {
        return {
            isLoading: false,
            dialogPetSelecionado: false,
            tem_filtro: false,
            instituicao: {},
            pets: [],
            petSelecionado: {},
            filtros: {
                nome: "",
                especie: "",
                outra_especie: "",
                porte: "",
                pelagem: "",
                raca: "",
                status: "",
            },
            especies: [
                "Cachorro",
                "Gato",
                "Peixe",
                "Pássaro",
                "Hamster",
                "Coelho",
                "Porquinho-da-Índia",
                "Tartaruga",
                "Chinchila",
                "Jabuti",
                "Outro",
            ],
        }
    },
    methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        },
        filtrar() {
            this.$refs.op.hide();
            this.tem_filtro = true;
            this.buscarPets();
        },
        removerFiltro() {
            this.tem_filtro = !this.tem_filtro;
            this.filtros = {
                nome: "",
                especie: "",
                outra_especie: "",
                porte: "",
                pelagem: "",
                raca: "",
                status: "",
            };
            this.buscarPets();
        },
        buscarPets(page = 1) {
            this.isLoading = true;
            
            const parametros = `&nome=${this.filtros.nome}&especie=${this.filtros.especie}&porte=${this.filtros.porte}&pelagem=${this.filtros.pelagem}&raca=${this.filtros.raca}&status=${this.filtros.status}`;

            this.axios.get(`pets/${this.$route.params.nome}?page=${page}${parametros}`).then(res => {
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
        linkWpp() {
            const regex = /[^0-9]/g;

            const numero = this.instituicao.whatsapp.replace(regex, "");


            let linkWpp = `https://wa.me/55${numero}`

            window.open(linkWpp, '_blank');
        },
        linkInsta() {
            const instagram = this.instituicao.instagram.replace('@', "");

            let linkWpp = `https://www.instagram.com/${instagram}`

            window.open(linkWpp, '_blank');
        },
        copiarEmail() {
            navigator.clipboard.writeText(this.instituicao.email);
            this.$toast.add({ severity: 'success', summary: 'Copiado', detail: 'Email copiado com sucesso!', life: 3000 });
        },
    },
    mounted() {
        this.buscarPets();
    }
}
</script>

<style>
.p-menubar {
    justify-content: center;
}
</style>