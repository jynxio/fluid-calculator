<template>
	<div :class="$style.wrapper">
		<section :class="$style.control">
			<div :class="$style.option">
				<span :class="$style.text">clamp of x:</span>
				<span :class="$style.input"><Ratio /></span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">clamp of y:</span>
				<span :class="$style.input"><Ratio /></span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">root font size:</span>
				<span :class="$style.input"><Input /></span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">unit:</span>
				<span :class="$style.input"><Toggle /></span>
			</div>
		</section>
		<section :class="$style.formula"></section>
	</div>
</template>

<script setup lang="ts">
import Ratio from '@/components/Ratio.vue';
import Input from '@/components/Input.vue';
import Toggle from '@/components/Toggle.vue';
</script>

<style module>
.wrapper {
	block-size: 100vh;
	block-size: 100dvh;
	inline-size: 100vw;
	inline-size: 100dvw;
	background-color: #09090b;
}

.control,
.formula {
	border-radius: 4px;
	border: 1px solid #27272a;
}

.control {
	display: flex;
	gap: 1rem;
	flex-direction: column;

	> .option {
		display: flex;
		gap: 1rem;
		align-items: center;

		> .text {
			inline-size: 10rem;
		}
	}
}
</style>
