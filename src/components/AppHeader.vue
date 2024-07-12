<script setup>
	import { RouterLink } from 'vue-router'
</script>

<template>
	<header class="w-full p-3 flex justify-between items-center bg-neutral-700">
		<div class="flex items-center">
			<h1 class="text-white font-bold text-3xl">Tropa dos Animes</h1>

			<nav class="flex items-center gap-x-5 ml-12">
				<RouterLink to="/" class="font-semibold text-white">Home</RouterLink>
			  	<RouterLink to="/categorys" class="font-semibold text-white">Categorys</RouterLink>
			</nav>
		</div>

		<div class="space-x-3">
		  	<button class="px-5 py-1 border rounded text-white">Sign In</button>
		  	<button class="px-5 py-1 border border-neutral-900 rounded bg-neutral-800 text-white">Sign Up</button>
		</div>
	  </header>
</template>