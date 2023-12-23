<script lang="ts">
	import ColorRadio from '$lib/components/ColorRadio.svelte';
	import Input from '$lib/components/Input.svelte';
	import ServerSelect from '$lib/components/ServerSelect.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import { settings, settingsErrors } from '$lib/store/settings';
	import type { Color } from '$lib/types/color';
	import type { Server } from '@prisma/client';

	export let servers: Server[] = [];

	const handleChangeColorToBet = (e: Event) => {
		const input = e.currentTarget as HTMLInputElement;
		settings.setColorToBet(input.value as Color);
	};
</script>

<section class="flex flex-col gap-4">
	<h2 class="text-3xl font-bold">Настройки</h2>
	<TextField label="Выбор сервера" error={$settingsErrors.selectedServer}>
		<ServerSelect {servers} bind:selectedServer={$settings.selectedServer} />
	</TextField>
	<TextField
		forHtml="start-bet-size"
		label="Начальная сумма ставки"
		error={$settingsErrors.startBetSize}
	>
		<Input
			id="start-bet-size"
			name="start-bet-size"
			inputmode="numeric"
			bind:value={$settings.startBetSize}
			error={$settingsErrors.startBetSize !== null}
		/>
	</TextField>
	<TextField label="Цвет для ставки">
		<div class="flex gap-2">
			<ColorRadio
				checked={$settings.colorToBet === 'WHITE'}
				label="X2"
				id="color-to-bet-white"
				name="color-to-bet"
				color="WHITE"
				on:change={handleChangeColorToBet}
			/>
			<ColorRadio
				checked={$settings.colorToBet === 'RED'}
				label="X3"
				id="color-to-bet-red"
				name="color-to-bet"
				color="RED"
				on:change={handleChangeColorToBet}
			/>
			<ColorRadio
				checked={$settings.colorToBet === 'GREEN'}
				label="X5"
				id="color-to-bet-green"
				name="color-to-bet"
				color="GREEN"
				on:change={handleChangeColorToBet}
			/>
			<ColorRadio
				checked={$settings.colorToBet === 'GOLD'}
				label="X10"
				id="color-to-bet-gold"
				name="color-to-bet"
				color="GOLD"
				on:change={handleChangeColorToBet}
			/>
		</div>
	</TextField>
	<TextField
		forHtml="bet-multiply-size"
		label="Коэффициент увеличения ставки"
		error={$settingsErrors.betMultiplySize}
	>
		<Input
			id="bet-multiply-size"
			name="bet-multiply-size"
			inputmode="numeric"
			bind:value={$settings.betMultiplySize}
			error={$settingsErrors.betMultiplySize !== null}
		/>
	</TextField>
	<TextField
		forHtml="balance-before-bet"
		label="Баланс перед ставкой"
		error={$settingsErrors.balanceBeforeBet}
	>
		<Input
			id="balance-before-bet"
			name="balance-before-bet"
			inputmode="numeric"
			bind:value={$settings.balanceBeforeBet}
			error={$settingsErrors.balanceBeforeBet !== null}
		/>
	</TextField>
</section>
