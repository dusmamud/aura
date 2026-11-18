<script lang="ts">
	import { ArrowLeft, ShoppingBag } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { store } from '#lib/store.svelte';
	import { toast } from '#lib/toast.svelte';

	let { data } = $props();
	const look = $derived(data.look);

	function quickAdd(slug: string, name: string, sizes: string[]) {
		const size = sizes.includes('M') ? 'M' : sizes[0];
		store.addToCart(slug, size, 1);
		store.cartOpen = true;
		toast.show(`${name} (${size}) added to your bag`);
	}
</script>

<svelte:head>
	<title>{look.title} — Lookbook — AURA Essentials</title>
	<meta
		name="description"
		content="Shop the {look.title} look from AURA Essentials — {data.products.map((p) => p.name).join(', ')}."
	/>
	<link rel="canonical" href="https://aura.pages.dev/lookbook/{look.slug}/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{look.title} — Lookbook — AURA Essentials" />
	<meta property="og:description" content="Shop the {look.title} look — {data.products.length} pieces." />
	<meta property="og:url" content="https://aura.pages.dev/lookbook/{look.slug}/" />
	<meta property="og:image" content="https://aura.pages.dev{look.image}" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
	<a
		href="/lookbook/"
		class="group inline-flex items-center gap-2 text-sm text-ink/70 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
	>
		<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
		All looks
	</a>

	<div class="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
		<div class="bg-cream-2">
			<img
				src={look.image}
				alt="{look.title} — curated look"
				width="900"
				height="1125"
				fetchpriority="high"
				class="aspect-[4/5] w-full object-cover"
			/>
		</div>
		<div class="lg:pt-4">
			<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">The Lookbook</p>
			<h1 class="mt-2 font-display text-4xl leading-tight font-medium text-ink sm:text-5xl">{look.title}</h1>
			<p class="mt-4 max-w-md text-base leading-relaxed text-ink/75">
				Worn together as one easy outfit — or on their own, whenever you like.
				Quick add uses size M where available; choose another size on the product page.
			</p>
			<p class="mt-3 text-sm text-ink/60">{data.products.length} pieces in this look</p>
			<a
				href="/shop/"
				class="mt-6 inline-block min-h-11 bg-sage px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Shop all pieces
			</a>
		</div>
	</div>

	<section class="mt-12 lg:mt-16">
		<Reveal><h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">Shop the Look</h2></Reveal>
		<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
			{#each data.products as product (product.slug)}
				<Reveal>
					<ProductCard {product} />
					<button
						type="button"
						onclick={() => quickAdd(product.slug, product.name, product.sizes)}
						class="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-stone-line px-4 text-sm text-ink transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						<ShoppingBag size={17} />
						{product.sizes.includes('One Size') ? 'Add to Bag' : 'Quick add · M'}
					</button>
				</Reveal>
			{/each}
		</div>
	</section>
</div>
