<script setup>
	import { ref } from 'vue'
	import SignIn from '@/components/signview/SignIn.vue'
	import SignUp from '@/components/signview/SignUp.vue'

	const signState = ref(true)

</script>

<template>
	<section class="w-full h-full flex flex-col justify-center items-center">
		<SignIn	@state="signState = false" v-if="signState" class="mt-24" />
		<SignUp @state="signState = true" v-if="!signState" class="mt-24" />
	</section>
</template>