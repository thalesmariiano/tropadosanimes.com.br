<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <RouterLink to="/" class="mr-10 underline mb-10">Home</RouterLink>
  <RouterLink to="/category" class="underline mb-10">Animes categorys</RouterLink>

  <RouterView />
</template>