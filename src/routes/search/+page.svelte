<script lang="ts">
	import { browser } from '$app/env';
	import { MagnifyingGlass, X } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { PRODUCTS } from '#lib/data/products';

	const RECENT_KEY = 'aura-recent-searches';
	const POPULAR = ['Knitwear', 'Linen', 'Tote', 'Trousers'];
	const MAX_RECENT = 5;

	let query = $state('');
	let recent = $state<string[]>([]);
	let loaded = $state(false);

	// Prerender-safe: read ?q= and localStorage in the browser only, once.
	// No $effect is used for state sync — this only seeds the initial state.
	$effect(() => {
		if (!browser || loaded) return;
		loaded = true;
		const q = new URLSearchParams(window.location.search).get('q');
		if (q) query = q;
		try {
			const raw = localStorage.getItem(RECENT_KEY);
			if (raw) {
				const parsed: unknown = JSON.parse(raw);
				if (Array.isArray(parsed)) recent = parsed.filter((v): v is string => typeof v === 'string').slice(0, MAX_RECENT);
			}
		} catch {
			recent = [];
		}
	});

	let trimmed = $derived(query.trim());
	let results = $derived(
		trimmed
			? PRODUCTS.filter((p) =>
					[p.name, p.category, p.colour].some((field) =>
						field.toLowerCase().includes(trimmed.toLowerCase())
					)
				)
			: []
	);

	function saveRecent(term: string) {
		const clean = term.trim();
		if (!clean) return;
		recent = [clean, ...recent.filter((r) => r.toLowerCase() !== clean.toLowerCase())].slice(
			0,
			MAX_RECENT
		);
		try {
			localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
		} catch {
			// Storage unavailable — recents just don't persist this session.
		}
	}

	function submitSearch() {
		saveRecent(query);
	}

	function runSearch(term: string) {
		query = term;
		saveRecent(term);
	}

	function clearRecent() {
		recent = [];
		try {
			localStorage.removeItem(RECENT_KEY);
		} catch {
			// Nothing to clear.
		}
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aura-design.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Search', item: 'https://aura-design.pages.dev/search/' }
		]
	};
</script>

<svelte:head>
	<title>Search — AURA Essentials</title>
	<meta
		name="description"
		content="Search AURA Essentials — find knitwear, linen shirts, trousers, totes and more by name, category or colour."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/search/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Search — AURA Essentials" />
	<meta
		property="og:description"
		content="Find your piece — search the AURA Essentials collection by name, category or colour."
	/>
	<meta property="og:url" content="https://aura-design.pages.dev/search/" />
	<meta property="og:image" content="https://aura-design.pages.dev/images/hero.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Reveal>
		<h1 class="font-display text-4xl font-medium text-ink sm:text-5xl">Search</h1>
		<p class="mt-3 max-w-xl text-base leading-relaxed text-ink/70">
			Find your piece — by name, category or colour.
		</p>
	</Reveal>

	<form
		role="search"
		onsubmit={(e) => {
			e.preventDefault();
			submitSearch();
		}}
		class="mt-8 flex flex-col gap-3 sm:flex-row"
	>
		<div class="relative flex-1">
			<MagnifyingGlass
				size={20}
				class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink/50"
			/>
			<input
				type="search"
				bind:value={query}
				placeholder="Try “linen”, “knitwear”, “tote”…"
				aria-label="Search products"
				autocomplete="off"
				class="h-14 w-full border border-stone-line bg-white/60 pr-11 pl-12 text-lg text-ink placeholder:text-ink/45 focus:border-sage focus:outline-2 focus:outline-sage"
			/>
			{#if query}
				<button
					type="button"
					onclick={() => (query = '')}
					aria-label="Clear search"
					class="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					<X size={19} />
				</button>
			{/if}
		</div>
		<button
			type="submit"
			class="inline-flex h-14 min-h-11 items-center justify-center bg-sage px-8 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
		>
			Search
		</button>
	</form>

	{#if !trimmed}
		<div class="mt-10 grid gap-8 sm:grid-cols-2">
			<div>
				<h2 class="text-[11px] font-medium tracking-[0.2em] text-ink/70 uppercase">
					Popular searches
				</h2>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each POPULAR as term}
						<button
							type="button"
							onclick={() => runSearch(term)}
							class="inline-flex min-h-11 items-center border border-stone-line bg-white/60 px-4 text-sm text-ink transition hover:border-sage hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
						>
							{term}
						</button>
					{/each}
				</div>
			</div>
			<div>
				<div class="flex items-center justify-between gap-4">
					<h2 class="text-[11px] font-medium tracking-[0.2em] text-ink/70 uppercase">
						Recent searches
					</h2>
					{#if recent.length > 0}
						<button
							type="button"
							onclick={clearRecent}
							class="flex min-h-11 items-center px-2 text-sm font-medium text-sage-dark underline underline-offset-4 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
						>
							Clear
						</button>
					{/if}
				</div>
				{#if recent.length > 0}
					<div class="mt-4 flex flex-wrap gap-2">
						{#each recent as term}
							<button
								type="button"
								onclick={() => runSearch(term)}
								class="inline-flex min-h-11 items-center border border-stone-line bg-cream-2 px-4 text-sm text-ink transition hover:border-sage hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
							>
								{term}
							</button>
						{/each}
					</div>
				{:else}
					<p class="mt-4 text-sm text-ink/60">No recent searches yet.</p>
				{/if}
			</div>
		</div>
	{:else if results.length > 0}
		<p class="mt-10 text-sm text-ink/60" aria-live="polite">
			{results.length}
			{results.length === 1 ? 'result' : 'results'} for “{trimmed}”
		</p>
		<div class="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
			{#each results as product (product.slug)}
				<Reveal>
					<ProductCard {product} />
				</Reveal>
			{/each}
		</div>
	{:else}
		<div class="mt-10 border border-stone-line bg-cream-2 px-6 py-12 sm:px-10">
			<h2 class="font-display text-3xl font-medium text-ink">No results for “{trimmed}”</h2>
			<p class="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70">
				Check the spelling, or try a broader word like “knitwear”, “linen” or “trousers”.
			</p>
			<div class="mt-6 flex flex-wrap gap-2">
				{#each POPULAR as term}
					<button
						type="button"
						onclick={() => runSearch(term)}
						class="inline-flex min-h-11 items-center border border-stone-line bg-white/60 px-4 text-sm text-ink transition hover:border-sage hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						{term}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</section>
