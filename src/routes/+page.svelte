<script lang="ts">
	import BetsTable from '$lib/widgets/BetsTable.svelte';
	import ControlPanel from '$lib/widgets/ControlPanel.svelte';
	import PatternChecker from '$lib/widgets/PatternChecker.svelte';
	import Settings from '$lib/widgets/Settings.svelte';
	import type { PageData } from './$types';

	// export let data: PageData;
</script>

<PatternChecker />
<Settings />
<ControlPanel />
<BetsTable />
