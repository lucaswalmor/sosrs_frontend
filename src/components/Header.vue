<template>
    <div id="header">
        <div class="">
            <Menubar :model="items" />
        </div>
    </div>
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
    components: {
        Menubar,
    },
    data() {
        return {
            items: [
                {
                    label: 'Início',
                    icon: 'pi pi-home',
                    command: () => {
                        this.$router.push('/')
                    }
                },
                {
                    label: 'Encontre seu pet',
                    icon: 'fa-solid fa-paw',
                    command: () => {
                        this.$router.push('/encontre-seu-pet')
                    },
                },
                {
                    label: 'Cadastre sua instituição',
                    icon: 'pi pi-building',
                    command: () => {
                        this.$router.push('/cadastro')
                    },
                },
                {
                    label: 'Login',
                    icon: 'pi pi-sign-in',
                    command: () => {
                        this.$router.push('/login')
                    },
                },
            ]
        }
    }
}
</script>

<style>
a {
    text-decoration: none !important;
}
</style>