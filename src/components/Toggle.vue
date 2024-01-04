<template>
	<div :class="$style.wrapper">
		<span :class="$style.option">px</span>
		<button :class="$style.control"><i /></button>
		<span :class="$style.option">rem</span>
	</div>
</template>

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
	/* flex: 1 0 0; */
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

	> i {
		position: absolute;
		aspect-ratio: 1 / 1;
		inline-size: calc(14 / 16 * 1rem);
		border-radius: 999rem;
		background-color: #a1a1a9;
		translate: 40% -50%;
	}
}
</style>
