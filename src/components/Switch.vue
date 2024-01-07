<template>
	<div :class="$style.wrapper">
		<span :class="[$style.option, $props.modelValue || $style.enabled]">
			{{ $props.placeholder.off }}
		</span>
		<button
			:class="[$style.control, $props.modelValue && $style.on]"
			@click="$emit('update:modelValue', !$props.modelValue)"
		/>
		<span :class="[$style.option, $props.modelValue && $style.enabled]">
			{{ $props.placeholder.on }}
		</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean; placeholder: { off: string; on: string } }>();
defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
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
	font-size: calc(14 / 16 * 100%);
}

.option {
	transition: color ease 200ms;

	&.enabled {
		color: #fafafa;
	}
}

.control {
	all: initial;
	flex: 1 0 0;
	position: relative;
	box-sizing: content-box;
	block-size: calc(1 / 16 * 1rem);
	padding-block: calc(7 / 16 * 1rem);
	background-color: #27272a;
	background-clip: content-box;
	cursor: pointer;

	&::after {
		content: '';
		position: absolute;
		inset: 50% auto auto calc((5 / 16 * 1rem));
		aspect-ratio: 1 / 1;
		inline-size: calc(14 / 16 * 1rem);
		border-radius: 999rem;
		background-color: #a1a1a9;
		translate: 0% -50%;
		transition: all ease 200ms;
	}

	&.on::after {
		inset: 50% calc((5 / 16 * 1rem)) auto auto;
	}
}
</style>
