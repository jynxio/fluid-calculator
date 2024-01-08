<template>
	<div :class="$style.wrapper">
		<span :class="[$style.option, $props.modelValue || $style.enabled]">
			<slot name="off" />
		</span>
		<button
			:class="[$style.control, $props.modelValue && $style.on]"
			@click="$emit('update:modelValue', !$props.modelValue)"
		/>
		<span :class="[$style.option, $props.modelValue && $style.enabled]">
			<slot name="on" />
		</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>();
defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
</script>

<style module>
.wrapper {
	overflow: clip;
	display: flex;
	gap: calc(5 / 16 * 1rem);
	align-items: center;
	inline-size: 8rem;
	padding: calc(4 / 16 * 1rem) calc(12 / 16 * 1rem);
	border-radius: 4px;
	border: 1px solid #27272a;
}

.option {
	flex: 0 0 25%;
	text-align: center;
	transition: color ease 200ms;

	&.enabled {
		color: #fafafa;
	}

	> svg {
		block-size: calc(14 / 16 * 1rem);
		inline-size: calc(14 / 16 * 1rem);
		margin: calc(0.25 * 14 / 16 * 1rem) auto;
	}
}

.control {
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
		display: block;
		aspect-ratio: 1 / 1;
		inline-size: 100%;
		padding: calc(50% - (6 / 16 * 1rem));
		border-radius: 999rem;
		background-color: #a1a1a9;
		background-clip: content-box;
		translate: calc(-50% + (6 / 16 * 1rem) * 2) -50%;
		transition: translate ease 200ms;
	}

	&.on::after {
		translate: calc(50% - (6 / 16 * 1rem) * 2) -50%;
	}
}
</style>
