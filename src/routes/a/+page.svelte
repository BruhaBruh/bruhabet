<script lang="ts">
	import AdminPanel from '$lib/widgets/AdminPanel.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<AdminPanel servers={data.servers} />
