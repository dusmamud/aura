<script lang="ts">
	import { ArrowClockwise, ArrowRight, Headset, Lock, Truck } from 'phosphor-svelte';
	import { animate } from 'motion';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { CATEGORIES, LOOKS, PRODUCTS } from '#lib/data/products';

	// Hero entrance: staggered fade-up, opacity + transform only, max ~400ms.
	// Runs client-side only ($effect), never on the LCP image itself, and is
	// skipped entirely under prefers-reduced-motion (content stays visible:
	// no opacity-0 is ever written into the markup).
	let heroContent: HTMLDivElement | undefined = $state();
	$effect(() => {
		const root = heroContent;
		if (!root) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const items = root.querySelectorAll('.hero-anim');
		items.forEach((el, i) => {
			animate(
				el as HTMLElement,
				{ opacity: [0, 1], y: [14, 0] },
				{ duration: 0.4, delay: 0.05 + i * 0.08, ease: 'easeOut' }
			);
		});
	});

	const newArrivals = PRODUCTS.slice(0, 4);
	const favorites = [
		'cashmere-crew-neck',
		'everyday-tote',
		'ribbed-tank-top',
		'classic-wool-coat'
	].map((slug) => PRODUCTS.find((p) => p.slug === slug)!);

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
		'@graph': [
			{
				'@type': 'Organization',
				'@id': 'https://aura-design.pages.dev/#organization',
				name: 'AURA Essentials',
				url: 'https://aura-design.pages.dev/',
				slogan: 'Designed for life. Made to last.'
			},
			{
				'@type': 'WebSite',
				'@id': 'https://aura-design.pages.dev/#website',
				url: 'https://aura-design.pages.dev/',
				name: 'AURA Essentials',
				publisher: { '@id': 'https://aura-design.pages.dev/#organization' }
			}
		]
	};
</script>

<svelte:head>
	<title>AURA Essentials — Modern Essentials. Effortless Every Day.</title>
	<meta
		name="description"
		content="Timeless wardrobe essentials in warm neutrals — knitwear, shirts, trousers, jackets and accessories. Thoughtful design, made for real life."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="AURA Essentials — Modern Essentials. Effortless Every Day." />
	<meta
		property="og:description"
		content="Timeless pieces. Thoughtful design. Made for real life."
	/>
	<meta property="og:url" content="https://aura-design.pages.dev/" />
	<meta property="og:image" content="https://aura-design.pages.dev/images/hero.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<!-- Hero — full-bleed photo background (reference: model right, clean light
     arches left). Dark ink text over the light photo; a light cream gradient
     scrim sits only behind the text, the photo itself is never darkened and
     there is no solid box. min-height 78svh mobile / 92svh desktop. -->
