<template>
  <div class="home">
    <Header />

    <div class="container-fluid p-0 mt-4">
      <Inicio />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Inicio from '@/components/Inicio.vue';

export default {
  name: 'HomeView',
  components: {
    Header,
    Inicio
  },
}
</script>

<style>
ul {
  padding-left: 0 !important;
}
</style>
