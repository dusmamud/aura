<script lang="ts">
	import { ArrowRight } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { LOOKS } from '#lib/data/products';
</script>

<svelte:head>
	<title>Lookbook — AURA Essentials</title>
	<meta
		name="description"
		content="Four curated looks from AURA Essentials — soft layers, weekend ease, city minimal and effortless neutrals. Shop each look piece by piece."
	/>
	<link rel="canonical" href="https://aura.pages.dev/lookbook/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Lookbook — AURA Essentials" />
	<meta
		property="og:description"
		content="Four curated looks — soft layers, weekend ease, city minimal and effortless neutrals. Shop each look piece by piece."
	/>
	<meta property="og:url" content="https://aura.pages.dev/lookbook/" />
	<meta property="og:image" content="https://aura.pages.dev/images/look-soft-layers.jpg" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Reveal>
		<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">The Lookbook</p>
		<h1 class="mt-2 font-display text-4xl leading-tight font-medium text-ink sm:text-5xl">Curated Looks</h1>
		<p class="mt-3 max-w-xl text-base leading-relaxed text-ink/75">
			Outfits designed for how you live — put together piece by piece, ready to shop as a look or on their own.
		</p>
	</Reveal>

	<div class="mt-10 grid gap-6 sm:grid-cols-2">
		{#each LOOKS as look, i (look.slug)}
			<Reveal>
				<a
					href="/lookbook/{look.slug}/"
					class="group block bg-cream-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					<div class="overflow-hidden">
						<img
							src={look.image}
							alt="{look.title} — curated look"
							width="900"
							height="1125"
							loading={i === 0 ? 'eager' : 'lazy'}
							fetchpriority={i === 0 ? 'high' : undefined}
							class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
						/>
					</div>
					<div class="flex items-center justify-between px-5 py-5">
						<div>
							<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">{look.title}</h2>
							<p class="mt-1 text-[11px] font-medium tracking-[0.14em] text-sage-dark uppercase">
								{look.productSlugs.length} pieces · Shop the look
							</p>
						</div>
						<ArrowRight size={20} class="shrink-0 text-ink transition-transform group-hover:translate-x-1" />
					</div>
				</a>
			</Reveal>
		{/each}
	</div>
</div>
