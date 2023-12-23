<script lang="ts">
	import type { Server } from '@prisma/client';

	export let servers: Server[];
	export let selectedServer: number = 0;
	export let name: string = '';
</script>

<div class="grid grid-cols-3 gap-2">
	{#each servers as server (server.id)}
		<label for={`server-${server.id}`} class="select-none">
			<input
				id={`server-${server.id}`}
				{name}
				bind:group={selectedServer}
				value={server.id}
				type="radio"
				class="peer/server-select"
				hidden
			/>
			<div
				class="peer-checked/server-select:ring-4 gradient-white text-lg font-bold rounded-xl p-4 ring-0 ring-opacity-25 ring-neutral-100 cursor-pointer"
			>
				#{server.id}
				{server.name}
			</div>
		</label>
	{/each}
</div>
