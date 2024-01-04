<template>
	<div :class="$style.wrapper">
		<button :class="$style.icon">
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
		<input :class="$style.input" placeholder="place" />
		<button :class="$style.icon">
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

.input {
	all: initial;
	flex: 1 0 0;
	min-inline-size: 0;
	color: #fafafa;
	font: inherit;
	text-align: center;
}

.icon {
	all: initial;
	aspect-ratio: 1 / 1;
	inline-size: calc(14 / 16 * 1rem);
	color: inherit;
	cursor: pointer;

	> svg {
		block-size: 100%;
		inline-size: 100%;
	}
}
</style>
