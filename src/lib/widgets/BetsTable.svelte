<script lang="ts">
	import { betsForBalance } from '$lib/store/bets';
</script>

<section class="flex flex-col gap-4">
	<h2 class="text-3xl font-bold">Таблица ставок</h2>
	<table class="text-lg bg-neutral-800 rounded-xl font-mono">
		<thead>
			<tr class="border-b border-neutral-700">
				<th class="px-4 py-2 text-right border-r border-neutral-700">#</th>
				<th class="px-4 py-2 text-right border-r border-neutral-700">Ставка</th>
				<th class="px-4 py-2 text-right border-r border-neutral-700">Затраты</th>
				<th class="px-4 py-2 text-right">Потенцильный плюс</th>
			</tr>
		</thead>
		<tbody>
			{#each $betsForBalance as betInfo, index (index)}
				{@const isLast = $betsForBalance.length - 1 === index}
				<tr class={isLast ? undefined : 'border-b border-neutral-700'}>
					<td class="px-4 py-2 text-right border-r border-neutral-700">{index + 1}</td>
					<td class="px-4 py-2 text-right border-r border-neutral-700">{betInfo.bet}</td>
					<td class="px-4 py-2 text-right border-r border-neutral-700">{betInfo.cost}</td>
					<td class="px-4 py-2 text-right">{betInfo.potentialPlus}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
