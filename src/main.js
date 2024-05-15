import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// PRIMEVUE
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import '/node_modules/primeflex/primeflex.css';

// SWEETALERT
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
app.use(PrimeVue)
app.use(VueSweetalert2)
app.use(store)
app.use(router)
app.mount('#app')
