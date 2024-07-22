<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()

	const nameInput  = ref(null)
	const userInput  = ref(null)
	const emailInput = ref(null)
	const passInput  = ref(null)

	
	function submit(){
		const nameValue  = nameInput.value.value
		const userValue  = userInput.value.value
		const emailValue = emailInput.value.value
		const passValue  = passInput.value.value

		axios.post('http://localhost:8080/signup', {
			name: nameValue,
			user: userValue,
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
	<h1 class="text-white text-4xl font-bold mb-10">Crie uma conta</h1>

	<div class="w-full max-w-2xl h-96 md:80 bg-neutral-700 rounded-lg shadow-xl">
		<form @submit.prevent="submit" if="loginForm" class="w-full h-full flex flex-col justify-between items-center px-3 py-4">
			<div class="w-full flex flex-col items-center gap-y-5">

				<div class="w-full flex flex-col md:flex-row items-center gap-3">

					<div class="w-full md:w-1/2">
						<label class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
							<img src="@/assets/icons/person-fill.svg">
							<input ref="nameInput" class="input" type="text" name="email" placeholder="Seu Nome" autocomplete="off" required>
						</label>
						<p ref="name_warning" v-show="false" class="opacity-0">.</p>
					</div>

					<div class="w-full md:w-1/2">
						<label class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
							<img src="@/assets/icons/envelope-fill.svg">
							<input ref="emailInput" class="input" type="text" name="email" placeholder="Seu email" autocomplete="off" required>
						</label>
						<p ref="email_warning" v-show="false" class="text-red-500 ml-2">Já existe um usuário com esse email!</p>
					</div>
				</div>

				<div class="w-full flex flex-col md:flex-row items-center gap-3">

					<div class="w-full md:w-1/2">
						<label class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
							<img src="@/assets/icons/lock-fill.svg">
							<input ref="passInput" class="input" type="password" name="password" placeholder="Sua senha" autocomplete="off" required>
						</label>
						<p ref="password_warning" v-show="false" class="text-red-500 ml-2">As senhas não coincidem!</p>
					</div>

					<div class="w-full md:w-1/2">
						<label class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
							<img src="@/assets/icons/lock-fill.svg">
							<input ref="confirmPassInput" class="input" type="password" name="password" placeholder="Confirme sua senha" autocomplete="off" required>
						</label>
						<p ref="password_warning_2" v-show="false" class="text-red-500 ml-2">As senhas não coincidem!</p>
					</div>
				</div>

				<div class="w-full flex flex-col">
					<label class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
						<img class="w-5" src="@/assets/icons/at.svg">
						<input ref="userInput" class="input" type="text" name="user" placeholder="Seu User (ex: julin_games)" autocomplete="off" required>
					</label>
					<p ref="user_warning" v-show="false" class="text-red-500 ml-2">Já existe um usuário com esse user!</p>
				</div>
			</div>

			<div class="w-full flex gap-3 justify-between items-center">
				<button class="register-button" type="submit">Registrar</button>

				<button @click="router.push({ name: 'signin' })" class="enter-button" type="button">Entrar</button>
			</div>
		</form>
	</div>
</template>

<style>
	.register-button {
		@apply w-64 px-2 py-1.5 bg-green-700 text-white text-lg font-bold rounded-lg hover:bg-green-600 transition-all
	}

	.enter-button {
		@apply px-5 py-1.5 bg-blue-700 text-white text-lg font-bold rounded-lg hover:bg-blue-600 transition-all
	}

	.input {
		@apply w-full text-white bg-transparent placeholder:text-neutral-300 outline-none
	}

	.invalid-input {
		@apply border border-red-500
	}
</style>