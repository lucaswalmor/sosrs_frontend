<template>
    <div id="instituicao">
        <div class="row text-center">
            <h2>Cadastrar instituição</h2>
        </div>
        <Stepper v-model:activeStep="active">
            <StepperPanel>
                <template #header="{ index, clickCallback }">
                    <button class="bg-transparent border-none inline-flex flex-column gap-2" @click="clickCallback" :disabled="isLoading">
                        <span :class="['border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center', { 'bg-primary border-primary': index <= active, 'surface-border': index > active }]">
                            <i class="pi pi-building-columns" />
                        </span>
                    </button>
                </template>
                <template #content="{ nextCallback }">
                    <div class="row text-center">
                        <h4>Dados da instiuição</h4>
                    </div>

                    <div class="row">
                        <div id="instituicao" class="row flex-column justify-content-center align-items-center">
                            <div class="col-md-4 mt-3">
                                <label for="" class="form-label">Tipo de Instituição <span class="text-danger">*</span></label>
                                <Dropdown v-model="dados.tipo_insituicao" :options="['ONG', 'Abrigo', 'Outros']" placeholder="Selecione" class="w-full" />
                            </div>

                            <div class="col-md-4 mt-3">
                                <label for="" class="form-label">Nome da instituição <span class="text-danger">*</span></label>
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-building-columns"> </InputIcon>
                                    <InputText :readonly="isLoading" v-model="dados.nome_instituicao" placeholder="Nome da instituição" class="w-full" />
                                </IconField>
                            </div>

                            <div class="col-md-4 mt-3">
                                <label for="" class="form-label">Responsável da instituição <span class="text-danger">*</span></label>
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-user"> </InputIcon>
                                    <InputText :readonly="isLoading" v-model="dados.responsavel" placeholder="Nome do responsável" class="w-full" />
                                </IconField>
                            </div>

                            <div class="col-md-4 mt-3">
                                <label for="" class="form-label">Instagram da instituição <span class="text-danger">*</span></label>
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-instagram"> </InputIcon>
                                    <InputText :readonly="isLoading" v-model="dados.instagram" placeholder="@instagram" class="w-full" />
                                </IconField>
                            </div>

                            <div class="col-md-4 mt-3">
                                <label for="" class="form-label">Whatsapp da instituição <span class="text-danger">*</span></label>
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-whatsapp"> </InputIcon>
                                    <InputText :readonly="isLoading" v-model="dados.whatsapp" placeholder="(00) 00000-0000" v-mask="'(##) #####-####'" class="w-full" />
                                </IconField>
                            </div>

                            <div class="col-md-4 mt-3">
                                <label for="" class="form-label">Email da instituição <span class="text-danger">*</span></label>
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-envelope"> </InputIcon>
                                    <InputText :readonly="isLoading" v-model="dados.email" placeholder="exemplo@gmail.com" class="w-full" />
                                </IconField>
                            </div>

                            <div class="col-md-4 mt-3">
                                <label for="imagem" class="form-label">Logo da instituição:</label>
                                <input type="file" class="form-control" id="imagem" ref="imagem" accept="image/*">
                            </div>
                        </div>
                    </div>
                    <div class="flex pt-4 justify-content-end flex-wrap">
                        <Button class="mt-2" label="Próximo" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                    </div>
                </template>
            </StepperPanel>

            <StepperPanel>
                <template #header="{ index, clickCallback }">
                    <button class="bg-transparent border-none inline-flex flex-column gap-2" @click="clickCallback" :disabled="isLoading">
                        <span :class="['border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center', { 'bg-primary border-primary': index <= active, 'surface-border': index > active }]">
                            <i class="pi pi-users" />
                        </span>
                    </button>
                </template>
                <template #content="{ prevCallback, nextCallback }">
                    <div class="row text-center">
                        <h4>Usuário</h4>
                    </div>
                    
                    <div class="row justify-content-center align-items-center flex-column">
                        <div class="col-md-4 mt-3">
                            <label for="" class="form-label">Nome <span class="text-danger">*</span></label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-user"> </InputIcon>
                                <InputText :readonly="isLoading" id="input" v-model="dados.usuario.nome" type="text" placeholder="Nome" class="w-full" />
                            </IconField>
                        </div>

                        <div class="col-md-4 mt-3">
                            <label for="" class="form-label">Email <span class="text-danger">*</span></label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-envelope"> </InputIcon>
                                <InputText :readonly="isLoading" id="email" v-model="dados.usuario.email" type="email" placeholder="Email" class="w-full" />
                            </IconField>
                        </div>

                        <div class="col-md-4 mt-3">
                            <label for="" class="form-label">Telefone <span class="text-danger">*</span></label>
                            <IconField iconPosition="left">
                                <InputIcon class="pi pi-phone"> </InputIcon>
                                <InputText :readonly="isLoading" v-model="dados.usuario.telefone" placeholder="(00) 00000-0000" v-mask="'(##) #####-####'" class="w-full" />
                            </IconField>
                        </div>

                        <div class="col-md-4 mt-3 field p-fluid">
                            <label for="" class="form-label">Senha de acesso <span class="text-danger">*</span></label>
                            <Password v-model="dados.usuario.password" toggleMask placeholder="Senha" />
                        </div>
                    </div>

                    <div class="flex pt-4 justify-content-between flex-wrap">
                        <Button class="mt-2" label="Voltar" raised severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                        <Button class="mt-2" label="Próximo" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                    </div>
                </template>
            </StepperPanel>

            <StepperPanel>
                <template #header="{ index, clickCallback }">
                    <button class="bg-transparent border-none inline-flex flex-column gap-2" @click="clickCallback" :disabled="isLoading">
                        <span :class="['border-round border-2 w-3rem h-3rem inline-flex align-items-center justify-content-center', { 'bg-primary border-primary': index <= active, 'surface-border': index > active }]">
                            <i class="pi pi-id-card" />
                        </span>
                    </button>
                </template>
                <template #content="{ prevCallback }">
                    <div class="row text-center">
                        <h4>Endereço</h4>
                    </div>

                    <div class="row justify-content-center align-items-center flex-column">
                        <div class="col-md-4 mt-3">
                            <label for="cep">CEP <span class="text-danger">*</span></label>
                            <InputText :readonly="isLoading" type="text" v-model="dados.cep" class="w-full" placeholder="00000-000" v-mask="'#####-###'" />
                        </div>
                        
                        <div class="col-md-4 mt-3">
                            <label for="cep">Estado <span class="text-danger">*</span></label>
                            <InputText :readonly="isLoading" type="text" v-model="dados.estado" class="w-full" placeholder="Estado da instituição" />
                        </div>

                        <div class="col-md-4 mt-3">
                            <label for="cep">Cidade <span class="text-danger">*</span></label>
                            <InputText :readonly="isLoading" type="text" v-model="dados.cidade" class="w-full" placeholder="Cidade da instituição" />
                        </div>
                        
                        <div class="col-md-4 mt-3">
                            <label for="cep">Bairro <span class="text-danger">*</span></label>
                            <InputText :readonly="isLoading" type="text" v-model="dados.bairro" class="w-full" placeholder="Bairro da instituição" />
                        </div>
                        
                        <div class="col-md-4 mt-3">
                            <label for="cep">Rua <span class="text-danger">*</span></label>
                            <InputText :readonly="isLoading" type="text" v-model="dados.rua" class="w-full" placeholder="Rua da instituição" />
                        </div>
                        
                        <div class="col-md-4 mt-3">
                            <label for="cep">Número <span class="text-danger">*</span></label>
                            <InputText :readonly="isLoading" type="text" v-model="dados.numero" class="w-full" v-mask="'#####'" placeholder="Número da instituição" />
                        </div>
                        
                        <div class="col-md-4 mt-3">
                            <label for="cep">Complemento</label>
                            <InputText :readonly="isLoading" type="text" v-model="dados.complemento" class="w-full" placeholder="Complemento da instituição" />
                        </div>
                    </div>

                    <div class="flex pt-4 justify-content-between flex-wrap">
                        <Button class="mt-2" label="Voltar" raised severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" :disabled="isLoading" />

                        <Button class="mt-2 rounded d-flex justify-content-center" @click="salvarCadastro" outlined >
                           <ProgressSpinner v-if="isLoading" style="width: 20px; height: 20px" :disabled="isLoading" />
                           <span v-else>Finalizar Cadastro</span>
                        </Button>
                    </div>
                </template>
            </StepperPanel>
        </Stepper>

        <Toast />
    </div>
