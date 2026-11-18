<script lang="ts">
	import { toast } from '#lib/toast.svelte.ts';
	import Reveal from '#lib/components/Reveal.svelte';

	const faqs = [
		{
			q: 'How much is shipping?',
			a: 'Shipping is free on all orders over $150. For orders under $150, a flat $8 shipping fee applies at checkout. You can see the full details on our Shipping & Delivery page.'
		},
		{
			q: 'What is your returns policy?',
			a: 'You have 30 days from delivery to return or exchange an item. It should be unworn, unwashed, with tags attached and in its original packaging. Refunds go back to your original payment method once we receive the return. See Returns & Exchanges for the step-by-step process.'
		},
		{
			q: 'How do AURA sizes run?',
			a: 'Most of our pieces are cut with a relaxed, easy fit — if you are between sizes, size down for a closer fit or stay with your usual size for the intended relaxed drape. Our Size Guide lists bust, waist and hip measurements in cm and inches for every category.'
		},
		{
			q: 'How do I care for knitwear and delicate fabrics?',
			a: 'Always follow the care label on the garment itself. As a general guide: wash knitwear and cashmere cold on a gentle cycle (or hand wash), dry flat away from direct heat, and store folded rather than hung so knits keep their shape. Linen and cotton can be machine washed cold.'
		},
		{
			q: 'How can I track my order?',
			a: 'Once your order is dispatched, you will receive an email with a tracking link so you can follow it on its way. Orders are usually dispatched within 1–2 business days. If your tracking link has not arrived after 2 business days, send us a message using the form below.'
		},
		{
			q: 'Do you sell gift cards?',
			a: 'Not yet — gift cards are on our list, but they are not available at the moment. If you would like to hear when they arrive, join our newsletter in the footer below. In the meantime, a piece from the collection makes a good gift too — and it can be returned or exchanged within 30 days.'
		},
		{
			q: 'How do promo codes work?',
			a: 'Enter your code at checkout before placing your order — the discount applies to eligible items automatically. Only one code can be used per order, and codes cannot be applied after an order is placed. Our current offer is AURA20, for 20% off the Seasonal Edit.'
		},
		{
			q: 'How can I contact you?',
			a: 'Use the form on this page and we will get back to you — we aim to reply within two business days. You can also write to us at hello@auraessentials.com, the address shown in our footer.'
		}
	];

	const helpLinks = [
		{ label: 'Shipping & Delivery', href: '/shipping/', text: 'Free over $150, $8 flat otherwise.' },
		{ label: 'Returns & Exchanges', href: '/returns/', text: '30 days, unworn with tags attached.' },
		{ label: 'Size Guide', href: '/size-guide/', text: 'Bust, waist and hip measurements in cm and inches.' }
	];

	let name = $state('');
	let email = $state('');
	let topic = $state('Order question');
	let message = $state('');
	let error = $state('');
	let sent = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim()) {
			error = 'Please tell us your name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		if (message.trim().length < 10) {
			error = 'Please write a little more so we can help — at least a few words.';
			return;
		}
		error = '';
		sent = true;
		toast.show('Thank you — your message has been sent.');
	}
</script>

<svelte:head>
	<title>Help &amp; FAQ — AURA Essentials</title>
	<meta
		name="description"
		content="Answers about shipping, returns, sizing, care, order tracking, gift cards and promo codes — plus a contact form to reach the AURA Essentials team."
	/>
	<link rel="canonical" href="https://aura.pages.dev/help/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Help & FAQ — AURA Essentials" />
	<meta
		property="og:description"
		content="Shipping, returns, sizing, care and more — answered. Free shipping over $150, 30-day returns."
	/>
	<meta property="og:url" content="https://aura.pages.dev/help/" />
	<meta property="og:image" content="https://aura.pages.dev/images/hero.jpg" />
</svelte:head>

<!-- Hero -->
<section class="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 lg:py-14">
	<Reveal>
		<p class="text-[11px] font-medium tracking-[0.2em] text-sage-dark uppercase">Help Centre</p>
		<h1 class="mt-3 font-display text-[42px] leading-[1.08] font-medium text-ink sm:text-5xl">How can we help?</h1>
		<p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/75">
			Answers to the questions we hear most. If you can't find what you need, the contact
			form at the bottom of this page reaches our team directly.
		</p>
	</Reveal>
</section>

