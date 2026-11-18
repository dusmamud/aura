<script lang="ts">
	import { Plus, Scales, Star, X } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { PRODUCTS, getProductBySlug } from '#lib/data/products';
	import { COMPARE_MAX, compareStore } from '#lib/compare.svelte';
	import { toast } from '#lib/toast.svelte';

	const compared = $derived(
		compareStore.list
			.map((slug) => getProductBySlug(slug))
			.filter((p): p is NonNullable<typeof p> => Boolean(p))
	);
	const remaining = $derived(PRODUCTS.filter((p) => !compareStore.isCompared(p.slug)));

	function addToCompare(slug: string, name: string) {
		if (!compareStore.add(slug)) {
			toast.show(`You can compare up to ${COMPARE_MAX} products`);
			return;
		}
		toast.show(`${name} added to comparison`);
	}
</script>

<svelte:head>
	<title>Compare — AURA Essentials</title>
	<meta
		name="description"
		content="Compare up to 3 AURA Essentials pieces side by side — price, category, colour and sizes."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/compare/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Compare — AURA Essentials" />
	<meta property="og:description" content="Compare up to 3 pieces side by side — price, category, colour and sizes." />
	<meta property="og:url" content="https://aura-design.pages.dev/compare/" />
	<meta property="og:image" content="https://aura-design.pages.dev/images/hero.jpg" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Reveal>
		<h1 class="font-display text-4xl leading-tight font-medium text-ink sm:text-5xl">Compare</h1>
		<p class="mt-3 max-w-xl text-base leading-relaxed text-ink/75">
			Side by side, up to {COMPARE_MAX} pieces. Add products from any product page or from the picker below.
		</p>
	</Reveal>

	{#if compared.length === 0}
		<div class="mt-12 flex flex-col items-center bg-cream-2 px-6 py-16 text-center">
			<Scales size={40} weight="light" class="text-sage-dark" />
			<h2 class="mt-4 font-display text-3xl font-medium text-ink">Nothing to compare yet</h2>
			<p class="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
				Pick up to {COMPARE_MAX} pieces below — or tap “Add to comparison” on any product page.
			</p>
		</div>
	{:else}
		<div class="mt-10 overflow-x-auto">
			<table class="w-full min-w-[560px] border-collapse">
				<caption class="sr-only">Product comparison</caption>
				<thead>
					<tr>
						<th scope="col" class="w-28 p-2 text-left align-bottom text-xs font-medium tracking-[0.12em] text-ink/60 uppercase">Product</th>
						{#each compared as product (product.slug)}
							<th scope="col" class="min-w-44 p-2 align-top">
								<div class="relative bg-cream-2">
									<a href="/product/{product.slug}/" tabindex="-1">
										<img src={product.image} alt={product.name} width="300" height="375" loading="lazy" class="aspect-[4/5] w-full object-cover" />
									</a>
									<button
										type="button"
										onclick={() => compareStore.remove(product.slug)}
										aria-label="Remove {product.name} from comparison"
										class="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-ink shadow-sm transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
									>
										<X size={18} />
									</button>
								</div>
								<p class="mt-2 text-left text-base font-medium leading-snug">
									<a href="/product/{product.slug}/" class="transition hover:text-sage-dark">{product.name}</a>
								</p>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody class="text-sm">
					<tr class="border-t border-stone-line">
						<th scope="row" class="p-3 text-left font-medium text-ink/60">Price</th>
						{#each compared as product (product.slug)}
							<td class="p-3 text-base font-medium text-ink">
								${product.price}
								{#if product.compareAt}<span class="ml-1 text-sm font-normal text-ink/50 line-through">${product.compareAt}</span>{/if}
							</td>
						{/each}
					</tr>
					<tr class="border-t border-stone-line">
						<th scope="row" class="p-3 text-left font-medium text-ink/60">Category</th>
						{#each compared as product (product.slug)}<td class="p-3">{product.category}</td>{/each}
					</tr>
					<tr class="border-t border-stone-line">
						<th scope="row" class="p-3 text-left font-medium text-ink/60">Colour</th>
						{#each compared as product (product.slug)}<td class="p-3">{product.colour}</td>{/each}
					</tr>
					<tr class="border-t border-stone-line">
						<th scope="row" class="p-3 text-left font-medium text-ink/60">Sizes</th>
						{#each compared as product (product.slug)}<td class="p-3">{product.sizes.join(', ')}</td>{/each}
					</tr>
					<tr class="border-t border-stone-line">
						<th scope="row" class="p-3 text-left font-medium text-ink/60">Reviews</th>
						{#each compared as product (product.slug)}
							<td class="p-3">
								{#if product.reviewCount}
									<span class="inline-flex items-center gap-1">
										<Star size={14} weight="fill" class="text-sage-dark" aria-hidden="true" />
										{product.reviewCount} reviews
									</span>
								{:else}
									<span class="text-ink/50">—</span>
								{/if}
							</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>
		{#if compared.length === 1}
			<p class="mt-4 text-sm text-sage-dark">Add at least one more piece below to compare side by side.</p>
		{/if}
		<button
			type="button"
			onclick={() => compareStore.clear()}
			class="mt-6 min-h-11 border border-stone-line px-5 text-sm text-ink transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
		>
			Clear comparison
		</button>
	{/if}

	{#if compared.length < COMPARE_MAX}
		<section class="mt-14">
			<Reveal>
				<h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">
					{compared.length === 0 ? 'Pick up to 3 pieces' : 'Add another piece'}
				</h2>
				<p class="mt-2 text-sm text-ink/70">{COMPARE_MAX - compared.length} {COMPARE_MAX - compared.length === 1 ? 'slot' : 'slots'} left.</p>
			</Reveal>
			<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
				{#each remaining as product (product.slug)}
					<Reveal>
						<ProductCard {product} />
						<button
							type="button"
							onclick={() => addToCompare(product.slug, product.name)}
							class="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-stone-line px-4 text-sm text-ink transition hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
						>
							<Plus size={16} />
							Add to compare
						</button>
					</Reveal>
				{/each}
			</div>
		</section>
	{/if}
</div>
