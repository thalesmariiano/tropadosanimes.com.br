<script setup>
  import { RouterView } from 'vue-router'
  import AppHeader from '@/components/AppHeader.vue'
</script>

<template>

  <div class="w-full h-full flex flex-col">
    <AppHeader />
    <RouterView class="p-6"/>
  </div>
  
</template>