<template>
	<div :class="$style.wrapper">
		<input placeholder="x" />
		<hr />
		<input placeholder="y" />
	</div>
</template>

<style module>
.wrapper {
	padding: calc(4 / 16 * 1rem) calc(12 / 16 * 1rem);
	border-radius: 4px;
	border: 1px solid #27272a;

	> input {
		all: initial;
		color: #fafafa;

		&::placeholder {
			color: #a1a1a9;
		}
	}
}
</style>
