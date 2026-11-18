<script lang="ts">
	import { ArrowRight, Clock, Heart, Leaf } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': 'https://aura-design.pages.dev/#organization',
		name: 'AURA Essentials',
		url: 'https://aura-design.pages.dev/',
		slogan: 'Designed for life. Made to last.'
	};

	const values = [
		{
			icon: Clock,
			title: 'Timeless design',
			text: 'No chasing trends. Clean lines, warm neutrals and cuts that still feel right next season — and the one after that.'
		},
		{
			icon: Leaf,
			title: 'Thoughtful materials',
			text: 'Natural fibres chosen for how they feel and how they last: merino, organic cotton, linen and cashmere.'
		},
		{
			icon: Heart,
			title: 'Made for real life',
			text: 'Clothes for work, weekends and everything in between — comfortable, easy to care for, and made to be worn often.'
		}
	];
</script>

<svelte:head>
	<title>Our Story — AURA Essentials</title>
	<meta
		name="description"
		content="AURA Essentials makes timeless wardrobe pieces in warm neutrals — thoughtful materials, honest craftsmanship and small batches, made for real life."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/about/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Our Story — AURA Essentials" />
	<meta
		property="og:description"
		content="Timeless pieces. Thoughtful design. Made for real life."
	/>
	<meta property="og:url" content="https://aura-design.pages.dev/about/" />
	<meta property="og:image" content="https://aura-design.pages.dev/images/about-story.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<!-- Hero / Our Story -->
<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
	<div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
		<Reveal>
			<div>
				<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">Our Story</p>
				<h1 class="mt-3 font-display text-[42px] leading-[1.08] font-medium text-ink sm:text-6xl">
					Designed for life.<br />Made to last.
				</h1>
				<p class="mt-5 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">
					AURA Essentials began with a simple frustration: wardrobes full of clothes, and
					nothing that felt quite right. So we set out to make the pieces we kept reaching
					for — the sweater that fits just so, the shirt that works tucked in or left loose,
					the coat that carries you through winter after winter.
				</p>
				<p class="mt-4 max-w-lg text-base leading-relaxed text-ink/75">
					We keep the collection small on purpose. Every piece earns its place, in warm
					neutrals that work together, in fabrics that feel good against the skin, and in
					cuts that move with real days — not just photo shoots.
				</p>
			</div>
		</Reveal>
		<Reveal>
			<img
				src="/images/about-story.jpg"
				alt="Inside the AURA Essentials studio — a rail of neutral knitwear and shirts"
				width="1080"
				height="1350"
				fetchpriority="high"
				class="aspect-[4/5] w-full object-cover"
			/>
		</Reveal>
	</div>
</section>

