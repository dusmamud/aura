<script lang="ts">
	import { browser } from '$app/env';
	import { MagnifyingGlass, SlidersHorizontal, X } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { CATEGORIES, DEALS, PRODUCTS } from '#lib/data/products';

	const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
	const COLOURS = [...new Set(PRODUCTS.map((p) => p.colour))];
	const NEW_SLUGS = [
		'relaxed-merino-sweater',
		'oversized-cotton-shirt',
		'wide-leg-pleated-trouser',
		'relaxed-linen-blazer'
	];
	const DEAL = DEALS[0];

	type Sort = 'featured' | 'price-asc' | 'price-desc' | 'newest';
	type PriceBand = 'all' | 'under100' | '100to150' | 'over150';

	let search = $state('');
	let sort = $state<Sort>('featured');
	let selectedCategories = $state<string[]>([]);
	let selectedSizes = $state<string[]>([]);
	let selectedColours = $state<string[]>([]);
	let priceBand = $state<PriceBand>('all');
	let filtersOpen = $state(false);
	let dealActive = $state(false);
	let queryApplied = $state(false);

	// Prerender-safe: read ?category= / ?deal= in the browser only, once.
	// No $effect is used for state sync — this only seeds the initial state.
	$effect(() => {
		if (!browser || queryApplied) return;
		queryApplied = true;
		const params = new URLSearchParams(window.location.search);
		const category = params.get('category');
		if (category && CATEGORIES.includes(category)) selectedCategories = [category];
		if (params.get('deal') === 'AURA20') dealActive = true;
		const q = params.get('q');
		if (q) search = q;
	});

	function toggle(list: string[], value: string): string[] {
		return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
	}

	function clearAll() {
		search = '';
		selectedCategories = [];
		selectedSizes = [];
		selectedColours = [];
		priceBand = 'all';
	}

	let activeFilterCount = $derived(
		selectedCategories.length +
			selectedSizes.length +
			selectedColours.length +
			(priceBand !== 'all' ? 1 : 0)
	);

	let filtered = $derived.by(() => {
		const q = search.trim().toLowerCase();
		let list = PRODUCTS.filter((p) => {
			if (dealActive && !p.seasonal) return false;
			if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
			if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
			if (selectedColours.length > 0 && !selectedColours.includes(p.colour)) return false;
			if (priceBand === 'under100' && p.price >= 100) return false;
			if (priceBand === '100to150' && (p.price < 100 || p.price > 150)) return false;
			if (priceBand === 'over150' && p.price <= 150) return false;
			if (
				q &&
				![p.name, p.category, p.colour].some((field) => field.toLowerCase().includes(q))
			)
				return false;
			return true;
		});
		if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
		if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
		if (sort === 'newest')
			list = [...list].sort((a, b) => {
				const ai = NEW_SLUGS.indexOf(a.slug);
				const bi = NEW_SLUGS.indexOf(b.slug);
				if (ai === -1 && bi === -1) return 0;
				if (ai === -1) return 1;
				if (bi === -1) return -1;
				return ai - bi;
			});
		return list;
	});

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aura.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://aura.pages.dev/shop/' }
		]
	};
</script>

