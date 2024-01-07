<template>
	<div :class="$style.wrapper">
		<section :class="$style.formula" v-html="html" />
		<hr :class="$style.fence" />
		<section :class="$style.control">
			<div :class="$style.option">
				<span :class="$style.text">Viewport width range:</span>
				<span :class="$style.input"><Ratio /></span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">Fluid size range:</span>
				<span :class="$style.input"><Ratio /></span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">Root font size:</span>
				<span :class="$style.input"><Input /></span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">Unit:</span>
				<span :class="$style.input"><Switch v-model="isRem" :placeholder="{ off: 'px', on: 'rem' }" /></span>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import Ratio from '@/components/Ratio.vue';
import Input from '@/components/Input.vue';
import Switch from '@/components/Switch.vue';
import { codeToHtml } from 'shikiji';
import { ref, onBeforeMount } from 'vue';

const isRem = ref(true);

const html = ref('');
const code = `
.wrapper {
    font-size: clamp(2rem, 3vw + 2rem, 3rem);
}
`;

onBeforeMount(async () => (html.value = await codeToHtml(code.trim(), { lang: 'css', theme: 'nord' })));

/**
 * 计算CSS的clamp公式
 * @param param0 第一个坐标，横轴与纵轴的单位均为px
 * @param param1 第二个坐标，横轴与纵轴的单位均为px
 * @return 代表clamp公式的字符串
 * @example
 * f([500, 16], [1000, 48]); // "6.4vw -1rem"
 */
function createFormula([x1, y1]: [number, number], [x2, y2]: [number, number]) {
	// y = ax + b
	const a = (y2 - y1) / (x2 - x1);
	const b = y1 - a * x1;

	// y = vwx + rem
	const vw = Number((a * 100 * 100).toFixed()) / 100;
	const rem = Number(((b / 16) * 100).toFixed()) / 100;

	// sign
	const sign = Math.sign(rem); // +1 | -1 | +0 | -0 | NaN

	if (Number.isNaN(sign)) throw new Error('rem parameter is NaN');
	if (sign === 0) return `${vw}vw`;

	return `${vw}vw ${Math.abs(rem) * sign}rem`;
}
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
			inline-size: 15rem;
		}
	}
}
</style>
