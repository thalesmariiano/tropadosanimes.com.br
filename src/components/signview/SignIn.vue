<script setup>
	import { ref } from 'vue'
	
	const emailInput = ref(null)
	const passInput  = ref(null)
	
	function submit(){
		const emailValue = emailInput.value.value
		const passValue  = passInput.value.value

		axios.post('http://localhost:8080/signin', {
			email: emailValue,
			password: passValue    
		})
		.then(function (response) {
		    console.log(response)
		})
		.catch(function (error) {
			console.error(error)
		})
	}

</script>

<template>
	<div class="w-96 h-96 bg-neutral-600 rounded-lg">
		<form @submit.prevent="submit" action="/" method="POST" class="w-full h-full flex flex-col justify-center items-center">
			<div class="flex flex-col gap-3">
				<input ref="emailInput" class="w-64 p-2 text-white rounded-lg bg-transparent border border-neutral-300 placeholder:text-neutral-300" name="email" type="text" placeholder="Seu email" autocomplete="off" required>
				<input ref="passInput" class="w-64 p-2 text-white rounded-lg bg-transparent border border-neutral-300 placeholder:text-neutral-300" name="password" type="password" placeholder="Sua senha" autocomplete="off" required>
				<button class="w-64 p-2 bg-green-700 text-white text-lg font-bold rounded-lg hover:bg-green-600 transition-all" type="submit">Entrar</button>
			</div>

			<button class="hover:underline text-white py-2 mt-2" type="button">Esqueceu a senha?</button>

			<div class="w-80 h-[0.5px] bg-neutral-300 mt-5"></div>

			<button @click="$emit('state')" class="w-36 p-2 bg-blue-700 hover:bg-blue-600 transition-all text-white text-md font-semibold rounded-lg mt-10" type="button">Criar nova conta</button>
		</form>
	</div>
</template>