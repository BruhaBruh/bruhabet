<script lang="ts">
	export let forHtml: string = '';
	export let label: string = '';
	export let error: string | null = null;
</script>

<div class="flex flex-col gap-2">
	{#if label}
		<label for={forHtml}>{label}</label>
	{/if}
	<slot />
	{#if error}
		<p class="text-red-500 text-sm">{error}</p>
	{/if}
</div>