<!-- Values -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
	<Reveal>
		<h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">What we stand for</h2>
	</Reveal>
	<div class="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
		{#each values as value}
			<Reveal>
				<div class="h-full bg-cream-2 p-6 sm:p-7">
					<value.icon size={28} class="text-sage-dark" />
					<h3 class="mt-4 font-display text-2xl font-medium text-ink">{value.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-ink/70">{value.text}</p>
				</div>
			</Reveal>
		{/each}
	</div>
</section>

<!-- Craftsmanship -->
<section id="craftsmanship" class="scroll-mt-32 border-t border-stone-line">
	<div class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
		<Reveal>
			<img
				src="/images/about-craft.jpg"
				alt="Close-up of knitwear being finished by hand"
				width="1080"
				height="1350"
				loading="lazy"
				class="aspect-[4/5] w-full object-cover"
			/>
		</Reveal>
		<Reveal>
			<div>
				<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">Craftsmanship</p>
				<h2 class="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">Made carefully, in small batches</h2>
				<p class="mt-5 text-base leading-relaxed text-ink/75">
					We work in small batches so every piece can be checked properly — seams, fit,
					buttons, hems. If something isn't right, it doesn't ship. Making less, more
					carefully, also means less waste sitting unsold in a warehouse.
				</p>
				<p class="mt-4 text-base leading-relaxed text-ink/75">
					Our pieces are designed to be repaired, not replaced. A loose button or a small
					seam can be fixed in minutes, and a well-made sweater only gets softer with wear.
					Every product page carries care guidance for its fabric, so your favourites last
					longer.
				</p>
				<a
					href="/shop/"
					class="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Shop the collection
					<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
				</a>
			</div>
		</Reveal>
	</div>
</section>

<!-- Sustainability -->
<section id="sustainability" class="scroll-mt-32 border-t border-stone-line bg-cream-2">
	<div class="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
		<Reveal>
			<div class="lg:order-1">
				<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">Sustainability</p>
				<h2 class="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">Honest steps, not big promises</h2>
				<p class="mt-5 text-base leading-relaxed text-ink/75">
					We don't claim to be perfect — we're a small brand working to do better each
					season. Here's what we actually do today:
				</p>
				<ul class="mt-5 space-y-3 text-base leading-relaxed text-ink/75">
					<li class="flex gap-3">
						<span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true"></span>
						<span><strong class="font-medium text-ink">Natural fibres first.</strong> Merino wool, organic cotton, linen and cashmere — chosen for comfort, breathability and longevity.</span>
					</li>
					<li class="flex gap-3">
						<span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true"></span>
						<span><strong class="font-medium text-ink">Small batches.</strong> We produce in limited runs to avoid overproduction and unsold stock.</span>
					</li>
					<li class="flex gap-3">
						<span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true"></span>
						<span><strong class="font-medium text-ink">Built to last.</strong> Classic cuts and sturdy construction, so a piece stays in your wardrobe instead of landfill.</span>
					</li>
					<li class="flex gap-3">
						<span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true"></span>
						<span><strong class="font-medium text-ink">Less packaging.</strong> Orders ship in simple, minimal packaging — no excess boxes or fillers.</span>
					</li>
				</ul>
				<p class="mt-5 text-sm leading-relaxed text-ink/60">
					We don't hold third-party sustainability certifications, and we won't quote
					figures we can't stand behind. As we grow, we'll share what changes — plainly.
				</p>
			</div>
		</Reveal>
		<Reveal>
			<img
				src="/images/about-sustainability.jpg"
				alt="Natural fibres — folded knitwear in soft neutral tones"
				width="1080"
				height="1350"
				loading="lazy"
				class="aspect-[4/5] w-full object-cover lg:order-2"
			/>
		</Reveal>
	</div>
</section>

<!-- Careers -->
<section id="careers" class="scroll-mt-32 border-t border-stone-line">
	<div class="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
		<Reveal>
			<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">Careers</p>
			<h2 class="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">Come and build AURA with us</h2>
			<p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/75">
				We're a small team, and we hire slowly and carefully — when there's a real role to
				fill, not before. There are no open positions listed right now, but if you love
				what we make and think you could add something, we'd like to hear from you.
			</p>
			<a
				href="/help/"
				class="mt-7 inline-block min-h-11 bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Get in touch
			</a>
		</Reveal>
	</div>
</section>

<!-- Store Locator -->
<section id="stores" class="scroll-mt-32 border-t border-stone-line bg-sage-panel/60">
	<div class="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
		<Reveal>
			<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">Store Locator</p>
			<h2 class="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">Online only — for now</h2>
			<p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/75">
				AURA Essentials is an online-only store today, and we ship to customers everywhere
				we deliver. Our first flagship store is in the works — when it opens, you'll find
				the address, hours and opening date right here.
			</p>
			<p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/75">
				Until then, everything we make is available here on the site, with free shipping on
				orders over $150 and easy 30-day returns.
			</p>
			<div class="mt-7 flex flex-wrap items-center justify-center gap-4">
				<a
					href="/shop/"
					class="inline-block min-h-11 bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Shop online
				</a>
				<a
					href="/shipping/"
					class="inline-flex min-h-11 items-center text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Shipping &amp; delivery
				</a>
			</div>
		</Reveal>
	</div>
</section>
