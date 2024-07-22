<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	
	const router = useRouter()

	const emailInput      = ref(null)
	const passInput       = ref(null)

	const showMessage     = ref(false)
	const responseMessage = ref(null)
	const messageElement  = ref(null)
	
	const submit = async () => {
		showMessage.value = false
		emailInput.value.classList.remove('invalid-input')
		passInput.value.classList.remove('invalid-input')

		try{
			const { data } = await axios.post('http://localhost:8080/signin', {
				email: emailInput.value.value,
				password: passInput.value.value
			})

			responseMessage.value = data.message
			showMessage.value = true
			messageElement.value.style.color = "lightgreen"

			sessionStorage.setItem('session', data.token)
			router.push({ name: 'home' })
		}catch({ response }){
			if(response.status === 401){
				responseMessage.value = response.data.message
				showMessage.value = true
				messageElement.value.style.color = ""

				emailInput.value.classList.add('invalid-input')
				passInput.value.classList.add('invalid-input')
			}else if(response.status === 500){
				console.log(response)
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
	<div class="w-96 h-96 bg-neutral-700 rounded-lg shadow-xl">
		<form @submit.prevent="submit" action="/" method="POST" class="w-full h-full flex flex-col justify-center items-center">

			<p ref="messageElement" class="text-red-500 mb-3" v-show="showMessage">{{ responseMessage }}</p>

			<div class="flex flex-col gap-3">
				<input ref="emailInput" class="input" name="email" type="text" placeholder="Seu email" autocomplete="off" required>
				<input ref="passInput" class="input" name="password" type="password" placeholder="Sua senha" autocomplete="off" required>
				<button class="w-64 p-2 bg-green-700 text-white text-lg font-bold rounded-lg hover:bg-green-600 transition-all" type="submit">Entrar</button>
			</div>

			<button class="hover:underline text-white py-2 mt-2" type="button">Esqueceu a senha?</button>

			<div class="w-80 h-[0.5px] bg-neutral-300 mt-5"></div>

			<button @click="router.push({ name: 'signup' })" class="w-36 p-2 bg-blue-700 hover:bg-blue-600 transition-all text-white text-md font-semibold rounded-lg mt-10" type="button">Criar nova conta</button>
		</form>
	</div>
</template>

<style>
	.input {
		@apply w-64 p-2 text-white rounded-lg bg-transparent border border-neutral-300 placeholder:text-neutral-300;
	}

	.invalid-input {
		@apply border border-red-500
	}
</style>