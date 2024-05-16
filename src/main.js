import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// PRIMEVUE
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/aura-light-green/theme.css';
import '/node_modules/primeflex/primeflex.css';
import 'primeicons/primeicons.css'

// SWEETALERT
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// VUE THE MASK
import VueTheMask from 'vue-the-mask'

// AXIOS
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

const app = createApp(App)
app.config.globalProperties.axios = axiosInstance;
app.use(PrimeVue, {
    locale: {
        dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sá'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar',
    }
});
app.use(ToastService);
app.use(VueSweetalert2)
app.use(VueTheMask)
app.use(store)
app.use(router)
app.mount('#app')
