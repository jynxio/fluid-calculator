<template>
	<div :class="$style.wrapper">
		<button :class="$style.icon" :disabled="count.value === 0" @click="handleDecrease">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>
		<input :class="$style.input" :value="count.value" @input="handleInput" />
		<button :class="$style.icon" @click="handleIncrease">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>
	</div>
</template>

<script setup lang="ts">
import { shallowRef, triggerRef, watch } from 'vue';

const props = defineProps<{ modelValue: number }>();
const emits = defineEmits<{ (e: 'update:modelValue', value: number): void }>();
const count = shallowRef({ value: props.modelValue });

watch(count, () => emits('update:modelValue', count.value.value));

function handleInput(event: Event) {
	const target = event.target as HTMLInputElement;
	const value = target.value;
	const num = Number(value);

	if (!Number.isNaN(num)) count.value.value = num;

	triggerRef(count);
}

function handleIncrease() {
	count.value.value++;
	triggerRef(count);
}

function handleDecrease() {
	count.value.value--;
	triggerRef(count);
}
</script>

<style module>
.wrapper {
	display: flex;
	gap: calc(5 / 16 * 1rem);
	align-items: center;
	inline-size: 8rem;
	padding: calc(4 / 16 * 1rem) calc(12 / 16 * 1rem);
	border-radius: 4px;
	border: 1px solid #27272a;
}

.input {
	flex: 1 0 0;
	min-inline-size: 0;
	color: #fafafa;
	font: inherit;
	text-align: center;
}

.icon {
	aspect-ratio: 1 / 1;
	inline-size: calc(14 / 16 * 1rem);
	color: inherit;
	cursor: pointer;
	transition: color ease 200ms;

	> svg {
		block-size: 100%;
		inline-size: 100%;
	}

	&:disabled {
		color: #27272a;
	}
}
</style>
