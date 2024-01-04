<template>
	<div :class="$style.wrapper">
		<input placeholder="min" :class="$style.dividend" />
		<span>/</span>
		<input placeholder="max" :class="$style.divisor" />
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

	> span {
		flex: 0 0 fit-content;
	}

	> input {
		all: initial;
		flex: 1 0 0;
		min-inline-size: 0;
		color: #fafafa;
		font: inherit;

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
