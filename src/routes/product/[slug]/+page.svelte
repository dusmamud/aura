<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, CaretDown, Heart, Minus, Plus, Scales, Star } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import SizeGuideModal from '#lib/components/SizeGuideModal.svelte';
	import { getProductBySlug, getProductsByCategory } from '#lib/data/products';
	import { compareStore } from '#lib/compare.svelte';
	import { store } from '#lib/store.svelte';
	import { toast } from '#lib/toast.svelte';

	let { data } = $props();
	const product = $derived(data.product);

	const isOneSize = product.sizes.length === 1 && product.sizes[0] === 'One Size';
	let selectedSize: string | null = $state(isOneSize ? 'One Size' : null);
	let qty = $state(1);
	let sizeGuideOpen = $state(false);

	let wishlisted = $derived(store.isWishlisted(product.slug));
	let compared = $derived(compareStore.isCompared(product.slug));

	onMount(() => {
		store.addRecent(product.slug);
	});

	const related = $derived(
		getProductsByCategory(product.category)
			.filter((p) => p.slug !== product.slug)
			.slice(0, 4)
	);

	const recent = $derived(
		store.recentlyViewed
			.filter((slug) => slug !== product.slug)
			.map((slug) => getProductBySlug(slug))
			.filter((p): p is NonNullable<typeof p> => Boolean(p))
	);

	const careCopy: Record<string, string> = {
		Knitwear:
			'Knitwear in this edit is made to be worn often and cared for gently. Hand wash cold or dry clean, reshape while damp and dry flat. Do not tumble dry. Follow the care label inside the garment.',
		Shirts:
			'Machine wash cold with like colours, or dry clean for a crisper finish. Hang to dry and press on a low heat if needed. Follow the care label inside the garment.',
		Trousers:
			'Machine wash cold with like colours, or dry clean. Hang to dry and press on a low heat if needed. Follow the care label inside the garment.',
		Jackets:
			'Brush off dust after wear and air between wears. Dry clean when needed, and store on a wide hanger. Follow the care label inside the garment.',
		Basics:
			'Machine wash cold with like colours and hang to dry to keep the shape. Avoid high heat. Follow the care label inside the garment.',
		Accessories:
			'Wipe clean with a soft, dry cloth and keep away from water and direct sun. Store in the dust bag when not in use.'
	};

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		description: product.blurb,
		image: `https://aura.pages.dev${product.image}`,
		category: product.category,
		color: product.colour,
		offers: {
			'@type': 'Offer',
			url: `https://aura.pages.dev/product/${product.slug}/`,
			priceCurrency: 'USD',
			price: product.price,
			availability: 'https://schema.org/InStock'
		}
	});

	function addToBag() {
		if (!selectedSize) return;
		store.addToCart(product.slug, selectedSize, qty);
		store.cartOpen = true;
		toast.show(`${product.name} (${selectedSize}) added to your bag`);
	}

	function toggleHeart() {
		store.toggleWishlist(product.slug);
		toast.show(
			store.isWishlisted(product.slug)
				? `${product.name} added to your wishlist`
				: `${product.name} removed from your wishlist`
		);
	}

	function toggleCompare() {
		if (compared) {
			compareStore.remove(product.slug);
			toast.show(`${product.name} removed from comparison`);
			return;
		}
		if (!compareStore.add(product.slug)) {
			toast.show('You can compare up to 3 products');
			return;
		}
		toast.show(`${product.name} added to comparison`);
	}
</script>

