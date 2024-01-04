<template>
	<div :class="$style.wrapper">
		<section :class="$style.control">
			<Ratio />
		</section>
		<section :class="$style.formula"></section>
	</div>
</template>

<script setup lang="ts">
import Ratio from '@/components/Ratio.vue';

// clamp x size (min:max)
// clamp y size (min:max)
// root font size
// px | rem
</script>

<style module>
.wrapper {
	block-size: 100vh;
	block-size: 100dvh;
	inline-size: 100vw;
	inline-size: 100dvw;
	background-color: #09090b;

	> .control,
	> .formula {
		border-radius: 4px;
		border: 1px solid #27272a;
	}
}
</style>
