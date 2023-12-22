<script>
	import i18next from 'i18next';
	import { z } from 'zod';
	import { zodI18nMap } from 'zod-i18n-map';
	// Import your language translation files
	import translation from 'zod-i18n-map/locales/ru/zod.json';
	import '../app.css';

	i18next.init({
		lng: 'ru',
		resources: {
			ru: { zod: translation },
		},
	});
	z.setErrorMap(zodI18nMap);
</script>

<div class="container mx-auto max-w-4xl flex flex-col gap-12 py-6">
	<header>
		<h1 class="text-4xl font-bold tracking-wider">
			<span class="gradient-white rounded px-1">B</span>ru<span class="gradient-red rounded px-1"
				>h</span
			>a<span class="gradient-green rounded px-1">B</span>e<span class="gradient-gold rounded px-1"
				>t</span
			>
			<span class="text-sm text-neutral-500 tracking-tight">by @BruhaBruh</span>
		</h1>
	</header>
	<main class="flex flex-col gap-8 text-xl">
		<slot />
	</main>
</div>
