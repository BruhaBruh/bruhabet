<script lang="ts">
	import MajesticCoin from '$lib/components/MajesticCoin.svelte';
	import { bets } from '$lib/store/bets';

	let currentBet = 0;
</script>

<section class="flex-1 flex flex-col gap-4">
	<h2 class="text-3xl font-bold">Контроль ставок</h2>
	<div class="flex gap-2">
		<div class="flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
			<h4 class="text-lg">#</h4>
			<h5 class="text-xl font-bold w-9 text-center">{currentBet + 1}</h5>
		</div>
		<div class="flex-1 flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
			<h4 class="text-lg">Ставка</h4>
			<h5 class="text-xl font-bold flex items-center justify-center gap-2 font-mono">
				{$bets[currentBet].bet}
				<MajesticCoin class="w-4 h-4 translate-y-0.25" />
			</h5>
		</div>
		<div class="flex-1 flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
			<h4 class="text-lg">Проиграно</h4>
			<h5 class="text-xl font-bold flex items-center justify-center gap-2 font-mono">
				{$bets[currentBet].cost}
				<MajesticCoin class="w-4 h-4 translate-y-0.25" />
			</h5>
		</div>
		<div class="flex-1 flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
			<h4 class="text-lg text-center">Потенциальный плюс</h4>
			<h5 class="text-xl font-bold flex items-center justify-center gap-2 font-mono">
				{$bets[currentBet].potentialPlus}
				<MajesticCoin class="w-4 h-4 translate-y-0.25" />
			</h5>
		</div>
	</div>
	<div class="flex gap-2">
		<button
			class="flex-1 gradient-green text-lg font-bold rounded-xl p-4 ring-0 ring-opacity-25 ring-green-500 focus:ring-4"
			on:click={() => (currentBet = 0)}
		>
			Выиграл
		</button>
		<button
			disabled={currentBet >= 99}
			class="flex-1 gradient-red disabled:gradient-gray text-lg font-bold rounded-xl p-4 ring-0 ring-opacity-25 ring-red-500 focus:ring-4"
			on:click={() => (currentBet = currentBet + 1)}
		>
			Проиграл
		</button>
	</div>
</section>
