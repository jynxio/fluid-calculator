<template>
	<div :class="$style.wrapper">
		<slot />
	</div>
</template>

<style module>
.wrapper {
	position: fixed;
	right: 1rem;
	bottom: 1rem;
	inline-size: fit-content;
	padding: 0.5rem 2.5rem;
	border-radius: 4px;
	margin: auto;
	border: 1px solid #27272a;
	color: #fefefe;
	font-size: calc(12 / 16 * 1rem);
}

@media (width <= 600px) {
	.wrapper {
		left: 0;
		right: 0;
		bottom: 3rem;
	}
}
</style>