</template>

<script>
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Toast from 'primevue/toast';

export default {
    components: {
        Stepper,
        StepperPanel,
        Button,
        Dropdown,
        RadioButton,
        IconField,
        InputIcon,
        InputText,
        Password,
        Toast,
    },
    data() {
        return {
            active: 0,
            isLoading: false,
            dados: {
                tipo_insituicao: '',
                nome_instituicao: '',
                responsavel: '',
                instagram: '',
                whatsapp: '',
                email: '',
                usuario: {
                    nome: '',
                    email: '',
                    telefone: '',
                    password: '',
                },
                cep: '',
                estado: '',
                cidade: '',
                bairro: '',
                rua: '',
                numero: '',
                complemento: '',
            },
        }
    },
    methods: {
        salvarCadastro() {
            this.isLoading = true;

            // Crie um novo objeto FormData
            const formData = new FormData();

            // Adicione os dados do formulário ao objeto FormData
            formData.append('nome_instituicao', this.dados.nome_instituicao);
            formData.append('tipo_insituicao', this.dados.tipo_insituicao);
            formData.append('responsavel', this.dados.responsavel);
            formData.append('instagram', this.dados.instagram);
            formData.append('whatsapp', this.dados.whatsapp);
            formData.append('email', this.dados.email);
            formData.append('usuario[nome]', this.dados.usuario.nome);
            formData.append('usuario[email]', this.dados.usuario.email);
            formData.append('usuario[telefone]', this.dados.usuario.telefone);
            formData.append('usuario[password]', this.dados.usuario.password);
            formData.append('cep', this.dados.cep);
            formData.append('estado', this.dados.estado);
            formData.append('cidade', this.dados.cidade);
            formData.append('bairro', this.dados.bairro);
            formData.append('rua', this.dados.rua);
            formData.append('numero', this.dados.numero);
            formData.append('complemento', this.dados.complemento);

            // Adicione a imagem ao objeto FormData
            formData.append('imagem', this.$refs.imagem.files[0]);

            // Faça a solicitação POST usando o objeto FormData
            this.axios.post('/cadastro', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                if (res.status == 200) {
                    this.$swal({
                        title: res.data.success,
                        icon: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#5FB961",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Deseja fazer o login?"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$router.push('/login')
                        }
                    });
                    
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
    },
    watch: {
        'dados.cep'(newValue) {
            var cep = newValue.replace(/\D/g, "");

            if (cep != "") {
            var validacep = /^[0-9]{8}$/;

            if(validacep.test(cep) && cep.length > 7) {
                this.axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
                    this.dados.rua = res.data.logradouro;
                    this.dados.bairro = res.data.bairro;
                    this.dados.cidade = res.data.localidade;
                    this.dados.estado = res.data.uf;
                });
            }
            }
        },
    },
}
</script>

<style>

</style>