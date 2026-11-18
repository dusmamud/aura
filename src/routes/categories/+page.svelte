<script lang="ts">
	import { ArrowRight } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { CATEGORIES, getProductsByCategory } from '#lib/data/products';

	const categoryImages: Record<string, string> = {
		Knitwear: '/images/cat-knitwear.jpg',
		Shirts: '/images/cat-shirts.jpg',
		Trousers: '/images/cat-trousers.jpg',
		Jackets: '/images/cat-jackets.jpg',
		Basics: '/images/cat-basics.jpg',
		Accessories: '/images/cat-accessories.jpg'
	};

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aura.pages.dev/' },
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Categories',
				item: 'https://aura.pages.dev/categories/'
			}
		]
	};
</script>

<svelte:head>
	<title>Categories — AURA Essentials</title>
	<meta
		name="description"
		content="Browse AURA Essentials by category — knitwear, shirts, trousers, jackets, basics and accessories. Timeless pieces in warm neutrals."
	/>
	<link rel="canonical" href="https://aura.pages.dev/categories/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Categories — AURA Essentials" />
	<meta
		property="og:description"
		content="Knitwear, shirts, trousers, jackets, basics and accessories — browse by category."
	/>
	<meta property="og:url" content="https://aura.pages.dev/categories/" />
	<meta property="og:image" content="https://aura.pages.dev/images/hero.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Reveal>
		<p class="text-[11px] font-medium tracking-[0.2em] text-ink/60 uppercase">
			<a href="/" class="hover:text-ink">Home</a>
			<span aria-hidden="true"> / </span> Categories
		</p>
		<h1 class="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">Browse by Category</h1>
		<p class="mt-3 max-w-xl text-base leading-relaxed text-ink/70">
			Six categories, one wardrobe logic: pieces that work together, season after season.
		</p>
	</Reveal>

	<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
		{#each CATEGORIES as category}
			{@const count = getProductsByCategory(category).length}
			<Reveal>
				<a
					href="/shop/?category={encodeURIComponent(category)}"
					class="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					aria-label="Shop {category} — {count} {count === 1 ? 'piece' : 'pieces'}"
				>
					<div class="relative overflow-hidden bg-cream-2">
						<img
							src={categoryImages[category]}
							alt={category}
							width="800"
							height="1000"
							loading="lazy"
							class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
						/>
						<div
							class="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/55 to-transparent px-5 pt-16 pb-5"
						>
							<div>
								<p class="font-display text-2xl font-medium text-white sm:text-3xl">{category}</p>
								<p class="mt-1 text-sm text-white/85">
									{count}
									{count === 1 ? 'piece' : 'pieces'}
								</p>
							</div>
							<span
								class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition group-hover:bg-sage group-hover:text-white"
								aria-hidden="true"
							>
								<ArrowRight size={19} />
							</span>
						</div>
					</div>
				</a>
			</Reveal>
		{/each}
	</div>

	<Reveal>
		<p class="mt-10 text-center text-sm text-ink/60">
			Looking for everything at once?
			<a
				href="/shop/"
				class="font-medium text-sage-dark underline underline-offset-4 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Shop all pieces
			</a>
		</p>
	</Reveal>
</section>
