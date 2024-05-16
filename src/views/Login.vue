<template>
   <div id="login">
      <Header />

      <div class="container mt-5">
         <div class="row justify-content-center">
            <div class="col-md-6">
               <div class="card shadow-lg">
                  <div class="card-body">
                     <div class="col-md-12 text-center p-3 mb-4">
                        <!-- <img
                           :src="require('@/assets/img/logo3_semfundo.png')"
                           style="width: 200px"
                           alt="logo"
                        /> -->
                     </div>
                     <form id="loginForm">
                        <div class="flex flex-wrap gap-3 mb-3 justify-content-center">
                           <div class="flex align-items-center">
                              <RadioButton v-model="tipo_login" inputId="telefone" name="tipo_login" value="telefone" />
                              <label for="telefone" class="ml-2">Telefone</label>
                           </div>
                           <div class="flex align-items-center">
                              <RadioButton v-model="tipo_login" inputId="ingredient2" name="tipo_login" value="email" />
                              <label for="ingredient2" class="ml-2">Email</label>
                           </div>
                        </div>
   
                        <div class="mb-3">
                           <label for="email" class="form-label">{{ tipo_login === 'telefone' ? 'Telefone' : 'Email' }}</label>
                           <div v-if="tipo_login === 'email'">
                              <InputText type="text" v-model="dadosUsuario.email" class="w-full" placeholder="exemplo@email.com" />
                           </div>
                           <div v-else>
                              <InputText type="text" v-model="dadosUsuario.telefone" v-mask="'(##) #####-####'" class="w-full" placeholder="(00) 00000-0000" />
                           </div>
   
                        </div>
   
                        <div class="mb-3">
                           <label for="password" class="form-label">Senha</label>
                           <Password v-model="dadosUsuario.password" toggleMask placeholder="Senha" class="w-full" />
                        </div>
   
                        <Button class="w-full rounded d-flex justify-content-center" @click="login" outlined >
                           <ProgressSpinner v-if="isLoading" style="width: 20px; height: 20px" :disabled="isLoading" />
                           <span v-else>Login</span>
                        </Button>
                     </form>
                  </div>
               </div>
   
               <Toast />
            </div>
         </div>
      </div>
   </div>
</template>
 
<script>
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import Header from '@/components/Header.vue';

export default {
    components: {
        RadioButton,
        Button,
        ProgressSpinner,
        Password,
        InputText,
        Toast,
        Header,
    },
    data() {
        return {
            dadosUsuario: {
                email: "",
                telefone: "",
                password: "",
            },
            tipo_login: "telefone",
            isLoading: false,
        };
    },
    methods: {
        login() {
            this.isLoading = true;

            this.axios.post("/login", this.dadosUsuario).then((res) => {
               if (res.status == 200) {
                  localStorage.setItem('usuario', JSON.stringify(res.data))
                  this.$router.push('/dashboard');
               }
            }).catch((err) => {
                this.$toast.add({
                    severity: "error",
                    summary: "Erro!",
                    detail: err.response.data.error,
                    life: 3000,
                });
            }).finally(() => {
                this.isLoading = false;
            });
        },
    },
    mounted() {
        
    }
};
</script>

<style>
.p-inputtext.p-component.p-password-input {
   width: 100% !important;
}
</style>
 