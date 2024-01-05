<template>
	<div :class="$style.wrapper">
		<section :class="$style.formula" v-html="html" />
		<hr :class="$style.fence" />
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
	</div>
</template>

<script setup lang="ts">
import Ratio from '@/components/Ratio.vue';
import Input from '@/components/Input.vue';
import Toggle from '@/components/Toggle.vue';
import { codeToHtml } from 'shikiji';
import { ref, onBeforeMount } from 'vue';

const html = ref('');
const code = `
.wrapper {
    font-size: clamp(2rem, 3vw + 2rem, 3rem);
}
`;

onBeforeMount(async () => (html.value = await codeToHtml(code.trim(), { lang: 'css', theme: 'nord' })));
</script>

<style module>
.wrapper {
	display: flex;
	gap: 1rem;
	flex-direction: column;
	align-items: center;
	position: absolute;
	inset: 0;
	block-size: fit-content;
	inline-size: fit-content;
	margin: auto;
}

.fence {
	all: initial;
	block-size: 1px;
	inline-size: 100%;
	background-color: #27272a;
}

.formula {
	> pre {
		padding: 1rem;
		border-radius: 4px;
		border: 1px solid #27272a;
		background-color: #18181b !important;
	}
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