<section class="relative overflow-hidden bg-cream">
	<enhanced:img
		src="#lib/assets/hero.jpg"
		alt="Woman wearing a relaxed linen blazer and wide-leg trousers from AURA Essentials"
		sizes="100vw"
		fetchpriority="high"
		class="absolute inset-0 h-full w-full object-cover object-[72%_center] lg:object-center"
	/>
	<div
		class="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/80 to-cream/15 lg:via-cream/65 lg:to-cream/0"
		aria-hidden="true"
	></div>
	<div
		bind:this={heroContent}
		class="relative mx-auto flex min-h-[78svh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:min-h-[92svh] lg:px-8"
	>
		<div class="max-w-xl">
			<h1
				class="hero-anim font-display text-[42px] leading-[1.08] font-medium text-ink sm:text-6xl lg:text-[64px]"
			>
				Modern Essentials.<br />Effortless Every Day.
			</h1>
			<p class="hero-anim mt-5 max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
				Timeless pieces. Thoughtful design.<br />Made for real life.
			</p>
			<div class="hero-anim mt-8 flex flex-wrap items-center gap-6">
				<a
					href="/shop/"
					class="inline-block bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Shop Now
				</a>
				<a
					href="/new/"
					class="group inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					New Arrivals
					<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Shop By Category -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<Reveal>
		<div class="flex items-end justify-between">
			<h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">Shop By Category</h2>
			<a
				href="/shop/"
				class="group inline-flex items-center gap-2 text-sm text-ink/80 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				View all
				<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
			</a>
		</div>
	</Reveal>
	<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
		{#each CATEGORIES as category}
			<Reveal>
				<a href="/shop/?category={category}" class="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">
					<div class="overflow-hidden bg-cream-2">
						<img
							src={categoryImages[category]}
							alt={category}
							width="400"
							height="500"
							loading="lazy"
							class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
						/>
					</div>
					<p class="mt-3 text-center text-sm text-ink">{category}</p>
				</a>
			</Reveal>
		{/each}
	</div>
</section>

<!-- Curated Looks -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
	<div class="grid bg-sage-panel lg:grid-cols-[280px_1fr]">
		<div class="flex flex-col items-start justify-center px-6 py-10 sm:px-10 lg:py-12">
			<h2 class="font-display text-3xl leading-tight font-medium text-ink sm:text-4xl">Curated<br />Looks</h2>
			<p class="mt-3 max-w-[220px] text-sm leading-relaxed text-ink/70">
				Outfits designed for how you live.
			</p>
			<a
				href="/lookbook/"
				class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Explore Looks
				<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
			</a>
		</div>
		<div class="grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-4 lg:grid-cols-4">
			{#each LOOKS as look}
				<a
					href="/lookbook/{look.slug}/"
					class="group block bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					<div class="overflow-hidden">
						<img
							src={look.image}
							alt="{look.title} — curated look"
							width="400"
							height="500"
							loading="lazy"
							class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
						/>
					</div>
					<div class="px-3 py-3 text-center">
						<p class="font-display text-lg leading-tight text-ink">{look.title}</p>
						<p class="mt-1 text-[11px] font-medium tracking-[0.14em] text-sage-dark uppercase">Shop the look</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- New Arrivals -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
	<div class="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
		<Reveal>
			<div class="lg:pt-2">
				<h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">New Arrivals</h2>
				<p class="mt-3 max-w-[200px] text-sm leading-relaxed text-ink/70">
					Outfits the latest pieces just added.
				</p>
				<a
					href="/new/"
					class="group mt-5 inline-flex items-center gap-2 text-sm text-ink/80 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					View all
					<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
				</a>
			</div>
		</Reveal>
		<div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
			{#each newArrivals as product (product.slug)}
				<Reveal>
					<ProductCard {product} />
				</Reveal>
			{/each}
		</div>
	</div>
</section>

<!-- Customer Favorites + Seasonal Edit -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Customer Favorites -->
		<div class="bg-cream-2 p-5 sm:p-7">
			<Reveal>
				<div class="flex items-end justify-between">
					<div>
						<h2 class="font-display text-3xl font-medium text-ink">Customer Favorites</h2>
						<p class="mt-1 text-sm text-ink/70">Timeless pieces. Loved every day.</p>
					</div>
					<a
						href="/shop/"
						class="group hidden items-center gap-2 text-sm text-ink/80 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage sm:inline-flex"
					>
						View all
						<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			</Reveal>
			<div class="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
				{#each favorites as product (product.slug)}
					<Reveal>
						<ProductCard {product} />
					</Reveal>
				{/each}
			</div>
		</div>

		<!-- Seasonal Edit -->
		<div class="relative overflow-hidden">
			<img
				src="/images/seasonal-trench.jpg"
				alt="Woman in a classic trench coat — Spring Refresh seasonal edit"
				width="900"
				height="1100"
				loading="lazy"
				class="absolute inset-0 h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-transparent"></div>
			<div class="relative flex h-full min-h-[420px] flex-col items-start justify-center p-6 sm:p-10">
				<p class="text-[11px] font-medium tracking-[0.2em] text-ink/70 uppercase">Seasonal Edit</p>
				<h2 class="mt-2 font-display text-4xl leading-tight font-medium text-ink sm:text-5xl">Spring Refresh</h2>
				<p class="mt-3 max-w-[240px] text-sm leading-relaxed text-ink/75">
					Light layers. Fresh tones. New season. New perspective.
				</p>
				<p class="mt-5 font-display text-3xl font-medium text-ink">20% Off</p>
				<p class="mt-1 text-xs text-ink/60">Selected styles for a limited time. Code AURA20.</p>
				<a
					href="/shop/?deal=AURA20"
					class="group mt-6 inline-flex items-center gap-2 bg-sage px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Shop The Edit
					<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Our Story — calm editorial strip (copy from the About page) -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
	<Reveal>
		<div class="relative overflow-hidden">
			<img
				src="/images/about-story.jpg"
				alt="AURA Essentials — timeless wardrobe pieces in warm neutrals"
				width="1920"
				height="1280"
				loading="lazy"
				class="absolute inset-0 h-full w-full object-cover"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-cream/10"
				aria-hidden="true"
			></div>
			<div class="relative flex min-h-[320px] max-w-xl flex-col items-start justify-center p-6 sm:p-10 lg:min-h-[380px]">
				<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">Our Story</p>
				<h2 class="mt-2 font-display text-3xl leading-tight font-medium text-ink sm:text-4xl">
					Designed for life.<br />Made to last.
				</h2>
				<p class="mt-3 max-w-md text-sm leading-relaxed text-ink/75 sm:text-base">
					Timeless wardrobe pieces in warm neutrals — thoughtful materials, honest
					craftsmanship and small batches, made for real life.
				</p>
				<a
					href="/about/"
					class="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Read our story
					<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
				</a>
			</div>
		</div>
	</Reveal>
</section>

<!-- Trust bar -->
<section class="border-t border-stone-line">
	<div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
		<div class="flex items-center gap-3">
			<Truck size={26} class="shrink-0 text-sage-dark" />
			<div>
				<p class="text-sm font-medium text-ink">Free Shipping</p>
				<p class="text-xs text-ink/60">On orders over $150</p>
			</div>
		</div>
		<div class="flex items-center gap-3">
			<ArrowClockwise size={26} class="shrink-0 text-sage-dark" />
			<div>
				<p class="text-sm font-medium text-ink">Easy Returns</p>
				<p class="text-xs text-ink/60">30 days return policy</p>
			</div>
		</div>
		<div class="flex items-center gap-3">
			<Lock size={26} class="shrink-0 text-sage-dark" />
			<div>
				<p class="text-sm font-medium text-ink">Secure Payments</p>
				<p class="text-xs text-ink/60">Safe &amp; encrypted</p>
			</div>
		</div>
		<div class="flex items-center gap-3">
			<Headset size={26} class="shrink-0 text-sage-dark" />
			<div>
				<p class="text-sm font-medium text-ink">Customer Care</p>
				<p class="text-xs text-ink/60">Here to help you</p>
			</div>
		</div>
	</div>
</section>
