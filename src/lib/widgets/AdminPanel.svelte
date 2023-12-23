<script lang="ts">
	import ColorRadio from '$lib/components/ColorRadio.svelte';
	import Input from '$lib/components/Input.svelte';
	import ServerSelect from '$lib/components/ServerSelect.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import { getZodErrorMessage } from '$lib/utils/getZodError';
	import type { Server } from '@prisma/client';
	import { z } from 'zod';

	export let servers: Server[] = [];

	let password: string = '';
	let selectedServer: number = 9;
	let isLoading: boolean = false;
	let isSuccess: boolean = false;

	const formSchema = z.object({
		betId: z.number().positive().step(1),
		result: z.enum(['WHITE', 'RED', 'GREEN', 'GOLD']),
	});

	const form: z.infer<typeof formSchema> = {
		betId: 1,
		result: 'WHITE',
	};

	let formErrors: Record<keyof typeof form, string | null> = {
		betId: null,
		result: null,
	};

	const updateErrors = (f: typeof form) => {
		const result = formSchema.safeParse(form);
		formErrors.betId = null;
		formErrors.result = null;

		if (result.success) return;
		const betIdError = getZodErrorMessage(result.error.issues, ['betId']);
		if (betIdError) {
			formErrors.betId = betIdError.message;
		}
		const resultError = getZodErrorMessage(result.error.issues, ['result']);
		if (resultError) {
			formErrors.result = resultError.message;
		}
	};
	$: updateErrors(form);

	const handleChangeResult = (e: Event) => {
		const input = e.currentTarget as HTMLInputElement;
		form.result = input.value as any;
	};

	const handleSendData = async () => {
		if (!password) return;
		isLoading = true;
		const response = await fetch('/api/bet', {
			method: 'POST',
			headers: {
				Authorization: `Basic ${password}`,
			},
			body: JSON.stringify({
				betId: form.betId,
				result: form.result,
				serverId: selectedServer,
			}),
		});
		isLoading = false;
		if (response.status === 400) {
			const { message } = await response.json();
			formErrors.betId = message;
			return;
		}
		if (response.status !== 200) return;
		isSuccess = true;
		form.betId = form.betId + 1;
		setTimeout(() => {
			isSuccess = false;
		}, 1000);
	};
</script>

<section class="flex flex-col gap-4">
	<h2 class="text-3xl font-bold">Админ Панель</h2>
	<!-- <TextField label="Выбор сервера">
		<ServerSelect {servers} bind:selectedServer />
	</TextField> -->
	<TextField forHtml="password" label="Пароль">
		<Input id="password" type="password" name="password" bind:value={password} />
	</TextField>
	{#if selectedServer !== 0}
		<TextField forHtml="bet-id" label="ID ставки" error={formErrors.betId}>
			{#key form.betId}
				<Input
					id="bet-id"
					name="bet-id"
					inputmode="numeric"
					bind:value={form.betId}
					error={formErrors.betId !== null}
				/>
			{/key}
		</TextField>
		<TextField label="Выпавший цвет">
			<div class="flex gap-2">
				<ColorRadio
					checked={form.result === 'WHITE'}
					label="X2"
					id="dropped-color-white"
					name="dropped-color"
					color="WHITE"
					on:change={handleChangeResult}
				/>
				<ColorRadio
					checked={form.result === 'RED'}
					label="X3"
					id="dropped-color-red"
					name="dropped-color"
					color="RED"
					on:change={handleChangeResult}
				/>
				<ColorRadio
					checked={form.result === 'GREEN'}
					label="X5"
					id="dropped-color-green"
					name="dropped-color"
					color="GREEN"
					on:change={handleChangeResult}
				/>
				<ColorRadio
					checked={form.result === 'GOLD'}
					label="X10"
					id="dropped-color-gold"
					name="dropped-color"
					color="GOLD"
					on:change={handleChangeResult}
				/>
			</div>
		</TextField>
		<button
			class="flex-1 gradient-white disabled:gradient-gray text-lg font-bold rounded-xl p-4 ring-0 ring-opacity-25 ring-neutral-100 focus:ring-4"
			disabled={isLoading || !!formErrors.betId || !!formErrors.result}
			on:click={handleSendData}
		>
			Отправить
		</button>
		{#if isSuccess}
			<p class="text-green-500 text-center">Успешно</p>
		{/if}
	{/if}
</section>
