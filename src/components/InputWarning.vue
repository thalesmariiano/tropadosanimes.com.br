<script setup>
	const props = defineProps(['message'])
</script>

<template>
	<div class="min-w-44 px-2 py-1 bg-neutral-900 border-l-4 border-red-500 rounded z-50 shadow-md">
		<p class="caret-detail text-red-500">{{ props.message }}</p>
	</div>
</template>

<style>
	.caret-detail::before {
		content: '';
		width: 15px;
		height: 15px;
		background-color: #18181b;
		position: absolute;
		top: -7px;
		left: 10px;
		border-radius: 3px;
		transform: rotateZ(-45deg);
		clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 50%);
	}
</style>