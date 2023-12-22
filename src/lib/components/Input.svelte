<script lang="ts">
	export let error: boolean = false;
	export let value: string | number = '';

	let v = value.toString();

	const updateValue = (v: string) => {
		if (typeof value === 'string') {
			value = v;
		} else if (typeof value === 'number') {
			value = Number.parseFloat(v.replaceAll(',', '.'));
		}
	};

	$: updateValue(v);
</script>

<input
	{...$$restProps}
	placeholder="Placeholder..."
	class="{error
		? 'outline outline-red-500 '
		: ''}appearance-none p-4 bg-neutral-800 border border-neutral-700 rounded-xl animated outline-none ring-0 ring-opacity-25 ring-neutral-500 focus:ring-4"
	bind:value={v}
	on:change
	on:input
/>