<svelte:head>
	<title>{product.name} — AURA Essentials</title>
	<meta name="description" content={product.blurb} />
	<link rel="canonical" href="https://aura.pages.dev/product/{product.slug}/" />
	<meta property="og:type" content="product" />
	<meta property="og:title" content="{product.name} — AURA Essentials" />
	<meta property="og:description" content={product.blurb} />
	<meta property="og:url" content="https://aura.pages.dev/product/{product.slug}/" />
	<meta property="og:image" content="https://aura.pages.dev{product.image}" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
	<nav aria-label="Breadcrumb" class="text-sm text-ink/60">
		<ol class="flex flex-wrap items-center gap-1.5">
			<li><a href="/" class="transition hover:text-ink focus-visible:outline-2 focus-visible:outline-sage">Home</a></li>
			<li aria-hidden="true">/</li>
			<li><a href="/shop/" class="transition hover:text-ink focus-visible:outline-2 focus-visible:outline-sage">Shop</a></li>
			<li aria-hidden="true">/</li>
			<li>
				<a href="/shop/?category={product.category}" class="transition hover:text-ink focus-visible:outline-2 focus-visible:outline-sage">
					{product.category}
				</a>
			</li>
			<li aria-hidden="true">/</li>
			<li aria-current="page" class="text-ink">{product.name}</li>
		</ol>
	</nav>

	<div class="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
		<!-- Image -->
		<div class="bg-cream-2">
			<img
				src={product.image}
				alt={product.name}
				width="900"
				height="1125"
				fetchpriority="high"
				class="aspect-[4/5] w-full object-cover"
			/>
		</div>

		<!-- Buy box -->
		<div>
			{#if product.badge}
				<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">{product.badge}</p>
			{/if}
			<h1 class="mt-2 font-display text-4xl leading-tight font-medium text-ink sm:text-5xl">{product.name}</h1>
			{#if product.reviewCount}
				<p class="mt-3 flex items-center gap-1.5 text-sm text-ink/60" aria-label="{product.reviewCount} reviews">
					<span class="flex text-sage-dark" aria-hidden="true">
						{#each [0, 1, 2, 3, 4] as _}
							<Star size={15} weight="fill" />
						{/each}
					</span>
					({product.reviewCount} reviews)
				</p>
			{/if}
			<p class="mt-4 flex items-baseline gap-3">
				<span class="text-2xl font-medium text-ink">${product.price}</span>
				{#if product.compareAt}
					<span class="text-lg text-ink/50 line-through">${product.compareAt}</span>
				{/if}
			</p>
			<p class="mt-4 text-base leading-relaxed text-ink/75">{product.blurb}</p>
			<p class="mt-3 text-sm text-ink/70">Colour — <span class="font-medium text-ink">{product.colour}</span></p>

			<!-- Size -->
			<div class="mt-7">
				<div class="flex items-center justify-between">
					<p id="size-label" class="text-sm font-medium text-ink">
						Size{#if selectedSize} — {selectedSize}{/if}
					</p>
					<button
						type="button"
						onclick={() => (sizeGuideOpen = true)}
						class="text-sm text-sage-dark underline underline-offset-4 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						Size Guide
					</button>
				</div>
				<div class="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby="size-label">
					{#each product.sizes as size}
						<button
							type="button"
							onclick={() => (selectedSize = size)}
							aria-pressed={selectedSize === size}
							class="flex min-h-11 min-w-11 items-center justify-center border px-4 py-2.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage {selectedSize === size
								? 'border-ink bg-ink text-cream'
								: 'border-stone-line bg-cream text-ink hover:border-ink'}"
						>
							{size}
						</button>
					{/each}
				</div>
				{#if !selectedSize}
					<p class="mt-2 text-sm text-sage-dark" role="alert">Please choose a size before adding to your bag.</p>
				{/if}
			</div>

			<!-- Qty + Add to bag -->
			<div class="mt-7 flex flex-wrap items-stretch gap-3">
				<div class="flex items-center border border-stone-line" aria-label="Quantity">
					<button
						type="button"
						onclick={() => (qty = Math.max(1, qty - 1))}
						disabled={qty <= 1}
						aria-label="Decrease quantity"
						class="flex h-12 w-11 items-center justify-center text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-sage disabled:opacity-40"
					>
						<Minus size={16} />
					</button>
					<span class="w-10 text-center text-base" aria-label="Quantity">{qty}</span>
					<button
						type="button"
						onclick={() => (qty = Math.min(9, qty + 1))}
						disabled={qty >= 9}
						aria-label="Increase quantity"
						class="flex h-12 w-11 items-center justify-center text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-sage disabled:opacity-40"
					>
						<Plus size={16} />
					</button>
				</div>
				<button
					type="button"
					onclick={addToBag}
					disabled={!selectedSize}
					class="min-h-12 flex-1 bg-sage px-6 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage disabled:cursor-not-allowed disabled:opacity-50"
				>
					{selectedSize ? 'Add to Bag' : 'Select a size'}
				</button>
				<button
					type="button"
					onclick={toggleHeart}
					aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
					aria-pressed={wishlisted}
					class="flex h-12 w-12 items-center justify-center border border-stone-line text-ink transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					<Heart size={21} weight={wishlisted ? 'fill' : 'regular'} class={wishlisted ? 'text-sage-dark' : ''} />
				</button>
			</div>

			<button
				type="button"
				onclick={toggleCompare}
				aria-pressed={compared}
				class="mt-4 inline-flex min-h-11 items-center gap-2 border border-stone-line px-5 text-sm text-ink transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				<Scales size={18} />
				{compared ? 'Remove from comparison' : 'Add to comparison'}
			</button>

			<!-- Accordions -->
			<div class="mt-8 divide-y divide-stone-line border-y border-stone-line">
				<details class="group py-4">
					<summary class="flex cursor-pointer list-none items-center justify-between text-base font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">
						Fabric &amp; care
						<CaretDown size={18} class="transition-transform group-open:rotate-180" />
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-ink/75">{careCopy[product.category] ?? careCopy['Basics']}</p>
				</details>
				<details class="group py-4">
					<summary class="flex cursor-pointer list-none items-center justify-between text-base font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">
						Shipping &amp; returns
						<CaretDown size={18} class="transition-transform group-open:rotate-180" />
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-ink/75">
						Free shipping on orders over $150. Orders are dispatched within 2 working days.
						Not right? Return unworn items within 30 days for a full refund.
					</p>
				</details>
			</div>
			<p class="mt-4 text-sm text-ink/60">Free shipping over $150 · 30-day returns · Secure checkout</p>
		</div>
	</div>

	<!-- Related -->
	{#if related.length > 0}
		<section class="mt-14 lg:mt-20">
			<Reveal>
				<div class="flex items-end justify-between">
					<h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">You May Also Like</h2>
					<a href="/shop/?category={product.category}" class="group hidden items-center gap-2 text-sm text-ink/80 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage sm:inline-flex">
						View all {product.category}
						<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			</Reveal>
			<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
				{#each related as item (item.slug)}
					<Reveal><ProductCard product={item} /></Reveal>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Recently viewed -->
	{#if recent.length > 0}
		<section class="mt-14 lg:mt-20">
			<Reveal><h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">Recently Viewed</h2></Reveal>
			<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
				{#each recent as item (item.slug)}
					<Reveal><ProductCard product={item} /></Reveal>
				{/each}
			</div>
		</section>
	{/if}
</div>

<SizeGuideModal open={sizeGuideOpen} onClose={() => (sizeGuideOpen = false)} />

<!-- Compare tray -->
{#if compareStore.list.length > 0}
	<div class="fixed inset-x-0 bottom-0 z-30 border-t border-stone-line bg-cream shadow-[0_-4px_16px_rgba(43,43,40,0.08)]">
		<div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
			<p class="text-sm text-ink">
				<strong class="font-medium">{compareStore.list.length} of 3</strong> selected for comparison
			</p>
			<div class="flex items-center gap-3">
				<button
					type="button"
					onclick={() => compareStore.clear()}
					class="min-h-11 px-3 text-sm text-ink/70 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Clear
				</button>
				<a
					href="/compare/"
					class="inline-flex min-h-11 items-center gap-2 bg-sage px-5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Compare now <ArrowRight size={16} />
				</a>
			</div>
		</div>
	</div>
{/if}
