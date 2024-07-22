<script setup>
	import { ref } from 'vue'
	import { RouterLink } from 'vue-router'

	const isOpened = ref(false)
	const caretIcon = ref(null)

	function openProfileLinks(){
		isOpened.value = !isOpened.value
		caretIcon.value.classList.toggle('rotate-180')
	}
</script>

<template>
	<div class="relative">
		<button @click="openProfileLinks" class="flex gap-3 items-center">
			<div class="w-10 h-10 rounded-full bg-cyan-200">
					
			</div>
			<p class="hidden md:block text-white">@example</p>
			<img ref="caretIcon" class="w-5 duration-300 transition-all" src="@/assets/icons/caret-down-fill.svg">
		</button>

		<Transition
			enter-active-class="animate__animated animate__fadeIn"
 			leave-active-class="animate__animated animate__fadeOut"
		>
			<div v-if="isOpened" class="absolute -bottom-[19rem] -right-2 w-44 h-72 bg-neutral-800 rounded-md shadow-lg">
				<nav class="link-container relative">
					<ul>
						<li class="border-b-[.55px] border-neutral-300 z-[999]">
							<RouterLink to="/profile" class="px-2 py-2 text-white flex gap-x-3 items-center hover:bg-neutral-900 transition-all rounded-t-md">
								<img class="w-5" src="@/assets/icons/person-fill.svg">
								Perfil
							</RouterLink>
						</li>
						<li class="border-b-[.55px] border-neutral-300 z-[999]">
							<RouterLink to="/configurations" class="px-2 py-2 text-white flex gap-x-3 items-center hover:bg-neutral-900 transition-all">
								<img class="w-5" src="@/assets/icons/gear-wide.svg">
								Configurações
							</RouterLink>
						</li>
						<li class="border-b-[.55px] border-neutral-300 z-[999]">
							<RouterLink to="/logout" class="px-2 py-2 text-white flex gap-x-3 items-center hover:bg-neutral-900 transition-all">
								<img class="w-5" src="@/assets/icons/box-arrow-right.svg">
								Sair
							</RouterLink>
						</li>
					</ul>
				</nav>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
	.link-container::before {
		content: '';
		width: 20px;
		height: 20px;
		background-color: #262626;
		position: absolute;
		top: -9px;
		right: 7px;
		border-radius: 3px;
		transform: rotateZ(-45deg);
		clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 50%);
	}
</style>