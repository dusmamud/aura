<script lang="ts">
	import { ArrowRight } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { DEALS, LOOKS } from '#lib/data/products';

	const DEAL = DEALS[0];

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aura.pages.dev/' },
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Collections',
				item: 'https://aura.pages.dev/collections/'
			}
		]
	};
</script>

<svelte:head>
	<title>Collections — AURA Essentials</title>
	<meta
		name="description"
		content="AURA Essentials collections — the Spring Refresh seasonal edit at 20% off, curated looks to shop as outfits, and the everyday Essentials that never leave the rail."
	/>
	<link rel="canonical" href="https://aura.pages.dev/collections/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Collections — AURA Essentials" />
	<meta
		property="og:description"
		content="Seasonal Edit, Curated Looks and everyday Essentials — three ways into the collection."
	/>
	<meta property="og:url" content="https://aura.pages.dev/collections/" />
	<meta property="og:image" content="https://aura.pages.dev/images/seasonal-trench.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Reveal>
		<p class="text-[11px] font-medium tracking-[0.2em] text-ink/60 uppercase">
			<a href="/" class="hover:text-ink">Home</a>
			<span aria-hidden="true"> / </span> Collections
		</p>
		<h1 class="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">Collections</h1>
		<p class="mt-3 max-w-xl text-base leading-relaxed text-ink/70">
			Three ways into the wardrobe: the season's edit, outfits put together for you, and the
			essentials that never leave the rail.
		</p>
	</Reveal>

	<div class="mt-10 grid gap-6 lg:grid-cols-3">
		<!-- Seasonal Edit -->
		<Reveal>
			<article class="group flex h-full flex-col border border-stone-line bg-cream-2">
				<div class="relative overflow-hidden">
					<img
						src="/images/seasonal-trench.jpg"
						alt="Woman in a classic trench coat — Spring Refresh seasonal edit"
						width="900"
						height="1100"
						loading="lazy"
						class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
					/>
					{#if DEAL}
						<span
							class="absolute top-3 left-3 bg-cream px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase"
						>
							{DEAL.percentOff}% off · Code {DEAL.code}
						</span>
					{/if}
				</div>
				<div class="flex flex-1 flex-col p-5 sm:p-6">
					<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">
						Seasonal Edit
					</p>
					<h2 class="mt-2 font-display text-3xl font-medium text-ink">Spring Refresh</h2>
					<p class="mt-2 flex-1 text-[15px] leading-relaxed text-ink/70">
						Light layers, fresh tones, a new perspective. Selected styles for a limited
						time — {#if DEAL}{DEAL.percentOff}% off with code {DEAL.code} at checkout.{/if}
					</p>
					<a
						href="/shop/?deal=AURA20"
						class="group/link mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						Shop the edit
						<ArrowRight size={16} class="transition-transform group-hover/link:translate-x-1" />
					</a>
				</div>
			</article>
		</Reveal>

		<!-- Curated Looks -->
		<Reveal>
			<article class="group flex h-full flex-col border border-stone-line bg-cream-2">
				<div class="relative overflow-hidden">
					<img
						src={LOOKS[0].image}
						alt="{LOOKS[0].title} — a curated AURA look"
						width="800"
						height="1000"
						loading="lazy"
						class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
					/>
					<span
						class="absolute top-3 left-3 bg-cream px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase"
					>
						{LOOKS.length} looks
					</span>
				</div>
				<div class="flex flex-1 flex-col p-5 sm:p-6">
					<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">
						Curated Looks
					</p>
					<h2 class="mt-2 font-display text-3xl font-medium text-ink">Outfits, Done For You</h2>
					<p class="mt-2 flex-1 text-[15px] leading-relaxed text-ink/70">
						Outfits designed for how you live — from Soft Layers to City Minimal. Shop
						each look piece by piece.
					</p>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each LOOKS as look}
							<a
								href="/lookbook/{look.slug}/"
								class="inline-flex min-h-11 items-center border border-stone-line bg-white/60 px-3 text-xs font-medium text-ink transition hover:border-sage hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
							>
								{look.title}
							</a>
						{/each}
					</div>
					<a
						href="/lookbook/"
						class="group/link mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						Explore the lookbook
						<ArrowRight size={16} class="transition-transform group-hover/link:translate-x-1" />
					</a>
				</div>
			</article>
		</Reveal>

		<!-- Essentials -->
		<Reveal>
			<article class="group flex h-full flex-col border border-stone-line bg-cream-2">
				<div class="relative overflow-hidden">
					<img
						src="/images/cat-basics.jpg"
						alt="Everyday basics — ribbed tanks and organic cotton tees"
						width="800"
						height="1000"
						loading="lazy"
						class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
					/>
					<span
						class="absolute top-3 left-3 bg-cream px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase"
					>
						Always in stock
					</span>
				</div>
				<div class="flex flex-1 flex-col p-5 sm:p-6">
					<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">Essentials</p>
					<h2 class="mt-2 font-display text-3xl font-medium text-ink">The Everyday Core</h2>
					<p class="mt-2 flex-1 text-[15px] leading-relaxed text-ink/70">
						The basics everything else is built on — ribbed tanks and heavyweight organic
						tees in warm neutrals. Cut close, never tight, made to layer.
					</p>
					<a
						href="/shop/?category=Basics"
						class="group/link mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						Shop essentials
						<ArrowRight size={16} class="transition-transform group-hover/link:translate-x-1" />
					</a>
				</div>
			</article>
		</Reveal>
	</div>
</section>