<svelte:head>
	<title>Shop All — AURA Essentials</title>
	<meta
		name="description"
		content="Shop the full AURA Essentials collection — knitwear, shirts, trousers, jackets, basics and accessories in warm neutrals. Filter by category, size, colour and price."
	/>
	<link rel="canonical" href="https://aura.pages.dev/shop/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Shop All — AURA Essentials" />
	<meta
		property="og:description"
		content="The full AURA Essentials collection — timeless pieces in warm neutrals."
	/>
	<meta property="og:url" content="https://aura.pages.dev/shop/" />
	<meta property="og:image" content="https://aura.pages.dev/images/hero.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Reveal>
		<p class="text-[11px] font-medium tracking-[0.2em] text-ink/60 uppercase">
			<a href="/" class="hover:text-ink">Home</a>
			<span aria-hidden="true"> / </span> Shop
		</p>
		<h1 class="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">Shop All</h1>
		<p class="mt-3 max-w-xl text-base leading-relaxed text-ink/70">
			The full collection — knitwear, shirts, trousers, jackets, basics and accessories.
			Timeless pieces in warm neutrals, made for real life.
		</p>
	</Reveal>

	{#if dealActive && DEAL}
		<div
			class="mt-8 flex flex-wrap items-center justify-between gap-3 bg-sage-panel px-5 py-4"
			role="status"
		>
			<p class="text-sm text-ink">
				<span class="font-medium">Seasonal Edit — {DEAL.percentOff}% off</span>
				<span class="text-ink/70"> with code </span>
				<span class="font-medium tracking-widest">{DEAL.code}</span>
				<span class="text-ink/70"> at checkout.</span>
			</p>
			<button
				type="button"
				onclick={() => (dealActive = false)}
				aria-label="Dismiss offer"
				class="flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				<X size={20} />
			</button>
		</div>
	{/if}

	<!-- Toolbar -->
	<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
		<div class="relative flex-1">
			<MagnifyingGlass
				size={19}
				class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink/50"
			/>
			<input
				type="search"
				bind:value={search}
				placeholder="Search pieces, colours, categories…"
				aria-label="Search products"
				class="h-12 w-full border border-stone-line bg-white/60 pr-4 pl-11 text-[15px] text-ink placeholder:text-ink/45 focus:border-sage focus:outline-2 focus:outline-sage"
			/>
		</div>
		<div class="flex items-center gap-3">
			<label class="sr-only" for="sort">Sort products</label>
			<select
				id="sort"
				bind:value={sort}
				class="h-12 min-h-11 flex-1 border border-stone-line bg-white/60 px-3 text-sm text-ink focus:border-sage focus:outline-2 focus:outline-sage sm:flex-none"
			>
				<option value="featured">Featured</option>
				<option value="price-asc">Price: Low to High</option>
				<option value="price-desc">Price: High to Low</option>
				<option value="newest">Newest</option>
			</select>
			<button
				type="button"
				onclick={() => (filtersOpen = !filtersOpen)}
				aria-expanded={filtersOpen}
				aria-controls="shop-filters"
				class="inline-flex h-12 min-h-11 items-center gap-2 border border-stone-line bg-white/60 px-4 text-sm font-medium text-ink transition hover:border-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage lg:hidden"
			>
				<SlidersHorizontal size={18} />
				Filters
				{#if activeFilterCount > 0}
					<span
						class="flex h-5 min-w-5 items-center justify-center rounded-full bg-sage px-1.5 text-[11px] font-medium text-white"
					>
						{activeFilterCount}
					</span>
				{/if}
			</button>
		</div>
	</div>

	<p class="mt-4 text-sm text-ink/60" aria-live="polite">
		{filtered.length}
		{filtered.length === 1 ? 'piece' : 'pieces'}
		{#if search.trim()} matching “{search.trim()}”{/if}
	</p>

	<div class="mt-6 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
		<!-- Filters: one markup, collapsible on mobile, sidebar on desktop -->
		<aside
			id="shop-filters"
			class="{filtersOpen ? 'block' : 'hidden'} lg:block"
			aria-label="Product filters"
		>
			<div class="border border-stone-line bg-cream-2 p-5 lg:border-0 lg:bg-transparent lg:p-0">
				<div class="flex items-center justify-between">
					<h2 class="font-display text-xl font-medium text-ink">Filters</h2>
					{#if activeFilterCount > 0 || search.trim()}
						<button
							type="button"
							onclick={clearAll}
							class="flex min-h-11 items-center px-2 text-sm font-medium text-sage-dark underline underline-offset-4 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
						>
							Clear all
						</button>
					{/if}
				</div>

				<!-- Category -->
				<fieldset class="mt-6 border-t border-stone-line pt-5">
					<legend class="text-[11px] font-medium tracking-[0.18em] text-ink/70 uppercase">
						Category
					</legend>
					<div class="mt-3 flex flex-col gap-1">
						{#each CATEGORIES as category}
							<label
								class="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-ink"
							>
								<input
									type="checkbox"
									checked={selectedCategories.includes(category)}
									onchange={() =>
										(selectedCategories = toggle(selectedCategories, category))}
									class="h-5 w-5 shrink-0 accent-[#7A8B6F]"
								/>
								{category}
								<span class="ml-auto text-xs text-ink/50">
									({PRODUCTS.filter((p) => p.category === category).length})
								</span>
							</label>
						{/each}
					</div>
				</fieldset>

				<!-- Size -->
				<fieldset class="mt-6 border-t border-stone-line pt-5">
					<legend class="text-[11px] font-medium tracking-[0.18em] text-ink/70 uppercase">
						Size
					</legend>
					<div class="mt-3 flex flex-wrap gap-2">
						{#each SIZES as size}
							<button
								type="button"
								onclick={() => (selectedSizes = toggle(selectedSizes, size))}
								aria-pressed={selectedSizes.includes(size)}
								class="flex h-11 min-w-11 items-center justify-center border px-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage {selectedSizes.includes(
									size
								)
									? 'border-sage bg-sage text-white'
									: 'border-stone-line bg-white/60 text-ink hover:border-sage'}"
							>
								{size}
							</button>
						{/each}
					</div>
					<p class="mt-2 text-xs text-ink/50">Accessories are One Size.</p>
				</fieldset>

				<!-- Colour -->
				<fieldset class="mt-6 border-t border-stone-line pt-5">
					<legend class="text-[11px] font-medium tracking-[0.18em] text-ink/70 uppercase">
						Colour
					</legend>
					<div class="mt-3 flex flex-col gap-1">
						{#each COLOURS as colour}
							<label
								class="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-ink"
							>
								<input
									type="checkbox"
									checked={selectedColours.includes(colour)}
									onchange={() => (selectedColours = toggle(selectedColours, colour))}
									class="h-5 w-5 shrink-0 accent-[#7A8B6F]"
								/>
								{colour}
							</label>
						{/each}
					</div>
				</fieldset>

				<!-- Price -->
				<fieldset class="mt-6 border-t border-stone-line pt-5">
					<legend class="text-[11px] font-medium tracking-[0.18em] text-ink/70 uppercase">
						Price
					</legend>
					<div class="mt-3 flex flex-col gap-1">
						{#each [
							{ value: 'all', label: 'All prices' },
							{ value: 'under100', label: 'Under $100' },
							{ value: '100to150', label: '$100 – $150' },
							{ value: 'over150', label: 'Over $150' }
						] as band}
							<label
								class="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-ink"
							>
								<input
									type="radio"
									name="price-band"
									value={band.value}
									checked={priceBand === band.value}
									onchange={() => (priceBand = band.value as PriceBand)}
									class="h-5 w-5 shrink-0 accent-[#7A8B6F]"
								/>
								{band.label}
							</label>
						{/each}
					</div>
				</fieldset>
			</div>
		</aside>

		<!-- Results -->
		<div>
			{#if filtered.length > 0}
				<div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
					{#each filtered as product (product.slug)}
						<Reveal>
							<ProductCard {product} />
						</Reveal>
					{/each}
				</div>
			{:else}
				<div class="flex flex-col items-start border border-stone-line bg-cream-2 px-6 py-12 sm:px-10">
					<h2 class="font-display text-3xl font-medium text-ink">No pieces match</h2>
					<p class="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70">
						Try a different search or loosen a filter — or clear everything and start again.
					</p>
					<button
						type="button"
						onclick={clearAll}
						class="mt-6 inline-flex min-h-11 items-center bg-sage px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						Clear filters
					</button>
				</div>
			{/if}
		</div>
	</div>
</section>
