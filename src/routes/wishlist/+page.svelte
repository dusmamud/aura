<script lang="ts">
	import { Heart } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { getProductBySlug } from '#lib/data/products';
	import { store } from '#lib/store.svelte';

	const items = $derived(
		store.wishlist
			.map((slug) => getProductBySlug(slug))
			.filter((p): p is NonNullable<typeof p> => Boolean(p))
	);
</script>

<svelte:head>
	<title>Wishlist — AURA Essentials</title>
	<meta
		name="description"
		content="Your AURA Essentials wishlist — the pieces you have saved for later."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/wishlist/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Wishlist — AURA Essentials" />
	<meta property="og:description" content="Your saved pieces from AURA Essentials." />
	<meta property="og:url" content="https://aura-design.pages.dev/wishlist/" />
	<meta property="og:image" content="https://aura-design.pages.dev/images/hero.jpg" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Reveal>
		<h1 class="font-display text-4xl leading-tight font-medium text-ink sm:text-5xl">Your Wishlist</h1>
		<p class="mt-3 text-base text-ink/75">
			{#if items.length > 0}
				{items.length} {items.length === 1 ? 'piece' : 'pieces'} saved for later.
			{:else}
				Nothing saved yet.
			{/if}
		</p>
	</Reveal>

	{#if items.length === 0}
		<div class="mt-12 flex flex-col items-center bg-cream-2 px-6 py-16 text-center">
			<Heart size={40} weight="light" class="text-sage-dark" />
			<h2 class="mt-4 font-display text-3xl font-medium text-ink">Your wishlist is empty</h2>
			<p class="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
				Tap the heart on any piece to save it here for later.
			</p>
			<a
				href="/new/"
				class="mt-6 inline-block min-h-11 bg-sage px-8 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Browse New Arrivals
			</a>
		</div>
	{:else}
		<div class="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
			{#each items as product (product.slug)}
				<Reveal><ProductCard {product} /></Reveal>
			{/each}
		</div>
		<p class="mt-8 text-sm text-ink/60">
			To remove a piece, tap its heart again — or find it on the product page.
		</p>
	{/if}
</div>
