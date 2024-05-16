<template>
    <div id="cadastrar-novo-pet">
        <div class="row">
            <div class="col-md-4 mt-3">
                <label for="nome">Nome</label>
                <InputText type="text" v-model="dados.nome" placeholder="Nome do pet" class="w-full" />
            </div>

            <div class="col-md-4 mt-3">
                <label for="porte">Porte</label>
                <Dropdown v-model="dados.porte" :options="['Grande', 'Medio', 'Pequeno']" placeholder="Selecione" class="w-full" />
            </div>

            <div class="col-md-4 mt-3">
                <label for="especie">Espécie</label>
                <Dropdown v-model="dados.especie" :options="especies" placeholder="Selecione" class="w-full" />
            </div>

            <div class="col-md-4 mt-3" v-if="dados.especie == 'Outro'">
                <label for="pelagem">Outro tipo de espécie</label>
                <InputText type="text" v-model="dados.outra_especie" placeholder="Digite a espécie do pet" class="w-full" />
            </div>

            <div class="col-md-4 mt-3">
                <label for="pelagem">Pelagem</label>
                <Dropdown v-model="dados.pelagem" :options="['Alta', 'Mádia', 'Baixa', 'Sem Pelagem']" placeholder="Selecione" class="w-full" />
            </div>

            <div class="col-md-4 mt-3">
                <label for="raca">Raça</label>
                <InputText type="text" v-model="dados.raca" placeholder="Raça do pet" class="w-full" />
            </div>

            <div class="col-md-4 mt-3">
                <label for="encontrado">Aonde o pet foi encontrado</label>
                <InputText type="text" v-model="dados.encontrado" placeholder="Aonde foi encontrado" class="w-full" />
            </div>

            <div class="col-md-4 mt-3">
                <label for="status">Status</label>
                <Dropdown v-model="dados.status" :options="['Aguardando', 'Adotado', 'Em processo de adoção']" placeholder="Selecione" class="w-full" />
            </div>

            <div class="col-md-4 mt-3">
                <label for="imagem" class="form-label">Foto do PET</label>
                <input type="file" class="form-control" id="imagem" ref="imagem" accept="image/*">
            </div>

            <div class="col-md-12 mt-3">
                <label for="encontrado">Uma breve descrição sobre o PET</label>
                <Textarea v-model="dados.descricao" rows="5" class="w-full" placeholder="Descrição do pet" />
            </div>

            <div class="col-md-12 d-flex gap-3 mt-3">
                <Button label="Voltar" severity="secondary" raised @click="$router.push('/dashboard')" />

                <Button @click="salvarCadastro" outlined>
                    <ProgressSpinner style="width: 20px; height: 20px" v-if="isLoading" />
                    <span v-else>Cadastrar PET</span>
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';

export default {
    components: {
        InputText,
        Dropdown,
        Textarea,
        Button,
        ProgressSpinner,
    },
    data() {
        return {
            dados: {
                nome: '',
                porte: '',
                especie: '',
                outra_especie: '',
                pelagem: '',
                raca: '',
                encontrado: '',
                descricao: '',
                status: '',
                encontrado: '',
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
            isLoading: false,
            usuario: JSON.parse(localStorage.getItem('usuario')).usuario
        }
    },
    methods: {
        salvarCadastro() {
            this.isLoading = true;

            // Crie um novo objeto FormData
            const formData = new FormData();

            // Adicione os dados do formulário ao objeto FormData
            formData.append('nome', this.dados.nome);
            formData.append('porte', this.dados.porte);
            formData.append('especie', this.dados.especie);
            formData.append('outra_especie', this.dados.outra_especie);
            formData.append('pelagem', this.dados.pelagem);
            formData.append('raca', this.dados.raca);
            formData.append('encontrado', this.dados.encontrado);
            formData.append('descricao', this.dados.descricao);
            formData.append('status', this.dados.status);
            formData.append('encontrado', this.dados.encontrado);

            // Adicione a imagem ao objeto FormData
            if (this.$refs.imagem.files[0] == undefined) {
                formData.append('imagem', '');
            } else {
                formData.append('imagem', this.$refs.imagem.files[0]);
            }

            // Faça a solicitação POST usando o objeto FormData
            this.axios.post(`/cadastro-pet/${this.usuario.instituicao}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.usuario.token}`
                }
            }).then(res => {
                if (res.status == 200) {
                    this.$swal({
                        position: "top-end",
                        icon: "success",
                        title: res.data.success,
                        showConfirmButton: false,
                        timer: 3500
                    });
                    
                    this.dados = {
                        nome: '',
                        porte: '',
                        especie: '',
                        outra_especie: '',
                        pelagem: '',
                        raca: '',
                        encontrado: '',
                        descricao: '',
                        status: '',
                        encontrado: '',
                    }
                    
                    this.$router.push('/dashboard')
                }
            }).catch(err => {
                this.$swal({
                    position: "top-end",
                    icon: "error",
                    title: err.response.data.error,
                    showConfirmButton: false,
                    timer: 3500
                });
            }).finally(() => {
                this.isLoading = false;
            });
        }
    }
}
</script>

<style>

</style>