<!-- Quick links -->
<section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-3 sm:gap-6">
		{#each helpLinks as link}
			<Reveal>
				<a
					href={link.href}
					class="block h-full bg-cream-2 p-6 transition hover:bg-sage-panel/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					<h2 class="font-display text-2xl font-medium text-ink">{link.label}</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink/70">{link.text}</p>
					<p class="mt-3 text-sm font-medium text-sage-dark">Read more →</p>
				</a>
			</Reveal>
		{/each}
	</div>
</section>

<!-- FAQ accordion -->
<section class="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:pb-16">
	<Reveal>
		<h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">Frequently asked questions</h2>
	</Reveal>
	<div class="mt-6 divide-y divide-stone-line border-y border-stone-line">
		{#each faqs as faq}
			<details class="group py-1">
				<summary
					class="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-xl font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage [&::-webkit-details-marker]:hidden"
				>
					{faq.q}
					<span
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-line text-lg leading-none text-sage-dark transition group-open:rotate-45"
						aria-hidden="true">+</span
					>
				</summary>
				<p class="pb-5 pr-10 text-base leading-relaxed text-ink/75">{faq.a}</p>
			</details>
		{/each}
	</div>
</section>

<!-- Contact form -->
<section id="contact" class="scroll-mt-32 border-t border-stone-line bg-cream-2">
	<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
		<Reveal>
			<h2 class="font-display text-3xl font-medium text-ink sm:text-4xl">Contact us</h2>
			<p class="mt-3 text-base leading-relaxed text-ink/75">
				Still stuck? Send us a message and we'll get back to you — we aim to reply within
				two business days. You can also write to us at
				<a
					href="mailto:hello@auraessentials.com"
					class="font-medium text-sage-dark underline underline-offset-2 transition hover:text-ink"
				>
					hello@auraessentials.com
				</a>
				— the same address shown in our footer.
			</p>
		</Reveal>

		{#if sent}
			<div class="mt-8 rounded-md bg-sage-panel px-5 py-4" role="status">
				<p class="font-display text-xl font-medium text-ink">Thank you, {name.trim()}.</p>
				<p class="mt-1 text-sm leading-relaxed text-ink/75">
					Your message about “{topic.toLowerCase()}” has been sent. We'll reply to {email.trim()} as soon as we can.
				</p>
			</div>
		{:else}
			<form class="mt-8 space-y-5" onsubmit={submit} novalidate>
				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="help-name" class="mb-1.5 block text-sm font-medium text-ink">Your name</label>
						<input
							id="help-name"
							type="text"
							bind:value={name}
							autocomplete="name"
							placeholder="Jane Smith"
							class="min-h-11 w-full rounded-md border border-stone-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-sage focus:outline-none"
						/>
					</div>
					<div>
						<label for="help-email" class="mb-1.5 block text-sm font-medium text-ink">Email address</label>
						<input
							id="help-email"
							type="email"
							bind:value={email}
							autocomplete="email"
							placeholder="jane@example.com"
							class="min-h-11 w-full rounded-md border border-stone-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-sage focus:outline-none"
						/>
					</div>
				</div>
				<div>
					<label for="help-topic" class="mb-1.5 block text-sm font-medium text-ink">Topic</label>
					<select
						id="help-topic"
						bind:value={topic}
						class="min-h-11 w-full rounded-md border border-stone-line bg-cream px-4 py-3 text-sm text-ink focus:border-sage focus:outline-none"
					>
						<option>Order question</option>
						<option>Shipping &amp; delivery</option>
						<option>Returns &amp; exchanges</option>
						<option>Sizing</option>
						<option>Product care</option>
						<option>Something else</option>
					</select>
				</div>
				<div>
					<label for="help-message" class="mb-1.5 block text-sm font-medium text-ink">Your message</label>
					<textarea
						id="help-message"
						bind:value={message}
						rows="5"
						placeholder="Tell us what's going on — your order number helps if you have one."
						class="w-full resize-y rounded-md border border-stone-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-sage focus:outline-none"
					></textarea>
				</div>
				{#if error}
					<p class="text-sm text-red-800" role="alert">{error}</p>
				{/if}
				<button
					type="submit"
					class="inline-block min-h-11 bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Send message
				</button>
				<p class="text-xs leading-relaxed text-ink/60">
					No phone support yet — email is the fastest way to reach us, and every message is read by a real person on the team.
				</p>
			</form>
		{/if}
	</div>
</section>
