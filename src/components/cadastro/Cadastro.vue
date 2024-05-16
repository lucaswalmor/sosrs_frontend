<template>
    <div id="instituicao">
        <Header />

        <div class="container">
            <FormInstituicao />
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import FormInstituicao from './FormInstituicao.vue';

export default {
    components: {
        Header,
        FormInstituicao,
    },
    data() {
        return {
        }
    }
}
</script>

<style>

</style>