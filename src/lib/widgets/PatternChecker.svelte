<script lang="ts">
	import TextField from '$lib/components/TextField.svelte';
	import type { Color } from '$lib/types/color';
	import type { Pattern } from '$lib/types/pattern';
	import type { Server } from '@prisma/client';

	// export let servers: Server[];

	let patterns: Pattern[] = [];
	let patternError: string | null = null;
	let selectedServer: number = 9;
	let percentLabel = '...';
	let timeout: number | null = null;

	const gradientByColor: Record<Color, string> = {
		WHITE: 'gradient-white',
		RED: 'gradient-red',
		GREEN: 'gradient-green',
		GOLD: 'gradient-gold',
	};

	const debounce = (pattern: Pattern[]) => {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		percentLabel = '...';
		if (pattern.length === 0) {
			return;
		}
		timeout = setTimeout(async () => {
			const response = await fetch('/api/pattern', {
				method: 'POST',
				body: JSON.stringify({ serverId: selectedServer, pattern }),
			});
			if (response.status === 400) {
				patternError = (await response.json()).message;
				return;
			}
			if (response.status !== 200) {
				patternError = 'Неизвестная ошибка в просчете процента';
				return;
			}
			const { percent, amountOfBets }: Record<string, number> = await response.json();
			percentLabel = `${percent.toFixed(2)}% на основе ${amountOfBets} ставок`;
		}, 250);
	};

	$: debounce(patterns);

	const handleAddPattern = (pattern: Pattern) => () => {
		if (patterns.length >= 20) {
			patternError = 'Максимум 20 цветов';
			return;
		}
		patterns.push(pattern);
		patterns = patterns;
	};

	const handleDeletePattern = (index: number) => () => {
		patternError = null;
		patterns = patterns.filter((_, i) => i !== index);
	};

	const handleClearPattern = () => {
		patternError = null;
		patterns = [];
	};
</script>

<section class="flex flex-col gap-4">
	<h2 class="text-3xl font-bold">Проверка паттерна</h2>
	<p class="text-xl text-red-500">В процессе разработки и добавлении ставок</p>
	<!-- <TextField label="Выбор сервера">
		<ServerSelect {servers} bind:selectedServer />
	</TextField> -->
	<TextField label="Паттерн">
		<div class="flex gap-2 p-2 bg-neutral-800 rounded-xl">
			{#each patterns as pattern, index}
				<button
					class={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-mono ${
						gradientByColor[pattern.color]
					}`}
					on:click={handleDeletePattern(index)}
				>
					{#if pattern.invert}
						НЕ
					{/if}
				</button>
			{/each}
			<button
				on:click={handleClearPattern}
				class="h-8 ml-auto flex items-center justify-center text-sm font-bold font-mono"
			>
				Очистить
			</button>
		</div>
	</TextField>
	<TextField label="Добавить цвет в паттерн" error={patternError}>
		<div class="flex gap-2">
			<button
				on:click={handleAddPattern({ color: 'WHITE', invert: false })}
				class="flex-1 h-16 gradient-white rounded-xl"
			/>
			<button
				on:click={handleAddPattern({ color: 'RED', invert: false })}
				class="flex-1 h-16 gradient-red rounded-xl"
			/>
			<button
				on:click={handleAddPattern({ color: 'GREEN', invert: false })}
				class="flex-1 h-16 gradient-green rounded-xl"
			/>
			<button
				on:click={handleAddPattern({ color: 'GOLD', invert: false })}
				class="flex-1 h-16 gradient-gold rounded-xl"
			/>
			<button
				on:click={handleAddPattern({ color: 'WHITE', invert: true })}
				class="flex-1 h-16 gradient-white rounded-xl flex items-center justify-center font-bold font-mono text-2xl"
			>
				НЕ
			</button>
			<button
				on:click={handleAddPattern({ color: 'RED', invert: true })}
				class="flex-1 h-16 gradient-red rounded-xl flex items-center justify-center font-bold font-mono text-2xl"
			>
				НЕ
			</button>
			<button
				on:click={handleAddPattern({ color: 'GREEN', invert: true })}
				class="flex-1 h-16 gradient-green rounded-xl flex items-center justify-center font-bold font-mono text-2xl"
			>
				НЕ
			</button>
			<button
				on:click={handleAddPattern({ color: 'GOLD', invert: true })}
				class="flex-1 h-16 gradient-gold rounded-xl flex items-center justify-center font-mono text-2xl"
			>
				НЕ
			</button>
		</div>
	</TextField>
	<div class="flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
		<h4 class="text-lg">Процент выпадения</h4>
		<h5 class="text-xl font-bold text-center">{percentLabel}</h5>
	</div>
</section>
