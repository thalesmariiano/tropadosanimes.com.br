<script setup>
	import { ref } from 'vue'
	import { RouterLink } from 'vue-router'
	import ProfileHeader from '@/components/ProfileHeader.vue'

	const isAuth = ref(true)

</script>

<template>
	<header class="w-full px-6 py-4 flex justify-between items-center bg-neutral-700 shadow-md">
		<div class="flex items-center">
			<h1 class="text-white font-bold text-3xl">Tropa dos Animes</h1>

			<nav class="flex items-center gap-x-5 ml-12">
				<RouterLink to="/" class="font-semibold text-white hover:underline">Home</RouterLink>
			  	<RouterLink to="/categorys" class="font-semibold text-white hover:underline">Categorys</RouterLink>
			</nav>
		</div>

		<div class="flex gap-3 items-center">

			<div v-if="!isAuth" class="space-x-3">
				<RouterLink to="/signin" class="px-5 py-2 border rounded text-white hover:bg-neutral-300 hover:text-black hover:border-black transition-all">Entrar</RouterLink>
			</div>

			<ProfileHeader v-if="isAuth"/>
		</div>
	  </header>
</template>