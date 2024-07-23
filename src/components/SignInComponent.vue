<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	
	const router = useRouter()

	const email = ref(null)
	const pass  = ref(null)

	const responseMessage = ref(null)
	const messageElement  = ref(null)
	
	const submit = async () => {
		responseMessage.value = ''
		email.value.parentElement.classList.remove('invalid-input')
		pass.value.parentElement.classList.remove('invalid-input')

		try{
			const { data } = await axios.post('http://localhost:8080/signin', {
				email: email.value.value,
				password: pass.value.value
			})

			responseMessage.value = data.message
			messageElement.value.style.color = "lightgreen"

			sessionStorage.setItem('session', data.token)
			router.push({ name: 'home' })
		}catch({ response }){
			if(response.status === 401){
				responseMessage.value = response.data.message
				messageElement.value.style.color = ""

				email.value.parentElement.classList.add('invalid-input')
				pass.value.parentElement.classList.add('invalid-input')
			}
		}
	}

	// const verifyToken = async () => {
	// 	const authSession = 'Bearer '+sessionStorage.getItem('session')

	// 	try{
	// 		const response = await axios.get('http://localhost:8080/auth', {
	// 			headers: {
	// 				"Authorization": authSession
	// 			}
	// 		})
	// 		console.log(response)
	// 	}catch(error){
	// 		console.log(response)
	// 	}
	// }

</script>

<template>
	<h1 class="text-white text-4xl font-bold mb-10">Faça login</h1>

	<div class="w-96 h-96 bg-neutral-700 rounded-lg shadow-xl">
		<form @submit.prevent="submit" id="registerForm" class="w-full h-full flex flex-col justify-center items-center">

			<p ref="messageElement" class="text-red-500 mb-3">{{ responseMessage }}</p>

			<div class="w-72 flex flex-col gap-3">
				<label class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
					<img src="@/assets/icons/envelope-fill.svg">
					<input ref="email" class="input" name="email" type="email" placeholder="Seu email" autocomplete="off" required>
				</label>
				<label class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
					<img src="@/assets/icons/lock-fill.svg">
					<input ref="pass" class="input" name="password" type="password" placeholder="Sua senha" autocomplete="off" required>
				</label>
				<button class="w-full p-2 bg-green-700 text-white text-lg font-bold rounded-lg hover:bg-green-600 transition-all mx-auto" type="submit">Entrar</button>
			</div>

			<button class="hover:underline text-white py-2 mt-2" type="button">Esqueceu a senha?</button>

			<div class="w-80 h-[0.5px] bg-neutral-300 mt-5"></div>

			<button @click="router.push({ name: 'signup' })" class="w-36 p-2 bg-blue-700 hover:bg-blue-600 transition-all text-white text-md font-semibold rounded-lg mt-10" type="button">Criar nova conta</button>
		</form>
	</div>
</template>

<style>
	.input {
		@apply w-full text-white bg-transparent placeholder:text-neutral-300 outline-none
	}

	.invalid-input {
		@apply border border-red-500
	}
</style>