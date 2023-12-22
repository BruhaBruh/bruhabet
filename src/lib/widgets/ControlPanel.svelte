<script lang="ts">
	import MajesticCoin from '$lib/components/MajesticCoin.svelte';
	import { bets } from '$lib/store/bets';
	import { settings } from '$lib/store/settings';

	let currentBet = 0;
	$: currentBalance = $settings.balanceBeforeBet;

	const handleWonClick = () => {
		$settings.balanceBeforeBet =
			$settings.balanceBeforeBet + ($bets[currentBet]?.potentialPlus ?? 0);
		currentBet = 0;
	};

	const handleLoseClick = () => {
		if (currentBet >= 99) return;
		currentBalance = $settings.balanceBeforeBet - ($bets[currentBet]?.cost ?? 0);
		currentBet = currentBet + 1;
	};

	const handleResetClick = () => {
		currentBet = 0;
		$settings.balanceBeforeBet = currentBalance;
	};
</script>

<section class="flex-1 flex flex-col gap-4">
	<h2 class="text-3xl font-bold">Контроль ставок</h2>
	<div class="flex gap-2">
		<div class="flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
			<h4 class="text-lg">#</h4>
			<h5 class="text-xl font-bold w-9 text-center">{currentBet + 1}</h5>
		</div>
		<div class="flex-1 flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
			<h4 class="text-lg">Баланс</h4>
			<h5 class="text-xl font-bold flex items-center justify-center gap-2 font-mono">
				{currentBalance}
				<MajesticCoin class="w-4 h-4 translate-y-0.25" />
			</h5>
		</div>
		<div class="flex-1 flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
			<h4 class="text-lg">Ставка</h4>
			<h5 class="text-xl font-bold flex items-center justify-center gap-2 font-mono">
				{$bets[currentBet]?.bet ?? -1}
				<MajesticCoin class="w-4 h-4 translate-y-0.25" />
			</h5>
		</div>
		<div class="flex-1 flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
			<h4 class="text-lg">Проиграно</h4>
			<h5 class="text-xl font-bold flex items-center justify-center gap-2 font-mono">
				{$bets[currentBet]?.cost ?? -1}
				<MajesticCoin class="w-4 h-4 translate-y-0.25" />
			</h5>
		</div>
		<div class="flex-1 flex flex-col items-center justify-center p-4 bg-neutral-800 rounded-xl">
			<h4 class="text-lg text-center">Выигрыш</h4>
			<h5 class="text-xl font-bold flex items-center justify-center gap-2 font-mono">
				{$bets[currentBet]?.potentialPlus ?? -1}
				<MajesticCoin class="w-4 h-4 translate-y-0.25" />
			</h5>
		</div>
	</div>
	<div class="flex gap-2">
		<button
			class="flex-1 gradient-green text-lg font-bold rounded-xl p-4 ring-0 ring-opacity-25 ring-green-500 focus:ring-4"
			on:click={handleWonClick}
		>
			Выиграл
		</button>
		<button
			disabled={currentBet >= 99 ||
				currentBalance <= 0 ||
				($bets[currentBet + 1] && currentBalance < $bets[currentBet + 1]?.bet)}
			class="flex-1 gradient-red disabled:gradient-gray text-lg font-bold rounded-xl p-4 ring-0 ring-opacity-25 ring-red-500 focus:ring-4"
			on:click={handleLoseClick}
		>
			Проиграл
		</button>
		<button
			class="flex-1 gradient-white disabled:gradient-gray text-lg font-bold rounded-xl p-4 ring-0 ring-opacity-25 ring-red-500 focus:ring-4"
			on:click={handleResetClick}
		>
			Сбросить
		</button>
	</div>
</section>
