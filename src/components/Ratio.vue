<template>
	<div :class="$style.wrapper">
		<input :class="$style.dividend" :value="a.value" @input="handleInputA" />
		<span>:</span>
		<input :class="$style.divisor" :value="b.value" @input="handleInputB" />
	</div>
</template>

<script setup lang="ts">
import { shallowRef, triggerRef, watch } from 'vue';

const props = defineProps<{ modelValue: [number, number] }>();
const emits = defineEmits<{ (e: 'update:modelValue', value: [number, number]): void }>();

const a = shallowRef({ value: props.modelValue[0] });
const b = shallowRef({ value: props.modelValue[1] });

watch([a, b], () => emits('update:modelValue', [a.value.value, b.value.value]));

function handleInputA(event: Event) {
	const value = (event.target as HTMLInputElement).value;
	const num = Number(value);

	if (!Number.isNaN(num)) a.value.value = num;

	triggerRef(a);
}

function handleInputB(event: Event) {
	const value = (event.target as HTMLInputElement).value;
	const num = Number(value);

	if (!Number.isNaN(num)) b.value.value = num;

	triggerRef(b);
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

	> span {
		flex: 0 0 fit-content;
	}

	> input {
		flex: 1 0 0;
		min-inline-size: 0;
		color: #fafafa;

		&.dividend {
			text-align: right;
		}

		&.divisor {
			text-align: left;
		}

		&::placeholder {
			color: #a1a1a9;
		}

		&.dividend::placeholder {
			text-align: right;
		}

		&.divisor::placeholder {
			text-align: left;
		}
	}
}
</style>
