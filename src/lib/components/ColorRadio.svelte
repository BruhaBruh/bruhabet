<script lang="ts">
	import type { Color } from '$lib/types/color';

	export let id: string;
	export let color: Color;
	export let checked: boolean;
	export let name: string = '';
	export let label: string = '';

	const gradientByColor: Record<Color, string> = {
		WHITE: 'gradient-white',
		RED: 'gradient-red',
		GREEN: 'gradient-green',
		GOLD: 'gradient-gold',
	};

	const ringByColor: Record<Color, string> = {
		WHITE: 'ring-neutral-100',
		RED: 'ring-red-500',
		GREEN: 'ring-green-500',
		GOLD: 'ring-yellow-500',
	};
</script>

<label for={id} class="select-none flex-1">
	<input
		{id}
		{name}
		{checked}
		value={color}
		type="radio"
		class="peer/color-radio"
		hidden
		on:change
	/>
	<div
		class="peer-checked/color-radio:ring-4 ring-0 ring-opacity-25 {ringByColor[
			color
		]} cursor-pointer animated h-24 rounded-lg {gradientByColor[
			color
		]} text-3xl font-bold font-mono flex items-center justify-center"
	>
		{#if label}
			{label}
		{/if}
	</div>
</label>
