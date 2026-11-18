<script lang="ts">
	import { ArrowRight } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';

	const steps = [
		{
			n: '1',
			title: 'Tell us',
			text: 'Send us a message from the Help page (or email hello@auraessentials.com) with your order number and which item you’d like to return or exchange.'
		},
		{
			n: '2',
			title: 'Pack it up',
			text: 'Pop the item back in its original packaging, unworn and unwashed, with the tags still attached. A note with your order number inside the parcel helps us match it quickly.'
		},
		{
			n: '3',
			title: 'Send it back',
			text: 'Post the parcel to the return address we send you by email. Keep your proof of postage until the refund lands.'
		},
		{
			n: '4',
			title: 'Get your refund',
			text: 'Once your return reaches us and passes a quick check, we refund the item price to your original payment method — usually within 5–10 business days of receipt.'
		}
	];
</script>

<svelte:head>
	<title>Returns &amp; Exchanges — AURA Essentials</title>
	<meta
		name="description"
		content="30-day returns and exchanges at AURA Essentials. Unworn, with tags attached — refunds to your original payment method within 5–10 business days of receipt."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/returns/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Returns & Exchanges — AURA Essentials" />
	<meta
		property="og:description"
		content="30-day returns. Unworn, tags attached. Refunds to your original payment method."
	/>
	<meta property="og:url" content="https://aura-design.pages.dev/returns/" />
	<meta property="og:image" content="https://aura-design.pages.dev/images/hero.jpg" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
	<Reveal>
		<nav aria-label="Breadcrumb" class="text-sm text-ink/60">
			<a href="/help/" class="transition hover:text-ink">Help</a>
			<span aria-hidden="true"> / </span>
			<span aria-current="page" class="text-ink">Returns &amp; Exchanges</span>
		</nav>
		<h1 class="mt-4 font-display text-[42px] leading-[1.08] font-medium text-ink sm:text-5xl">Returns &amp; Exchanges</h1>
		<p class="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
			Changed your mind? You have <strong class="font-medium text-ink">30 days</strong> from
			delivery to return or exchange an item — no questions asked, as long as it's in its
			original condition.
		</p>
	</Reveal>

	<div class="mt-10 space-y-8">
		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">What can be returned</h2>
				<ul class="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/75">
					<li>Items must be unworn, unwashed and in their original condition, with tags attached and original packaging where possible.</li>
					<li>Items marked Final Sale at the time of purchase can't be returned or exchanged.</li>
					<li>For hygiene reasons, we can't accept returns on items that have clearly been worn or washed.</li>
				</ul>
			</section>
		</Reveal>

		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">How to return or exchange</h2>
				<div class="mt-5 grid gap-4 sm:grid-cols-2">
					{#each steps as step}
						<div class="bg-cream-2 p-5 sm:p-6">
							<p class="flex h-10 w-10 items-center justify-center rounded-full bg-sage font-display text-xl text-white" aria-hidden="true">{step.n}</p>
							<h3 class="mt-4 font-display text-xl font-medium text-ink">{step.title}</h3>
							<p class="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
						</div>
					{/each}
				</div>
			</section>
		</Reveal>

		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Exchanges</h2>
				<p class="mt-3 text-base leading-relaxed text-ink/75">
					Want a different size or colour instead? Follow the same steps and tell us what
					you'd like in exchange. If the new item costs more, we'll let you know how to
					pay the difference; if it costs less, we refund the difference to your original
					payment method. If the size you want is out of stock, we'll refund you instead
					and you can reorder when it's back.
				</p>
			</section>
		</Reveal>

		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Refunds &amp; return postage</h2>
				<p class="mt-3 text-base leading-relaxed text-ink/75">
					Refunds cover the price of the returned items and are sent to your original
					payment method, usually within 5–10 business days of your return reaching us.
					Original shipping costs aren't refunded unless the return is our mistake — a
					wrong item, or a faulty one. Return postage is paid by the customer unless the
					item arrived damaged or incorrect, in which case we cover it.
				</p>
				<p class="mt-4 text-base leading-relaxed text-ink/75">
					Something arrived damaged or faulty? Tell us straight away — faulty items are
					handled separately from change-of-mind returns, and we'll put it right.
				</p>
				<a
					href="/help/"
					class="group mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Start a return — contact us
					<ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
				</a>
			</section>
		</Reveal>
	</div>
</section>
