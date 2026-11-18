<script lang="ts">
	import { ArrowRight, Check, Envelope, FacebookLogo, InstagramLogo } from 'phosphor-svelte';

	const SHOP_LINKS = [
		{ label: 'All Products', href: '/shop/' },
		{ label: 'Knitwear', href: '/shop/?category=Knitwear' },
		{ label: 'Shirts', href: '/shop/?category=Shirts' },
		{ label: 'Trousers', href: '/shop/?category=Trousers' },
		{ label: 'Jackets', href: '/shop/?category=Jackets' },
		{ label: 'Basics', href: '/shop/?category=Basics' },
		{ label: 'Accessories', href: '/shop/?category=Accessories' }
	];

	const ABOUT_LINKS = [
		{ label: 'Our Story', href: '/about/' },
		{ label: 'Sustainability', href: '/about/#sustainability' },
		{ label: 'Craftsmanship', href: '/about/#craftsmanship' },
		{ label: 'Careers', href: '/about/#careers' },
		{ label: 'Store Locator', href: '/about/#stores' }
	];

	const HELP_LINKS = [
		{ label: 'Size Guide', href: '/size-guide/' },
		{ label: 'Shipping & Delivery', href: '/shipping/' },
		{ label: 'Returns & Exchanges', href: '/returns/' },
		{ label: 'FAQ', href: '/help/' },
		{ label: 'Contact Us', href: '/help/#contact' }
	];

	let email = $state('');
	let subscribed = $state(false);
	let error = $state('');

	function subscribe(e: SubmitEvent) {
		e.preventDefault();
		const value = email.trim();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			error = 'Please enter a valid email address.';
			return;
		}
		error = '';
		subscribed = true;
	}
</script>

<footer class="border-t border-stone-line bg-cream-2">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
			<!-- Brand -->
			<div>
				<a href="/" class="leading-none" aria-label="AURA Essentials — home">
					<span class="font-display text-2xl font-semibold tracking-[0.28em] text-ink">AURA</span>
					<span class="mt-0.5 block text-[8px] tracking-[0.42em] text-ink/70">ESSENTIALS</span>
				</a>
				<p class="mt-4 text-sm text-ink/70">Designed for life. Made to last.</p>
				<div class="mt-5 flex items-center gap-2">
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="AURA Essentials on Instagram"
						class="flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition hover:bg-sage-panel hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						<InstagramLogo size={20} />
					</a>
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="AURA Essentials on Facebook"
						class="flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition hover:bg-sage-panel hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						<FacebookLogo size={20} />
					</a>
					<a
						href="mailto:hello@auraessentials.com"
						aria-label="Email AURA Essentials"
						class="flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition hover:bg-sage-panel hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						<Envelope size={20} />
					</a>
				</div>
			</div>

			<!-- Shop -->
			<nav aria-label="Shop">
				<h3 class="text-xs font-medium tracking-[0.18em] text-ink uppercase">Shop</h3>
				<ul class="mt-4 space-y-2.5 text-sm text-ink/70">
					{#each SHOP_LINKS as link}
						<li><a href={link.href} class="transition hover:text-ink">{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<!-- About -->
			<nav aria-label="About">
				<h3 class="text-xs font-medium tracking-[0.18em] text-ink uppercase">About</h3>
				<ul class="mt-4 space-y-2.5 text-sm text-ink/70">
					{#each ABOUT_LINKS as link}
						<li><a href={link.href} class="transition hover:text-ink">{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<!-- Help -->
			<nav aria-label="Help">
				<h3 class="text-xs font-medium tracking-[0.18em] text-ink uppercase">Help</h3>
				<ul class="mt-4 space-y-2.5 text-sm text-ink/70">
					{#each HELP_LINKS as link}
						<li><a href={link.href} class="transition hover:text-ink">{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<!-- Newsletter -->
			<div>
				<h3 class="text-xs font-medium tracking-[0.18em] text-ink uppercase">Newsletter</h3>
				<p class="mt-4 text-sm text-ink/70">Be the first to know about new arrivals, offers and more.</p>
				{#if subscribed}
					<p class="mt-4 flex items-center gap-2 rounded-md bg-sage-panel px-4 py-3 text-sm text-ink">
						<Check size={18} class="text-sage-dark" />
						Thank you — you are on the list.
					</p>
				{:else}
					<form class="mt-4" onsubmit={subscribe} novalidate>
						<label for="footer-newsletter-email" class="sr-only">Email address</label>
						<div class="flex items-stretch overflow-hidden rounded-md border border-stone-line bg-cream focus-within:border-sage">
							<input
								id="footer-newsletter-email"
								type="email"
								bind:value={email}
								placeholder="Enter your email"
								autocomplete="email"
								aria-invalid={error ? 'true' : undefined}
								aria-describedby={error ? 'footer-newsletter-error' : undefined}
								class="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
							/>
							<button
								type="submit"
								aria-label="Subscribe"
								class="flex w-12 items-center justify-center bg-sage text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
							>
								<ArrowRight size={18} />
							</button>
						</div>
						{#if error}
							<p id="footer-newsletter-error" class="mt-2 text-xs text-red-800" role="alert">{error}</p>
						{/if}
					</form>
				{/if}
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-stone-line pt-6 text-xs text-ink/60 sm:flex-row">
			<p>© 2026 AURA Essentials. All rights reserved.</p>
			<nav class="flex items-center gap-5" aria-label="Legal">
				<a href="/privacy/" class="transition hover:text-ink">Privacy Policy</a>
				<a href="/terms/" class="transition hover:text-ink">Terms &amp; Conditions</a>
				<a href="/accessibility/" class="transition hover:text-ink">Accessibility</a>
			</nav>
		</div>
	</div>
</footer>
