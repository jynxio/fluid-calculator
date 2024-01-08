<template>
	<div :class="$style.wrapper">
		<section :class="$style.formula" @click="handleCopy" v-html="html" />
		<hr :class="$style.fence" />
		<section :class="$style.control">
			<div :class="$style.option">
				<span :class="$style.text">Unit:</span>
				<span :class="$style.input">
					<Switch v-model="isRem">
						<template #off>px</template>
						<template #on>rem</template>
					</Switch>
				</span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">Trend:</span>
				<span :class="$style.input">
					<Switch v-model="isUp">
						<template #off><TrendDown /></template>
						<template #on><TrendUp /></template>
					</Switch>
				</span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">Root font size:</span>
				<span :class="$style.input"><Count v-model="rootFontSize" /></span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">Fluid size range:</span>
				<span :class="$style.input"><Ratio v-model="fluidRange" /></span>
			</div>
			<div :class="$style.option">
				<span :class="$style.text">Viewport size range:</span>
				<span :class="$style.input"><Ratio v-model="viewportRange" /></span>
			</div>
		</section>
		<Teleport to="body">
			<Transition>
				<Bubble v-if="bubbleVisible">{{ bubbleMsg }}</Bubble>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import Ratio from '@/components/Ratio.vue';
import Count from '@/components/Count.vue';
import Switch from '@/components/Switch.vue';
import Bubble from '@/components/Bubble.vue';
import TrendUp from '@/components/icon/TrendUp.vue';
import TrendDown from '@/components/icon/TrendDown.vue';
import nord from 'shikiji/themes/nord.mjs';
import { getHighlighterCore, HighlighterCore } from 'shikiji/core';
import { getWasmInlined } from 'shikiji/wasm';
import { ref, watchEffect } from 'vue';

type Range = [number, number];

let settimeId: NodeJS.Timeout;
const bubbleMsg = ref<'Copied!' | 'Copy failed!'>('Copied!');
const bubbleVisible = ref(false);

const text = ref('');
const html = ref('');
const isUp = ref(true);
const isRem = ref(true);
const rootFontSize = ref(16);
const fluidRange = ref<Range>([16, 48]);
const viewportRange = ref<Range>([500, 1000]);

const highlighter = ref<HighlighterCore>();

getHighlighterCore({
	themes: [nord],
	langs: [import('shikiji/langs/css.mjs')],
	loadWasm: getWasmInlined,
}).then(res => (highlighter.value = res));

watchEffect(() => {
	if (!highlighter.value) return;

	const formula = createClampFormula({
		unit: isRem.value ? 'rem' : 'px',
		fluidRange: fluidRange.value,
		viewportRange: viewportRange.value,
		rootFontSize: rootFontSize.value,
		trend: isUp.value ? 'ascending' : 'descending',
	});
	const code = `a{a:clamp(${formula}) }`;
	const innerHtml = highlighter.value.codeToHtml(code, { lang: 'css', theme: 'nord' });
	const parser = new DOMParser();
	const dom = parser.parseFromString(innerHtml, 'text/html');
	const line = dom.querySelector('.line')!;
	const children = Array.from(line.children);

	line.removeChild(children[0]);
	line.removeChild(children[1]);
	line.removeChild(children[2]);
	line.removeChild(children[3]);
	line.removeChild(children.at(-1)!);

	text.value = code.slice(4, -2);
	html.value = dom.querySelector('body')!.innerHTML;
});

function createClampFormula({
	unit,
	fluidRange,
	viewportRange,
	rootFontSize = 16,
	trend = 'ascending',
}: {
	unit: 'px' | 'rem';
	trend: 'ascending' | 'descending';
	fluidRange: Range;
	viewportRange: Range;
	rootFontSize?: number;
}) {
	const viewportMin = Math.min(...viewportRange);
	const viewportMax = Math.max(...viewportRange);

	const fluidMin = Math.min(...fluidRange);
	const fluidMax = Math.max(...fluidRange);

	const coorA = trend === 'ascending' ? [viewportMin, fluidMin] : [viewportMin, fluidMax];
	const coorB = trend === 'ascending' ? [viewportMax, fluidMax] : [viewportMax, fluidMin];

	// y = ax + b
	const a = (coorB[1] - coorA[1]) / (coorB[0] - coorA[0]);
	const b = coorA[1] - a * coorA[0];

	const vw = Number((a * 100).toFixed(1));
	const px = b;
	const rem = Number((px / rootFontSize).toFixed(1));

	const sign = Math.sign(b); // +1 | -1 | +0 | -0 | NaN

	let formula: string;
	let prefix: string;
	let suffix: string;

	switch (unit) {
		case 'px':
			prefix = `${fluidMin}px`;
			suffix = `${fluidMax}px`;
			formula = sign === 0 ? `${vw}vw` : `${vw}vw ${sign > 0 ? '+' : '-'} ${Math.abs(px)}px`;
			break;
		case 'rem':
			prefix = `${Number((fluidMin / rootFontSize).toFixed(1))}rem`;
			suffix = `${Number((fluidMax / rootFontSize).toFixed(1))}rem`;
			formula = sign === 0 ? `${vw}vw` : `${vw}vw ${sign > 0 ? '+' : '-'} ${Math.abs(rem)}rem`;
			break;
	}

	return `${prefix}, ${formula}, ${suffix}`;
}

function handleCopy() {
	navigator.clipboard
		.writeText(text.value)
		.then(() => {
			bubbleMsg.value = 'Copied!';
		})
		.catch(() => {
			bubbleMsg.value = 'Copy failed!';
		})
		.finally(() => {
			bubbleVisible.value = true;
			clearTimeout(settimeId);
			settimeId = setTimeout(() => (bubbleVisible.value = false), 1000);
		});
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
	inline-size: 21rem;
	margin: auto;
}

.fence {
	block-size: 1px;
	inline-size: 100%;
	background-color: #27272a;
}

.formula {
	inline-size: 100%;
	user-select: none;
	cursor: pointer;

	> pre {
		overflow-x: auto;
		padding: 1rem;
		border-radius: 4px;
		border: 1px solid #27272a;
		font-size: calc(12 / 16 * 1rem);
		text-align: center;
		background-color: #18181b !important;

		* {
			font-size: calc(13 / 16 * 1rem);
		}
	}
}

.control {
	display: flex;
	gap: 1rem;
	flex-direction: column;
	inline-size: 100%;

	> .option {
		display: flex;
		gap: 1rem;
		justify-content: space-around;
		align-items: center;

		> .text {
			flex: 1 0 0;
		}
	}
}
</style>

<style>
.v-enter-active,
.v-leave-active {
	transition: opacity ease 200ms;
}

.v-enter-to,
.v-leave-from {
	opacity: 1;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
