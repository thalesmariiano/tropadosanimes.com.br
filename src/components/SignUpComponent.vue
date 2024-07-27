<script setup>
	import { ref, onMounted } from 'vue'
	import { useRouter } from 'vue-router'
	import InputWarning from './InputWarning.vue'
	import { verifyErrorField, validateForm } from '@/utils/formUtils';

	const router = useRouter()

	const name  = ref(null)
	const user  = ref(null)
	const email = ref(null)
	const pass  = ref(null)

	const name_warning  = ref('')
	const email_warning = ref('')
	const user_warning  = ref('')
	const pass_warning  = ref('')

	const validate = validateForm()
	
	onMounted(() => {
		validate.setFields([
			{
				input: name.value,
				warning: name_warning
			},
			{
				input: email.value,
				warning: email_warning
			},
			{
				input: pass.value,
				warning: pass_warning
			},
			{
				input: user.value,
				warning: user_warning
			}
		])
	})

	
	const submiting = ref(false)
	
	function submit(){
		validate.removeErrors()

		if(validate.isEmpty()){
			validate.showError()
			return
		}
		submiting.value = true

		axios.post('http://localhost:8080/signup', {
			name: name.value.value,
			user: user.value.value,
			email: email.value.value,
			password: pass.value.value    
		})
		.then(function (response) {
			submiting.value = false
		    console.log(response)
		})
		.catch(({ response }) => {
			submiting.value = false
			if(response.status == 409){
				const isEmail = verifyErrorField('email', response.data.message)
				const isUsername = verifyErrorField('usuário', response.data.message)

				if(isEmail){
					email_warning.value = response.data.message
					email.value.parentElement.classList.add('invalid-input')
				}

				if(isUsername){
					user_warning.value = response.data.message
					user.value.parentElement.classList.add('invalid-input')
				}
			}
		})
	}

	

</script>

<template>
	<h1 class="text-white text-4xl font-bold mb-10">Crie uma conta</h1>

	<div class="w-full max-w-2xl h-[25rem] md:80 bg-neutral-700 rounded-lg shadow-xl">
		<form @submit.prevent="submit" if="loginForm" class="w-full h-full flex flex-col justify-between items-center px-3 py-4">
			<div class="w-full flex flex-col items-center gap-y-5">

				<div class="w-full flex flex-col md:flex-row items-start gap-4">

					<div class="w-full md:w-1/2 relative">
						<label>
							<span class="text-white ml-1 mb-1">Seu nome:</span>
							<div class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
								<img src="@/assets/icons/person-fill.svg">
								<input @focus="name_warning = ''" ref="name" class="input" type="text" name="name" placeholder="Ex: Cleber Alves" autocomplete="off">
							</div>
						</label>
						<InputWarning
							class="absolute top-[4.3rem] -left-1"
							:message="name_warning"
							v-show="name_warning"
						/>
					</div>

					<div class="w-full md:w-1/2 relative">
						<label>
							<span class="text-white ml-1 mb-1">Seu email:</span>
							<div class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
								<img src="@/assets/icons/envelope-fill.svg">
								<input @focus="email_warning = ''" ref="email" class="input" type="email" name="email" placeholder="Ex: cleber@alves.com" autocomplete="off">
							</div>	
						</label>
						<InputWarning
							class="absolute top-[4.3rem] -left-1"
							:message="email_warning"
							v-show="email_warning"
						/>
					</div>
				</div>

				<div class="w-full flex flex-col md:flex-row items-start gap-3">

					<div class="w-full md:w-1/2 relative">
						<label>
							<label class="text-white ml-1 mb-1">Sua senha:</label>
							<div class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
								<img src="@/assets/icons/lock-fill.svg">
								<input @focus="pass_warning = ''" ref="pass" class="input" type="password" name="password" placeholder="********" autocomplete="off">
							</div>
						</label>
						<InputWarning
							class="absolute top-[4.3rem] -left-1"
							:message="pass_warning"
							v-show="pass_warning"
						/>
					</div>

					<div class="w-full md:w-1/2 relative">
						<label>
							<label class="text-white ml-1 mb-2">Seu username:</label>
							<div class="w-full flex gap-2 items-center rounded-lg border border-neutral-300 p-2">
								<img class="w-5" src="@/assets/icons/at.svg">
								<input @focus="user_warning = ''" ref="user" class="input" type="text" name="user" placeholder="Ex: cleber_alves123" autocomplete="off">
							</div>
						</label>
						<InputWarning
							class="absolute top-[4.3rem] -left-1"
							:message="user_warning"
							v-show="user_warning"
						/>
					</div>
				</div>

			</div>

			<div class="w-full flex gap-3 justify-between items-center mt-5">
				<button class="register-button" type="submit">
					<span v-show="!submiting">Registrar</span>
					<div v-show="submiting" class="loading-circle mx-auto animate-spin my-1"></div>
				</button>

				<button @click="router.push({ name: 'signin' })" class="enter-button" type="button">Entrar</button>
			</div>
		</form>
	</div>
</template>

<style>
	.loading-circle {
		width: 20px;
		height: 20px;
		border-radius: 100%;
		border-top: 3px solid white;
		border-bottom: 3px solid cyan;
		border-left: 3px solid cyan;
		border-right: 3px solid white;
	}

	.register-button {
		@apply w-64 px-2 py-1.5 bg-green-700 text-white text-lg font-bold rounded-lg hover:bg-green-600 transition-all
	}

	.enter-button {
		@apply px-5 py-1.5 bg-blue-700 text-white text-lg font-bold rounded-lg hover:bg-blue-600 transition-all
	}

	.input {
		@apply w-full text-white bg-transparent placeholder:text-neutral-400 outline-none
	}

	.invalid-input {
		@apply border border-red-500
	}
</style>