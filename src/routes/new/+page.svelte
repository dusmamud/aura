<script lang="ts">
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { PRODUCTS, type Product } from '#lib/data/products';

	// The four newest pieces. Foundation note: no product in products.ts
	// currently carries badge: 'New', so this list is defined by slug here
	// (same four the home page shows as New Arrivals) rather than by badge.
	const NEW_SLUGS = [
		'relaxed-merino-sweater',
		'oversized-cotton-shirt',
		'wide-leg-pleated-trouser',
		'relaxed-linen-blazer'
	];

	const newArrivals: Product[] = NEW_SLUGS.map((slug) =>
		PRODUCTS.find((p) => p.slug === slug)
	).filter((p): p is Product => p !== undefined);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aura.pages.dev/' },
			{ '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://aura.pages.dev/shop/' },
			{
				'@type': 'ListItem',
				position: 3,
				name: 'New Arrivals',
				item: 'https://aura.pages.dev/new/'
			}
		]
	};
</script>

<svelte:head>
	<title>New Arrivals — AURA Essentials</title>
	<meta
		name="description"
		content="Just landed at AURA Essentials — a relaxed merino sweater, an oversized cotton shirt, wide-leg pleated trousers and a relaxed linen blazer. New season, same quiet quality."
	/>
	<link rel="canonical" href="https://aura.pages.dev/new/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="New Arrivals — AURA Essentials" />
	<meta
		property="og:description"
		content="Just landed — merino, cotton, pleated trousers and linen. The newest AURA pieces."
	/>
	<meta property="og:url" content="https://aura.pages.dev/new/" />
	<meta property="og:image" content="https://aura.pages.dev/images/prod-merino-sweater.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Reveal>
		<p class="text-[11px] font-medium tracking-[0.2em] text-ink/60 uppercase">
			<a href="/" class="hover:text-ink">Home</a>
			<span aria-hidden="true"> / </span>
			<a href="/shop/" class="hover:text-ink">Shop</a>
			<span aria-hidden="true"> / </span> New Arrivals
		</p>
		<h1 class="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">New Arrivals</h1>
		<p class="mt-3 max-w-xl text-base leading-relaxed text-ink/70">
			Just landed for the new season. Four pieces, each one made to earn its place in your
			wardrobe — soft merino, crisp cotton, easy tailoring and breathable linen.
		</p>
		<p class="mt-4 inline-block bg-sage-panel px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-ink uppercase">
			Just landed · {newArrivals.length} new pieces
		</p>
	</Reveal>

	<div class="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
		{#each newArrivals as product (product.slug)}
			<Reveal>
				<ProductCard {product} />
			</Reveal>
		{/each}
	</div>

	<Reveal>
		<div class="mt-12 flex flex-col items-start gap-4 border-t border-stone-line pt-8 sm:flex-row sm:items-center sm:justify-between">
			<p class="max-w-md text-[15px] leading-relaxed text-ink/70">
				New pieces sell through quickly. If a size is gone, check back — restocks land with
				each seasonal edit.
			</p>
			<a
				href="/shop/"
				class="inline-flex min-h-11 items-center bg-sage px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Shop all pieces
			</a>
		</div>
	</Reveal>
</section>
