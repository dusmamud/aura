<script lang="ts">
	import { ArrowRight } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';
</script>

<svelte:head>
	<title>Shipping &amp; Delivery — AURA Essentials</title>
	<meta
		name="description"
		content="Free shipping on orders over $150, $8 flat otherwise. Orders dispatch within 1–2 business days — standard delivery 3–5 business days, international 7–14."
	/>
	<link rel="canonical" href="https://aura.pages.dev/shipping/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Shipping & Delivery — AURA Essentials" />
	<meta
		property="og:description"
		content="Free shipping over $150, $8 flat otherwise. Dispatched within 1–2 business days."
	/>
	<meta property="og:url" content="https://aura.pages.dev/shipping/" />
	<meta property="og:image" content="https://aura.pages.dev/images/hero.jpg" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
	<Reveal>
		<nav aria-label="Breadcrumb" class="text-sm text-ink/60">
			<a href="/help/" class="transition hover:text-ink">Help</a>
			<span aria-hidden="true"> / </span>
			<span aria-current="page" class="text-ink">Shipping &amp; Delivery</span>
		</nav>
		<h1 class="mt-4 font-display text-[42px] leading-[1.08] font-medium text-ink sm:text-5xl">Shipping &amp; Delivery</h1>
		<p class="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
			Free shipping on orders over $150. A flat $8 fee applies to smaller orders.
		</p>
	</Reveal>

	<Reveal>
		<div class="mt-8 overflow-x-auto">
			<table class="w-full min-w-[480px] border-collapse text-left text-sm">
				<caption class="sr-only">Shipping rates and estimated delivery times</caption>
				<thead>
					<tr class="border-b border-stone-line">
						<th scope="col" class="py-3 pr-4 font-medium text-ink">Delivery</th>
						<th scope="col" class="py-3 pr-4 font-medium text-ink">Cost</th>
						<th scope="col" class="py-3 font-medium text-ink">Estimated time</th>
					</tr>
				</thead>
				<tbody class="text-ink/75">
					<tr class="border-b border-stone-line">
						<td class="py-3 pr-4">Standard (orders over $150)</td>
						<td class="py-3 pr-4 font-medium text-ink">Free</td>
						<td class="py-3">3–5 business days</td>
					</tr>
					<tr class="border-b border-stone-line">
						<td class="py-3 pr-4">Standard (orders under $150)</td>
						<td class="py-3 pr-4 font-medium text-ink">$8 flat</td>
						<td class="py-3">3–5 business days</td>
					</tr>
					<tr>
						<td class="py-3 pr-4">International</td>
						<td class="py-3 pr-4 font-medium text-ink">Calculated at checkout</td>
						<td class="py-3">7–14 business days</td>
					</tr>
				</tbody>
			</table>
		</div>
	</Reveal>

	<div class="mt-10 space-y-8">
		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">When will my order dispatch?</h2>
				<p class="mt-3 text-base leading-relaxed text-ink/75">
					Orders are dispatched within 1–2 business days of being placed. Orders placed
					over the weekend go out on the next business day. Once your order leaves us,
					you'll receive an email with a tracking link so you can follow it on its way.
				</p>
			</section>
		</Reveal>
		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">International delivery</h2>
				<p class="mt-3 text-base leading-relaxed text-ink/75">
					We ship internationally. Delivery usually takes 7–14 business days, depending
					on where you are. International shipping costs are calculated at checkout, and
					any customs duties or import taxes are the responsibility of the recipient —
					they aren't included in the price you pay us.
				</p>
			</section>
		</Reveal>
		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Delivery notes</h2>
				<ul class="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/75">
					<li>Please double-check your address at checkout — we can only change it before your order is dispatched.</li>
					<li>If nobody is in when delivery is attempted, the courier will leave instructions for redelivery or collection.</li>
					<li>Delivery times are estimates, not guarantees. If your order hasn't arrived within the estimated window, contact us through the <a href="/help/" class="font-medium text-sage-dark underline underline-offset-2 hover:text-ink">Help page</a> and we'll look into it.</li>
				</ul>
			</section>
		</Reveal>
		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Need to change something?</h2>
				<p class="mt-3 text-base leading-relaxed text-ink/75">
					If you need to update your address or cancel an order, get in touch as soon as
					possible — before dispatch we can usually help. See our
					<a href="/returns/" class="font-medium text-sage-dark underline underline-offset-2 hover:text-ink">Returns &amp; Exchanges</a>
					page for what happens after delivery.
				</p>
				<a
					href="/help/"
					class="group mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Contact us
					<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
				</a>
			</section>
		</Reveal>
	</div>
</section>
