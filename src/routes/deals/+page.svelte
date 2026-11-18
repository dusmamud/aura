<script lang="ts">
	import { Check, Copy, Tag, Truck } from 'phosphor-svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Reveal from '#lib/components/Reveal.svelte';
	import { PRODUCTS } from '#lib/data/products';
	import { toast } from '#lib/toast.svelte';

	// Seasonal Edit — display-only 20% off prices. products.ts is untouched.
	const SEASONAL_SLUGS = [
		'relaxed-merino-sweater',
		'oversized-cotton-shirt',
		'wide-leg-pleated-trouser',
		'relaxed-linen-blazer'
	];
	const seasonal = SEASONAL_SLUGS.map((slug) => {
		const p = PRODUCTS.find((x) => x.slug === slug)!;
		return { ...p, salePrice: Math.round(p.price * 0.8) };
	});

	let copied = $state(false);

	function copyCode() {
		if (navigator.clipboard) {
			navigator.clipboard.writeText('AURA20').then(
				() => {
					copied = true;
					toast.show('Code AURA20 copied');
					setTimeout(() => (copied = false), 3000);
				},
				() => toast.show('Code: AURA20')
			);
		} else {
			toast.show('Code: AURA20');
		}
	}
</script>

<svelte:head>
	<title>Deals — Spring Refresh 20% Off — AURA Essentials</title>
	<meta
		name="description"
		content="Spring Refresh: 20% off the Seasonal Edit with code AURA20 — merino sweater, cotton shirt, pleated trouser and linen blazer. Free shipping over $150."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/deals/" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<!-- Hero banner -->
	<section class="bg-sage-panel px-6 py-12 text-center sm:px-10 sm:py-16">
		<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">Seasonal Edit · Limited Time</p>
		<h1 class="mt-3 font-display text-4xl leading-tight font-medium text-ink sm:text-6xl">Spring Refresh</h1>
		<p class="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/75">
			Light layers. Fresh tones. 20% off four seasonal staples — while the edit lasts.
		</p>
		<p class="mt-6 font-display text-4xl font-medium text-ink">20% Off</p>
		<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
			<span class="inline-flex min-h-12 items-center border border-dashed border-sage-dark bg-cream px-5 font-mono text-base font-medium tracking-[0.18em] text-ink">
				AURA20
			</span>
			<button
				type="button"
				onclick={copyCode}
				class="inline-flex min-h-12 items-center gap-2 bg-sage px-6 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				{#if copied}<Check size={16} /> Copied!{:else}<Copy size={16} /> Copy Code{/if}
			</button>
		</div>
		<p class="mt-4 text-xs text-ink/60">
			Enter AURA20 at the cart page — the discount applies to your whole order subtotal.
		</p>
	</section>

	<!-- Free shipping reminder -->
	<div class="mt-6 flex items-center justify-center gap-2.5 border border-stone-line bg-cream-2 px-4 py-3.5 text-center">
		<Truck size={19} class="shrink-0 text-sage-dark" />
		<p class="text-sm text-ink/80">
			Free shipping on orders over $150 · Easy 30-day returns
		</p>
	</div>

	<!-- The edit -->
	<section class="mt-12">
		<Reveal>
			<div class="flex items-end justify-between gap-4">
				<div>
					<h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">The Seasonal Edit</h2>
					<p class="mt-2 text-sm text-ink/70">Four pieces, 20% off with code AURA20.</p>
				</div>
				<a
					href="/shop/?deal=AURA20"
					class="hidden shrink-0 text-sm text-ink/80 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-sage sm:inline-block"
				>
					Shop the edit →
				</a>
			</div>
		</Reveal>
		<div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
			{#each seasonal as product (product.slug)}
				<Reveal>
					<div class="relative">
						<span class="absolute left-3 top-3 z-10 flex items-center gap-1 bg-cream px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase">
							<Tag size={12} class="text-sage-dark" /> −20%
						</span>
						<ProductCard {product} />
						<p class="mt-1 flex items-baseline gap-2">
							<span class="text-base font-medium text-sage-dark">${product.salePrice}</span>
							<span class="text-sm text-ink/50 line-through">${product.price}</span>
							<span class="text-xs text-ink/60">with AURA20</span>
						</p>
					</div>
				</Reveal>
			{/each}
		</div>
	</section>

	<!-- How it works -->
	<section class="mt-14 border border-stone-line bg-cream-2 p-6 sm:p-8">
		<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">How the discount works</h2>
		<ol class="mt-5 grid gap-5 text-sm leading-relaxed text-ink/80 sm:grid-cols-3">
			<li>
				<p class="font-display text-2xl font-medium text-ink">1</p>
				<p class="mt-1"><strong class="font-medium text-ink">Add pieces to your bag</strong> — the Seasonal Edit above, or anything else you love.</p>
			</li>
			<li>
				<p class="font-display text-2xl font-medium text-ink">2</p>
				<p class="mt-1"><strong class="font-medium text-ink">Enter AURA20 at the cart page</strong> — 20% comes off your order subtotal.</p>
			</li>
			<li>
				<p class="font-display text-2xl font-medium text-ink">3</p>
				<p class="mt-1"><strong class="font-medium text-ink">Free shipping over $150</strong> — calculated after the discount, at checkout.</p>
			</li>
		</ol>
		<p class="mt-6 text-xs text-ink/60">
			Demo store — the code works in this demo checkout only, and no payment is taken.
		</p>
	</section>
</div>
