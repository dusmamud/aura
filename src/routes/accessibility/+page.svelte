<script lang="ts">
	import Reveal from '#lib/components/Reveal.svelte';
</script>

<svelte:head>
	<title>Accessibility — AURA Essentials</title>
	<meta
		name="description"
		content="How AURA Essentials makes this site usable for everyone: keyboard navigation, visible focus, alt text, reduced-motion support and 44px touch targets."
	/>
	<link rel="canonical" href="https://aura.pages.dev/accessibility/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Accessibility — AURA Essentials" />
	<meta
		property="og:description"
		content="Keyboard navigation, visible focus, alt text, reduced-motion support — what this site actually does."
	/>
	<meta property="og:url" content="https://aura.pages.dev/accessibility/" />
	<meta property="og:image" content="https://aura.pages.dev/images/hero.jpg" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
	<Reveal>
		<h1 class="font-display text-[42px] leading-[1.08] font-medium text-ink sm:text-5xl">Accessibility</h1>
		<p class="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
			Everyone should be able to browse and shop at AURA Essentials. This page says what
			this site actually does today to be usable — and how to tell us when it falls short.
		</p>
	</Reveal>

	<div class="mt-10 space-y-8">
		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">What the site does today</h2>
				<ul class="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/75">
					<li><strong class="font-medium text-ink">Keyboard navigation:</strong> every link, button, menu and form field can be reached and used with a keyboard alone, and the focus indicator is always visible so you can see where you are.</li>
					<li><strong class="font-medium text-ink">Alt text:</strong> product and editorial images carry text descriptions, so screen readers can describe what's shown.</li>
					<li><strong class="font-medium text-ink">Reduced motion:</strong> if your system is set to prefer reduced motion, the site's scroll-reveal animations are turned off entirely — content simply appears.</li>
					<li><strong class="font-medium text-ink">Touch targets:</strong> buttons and links are at least 44px, so they're comfortable to tap on a phone.</li>
					<li><strong class="font-medium text-ink">Readable text:</strong> body copy uses a clear sans-serif at a comfortable size, with headings in a larger serif, and the cream-and-ink palette keeps text legible.</li>
					<li><strong class="font-medium text-ink">Works without JavaScript:</strong> content hidden for scroll animations is shown if JavaScript is off, so pages stay readable.</li>
					<li><strong class="font-medium text-ink">Mobile-first layout:</strong> pages are designed for small screens first and reflow rather than requiring sideways scrolling.</li>
				</ul>
			</section>
		</Reveal>
		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">What we're still working on</h2>
				<p class="mt-3 text-base leading-relaxed text-ink/75">
					We're a small team and this is ongoing work, not a finished checklist. We know
					there are gaps — for example, we haven't yet had the site formally audited
					against WCAG, and some older patterns may not be perfect. We fix issues as
					they're reported, starting with the ones that block people from shopping.
				</p>
			</section>
		</Reveal>
		<Reveal>
			<section>
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Tell us about a problem</h2>
				<p class="mt-3 text-base leading-relaxed text-ink/75">
					If you hit a barrier on this site — a button you can't reach, text you can't
					read, an image with no description, anything — please let us know through the
					contact form on the
					<a href="/help/" class="font-medium text-sage-dark underline underline-offset-2 hover:text-ink">Help page</a>,
					or by email at
					<a href="mailto:hello@auraessentials.com" class="font-medium text-sage-dark underline underline-offset-2 hover:text-ink">hello@auraessentials.com</a>.
					Tell us the page, what you were trying to do, and what device or assistive
					technology you use if you're comfortable sharing it. We aim to reply within
					two business days.
				</p>
			</section>
		</Reveal>
	</div>
</section>
