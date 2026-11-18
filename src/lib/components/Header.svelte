<script lang="ts">
	import { Heart, List, MagnifyingGlass, ShoppingBag, User, X } from 'phosphor-svelte';
	import { store } from '../store.svelte';

	const NAV = [
		{ label: 'New In', href: '/new/' },
		{ label: 'Shop', href: '/shop/' },
		{ label: 'Collections', href: '/collections/' },
		{ label: 'Lookbook', href: '/lookbook/' },
		{ label: 'About', href: '/about/' }
	];

	let menuOpen = $state(false);
	let menuButton: HTMLButtonElement | undefined = $state();

	function openMenu() {
		menuOpen = true;
	}
	function closeMenu() {
		menuOpen = false;
		menuButton?.focus();
	}
	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) closeMenu();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<header class="sticky top-0 z-40 bg-cream">
	<!-- Announcement bar -->
	<div class="bg-cream-2 px-4 py-2 text-center text-[11px] tracking-[0.08em] text-ink/80">
		Free shipping on orders over $150&nbsp;&nbsp;|&nbsp;&nbsp;Easy 30-day returns
	</div>

	<!-- Main bar -->
	<div class="border-b border-stone-line">
		<div class="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
			<!-- Left: hamburger + desktop nav -->
			<div class="flex items-center gap-6">
				<button
					type="button"
					bind:this={menuButton}
					onclick={openMenu}
					aria-label="Open menu"
					aria-expanded={menuOpen}
					class="flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage lg:hidden"
				>
					<List size={22} />
				</button>
				<nav class="hidden items-center gap-6 text-[13px] tracking-wide lg:flex" aria-label="Primary">
					{#each NAV as item}
						<a href={item.href} class="py-2 text-ink/80 transition hover:text-ink">{item.label}</a>
					{/each}
				</nav>
			</div>

			<!-- Centered logo -->
			<a href="/" class="justify-self-center text-center leading-none" aria-label="AURA Essentials — home">
				<span class="font-display text-[26px] font-semibold tracking-[0.28em] text-ink sm:text-[30px]">AURA</span>
				<span class="mt-0.5 block text-[9px] tracking-[0.42em] text-ink/70">ESSENTIALS</span>
			</a>

			<!-- Right icons -->
			<div class="flex items-center gap-0.5 sm:gap-1">
				<a
					href="/search/"
					aria-label="Search"
					class="flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					<MagnifyingGlass size={21} />
				</a>
				<a
					href="/account/"
					aria-label="Account"
					class="hidden h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage sm:flex"
				>
					<User size={21} />
				</a>
				<a
					href="/wishlist/"
					aria-label="Wishlist"
					class="hidden h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage sm:flex"
				>
					<Heart size={21} />
				</a>
				<button
					type="button"
					onclick={() => (store.cartOpen = true)}
					aria-label="Open shopping bag, {store.cartCount} items"
					class="relative flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					<ShoppingBag size={21} />
					{#if store.cartCount > 0}
						<span
							class="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sage px-1 text-[10px] font-medium text-white"
						>
							{store.cartCount}
						</span>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
			<button
				type="button"
				aria-label="Close menu"
				onclick={closeMenu}
				class="absolute inset-0 h-full w-full cursor-default bg-ink/40"
			></button>
			<div class="absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-cream shadow-xl">
				<div class="flex items-center justify-between border-b border-stone-line px-5 py-4">
					<span class="font-display text-xl font-semibold tracking-[0.28em]">AURA</span>
					<button
						type="button"
						onclick={closeMenu}
						aria-label="Close menu"
						class="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						<X size={22} />
					</button>
				</div>
				<nav class="flex flex-col px-5 py-4" aria-label="Mobile">
					{#each NAV as item}
						<a
							href={item.href}
							onclick={closeMenu}
							class="border-b border-stone-line py-4 font-display text-2xl text-ink"
						>
							{item.label}
						</a>
					{/each}
					<a href="/account/" onclick={closeMenu} class="border-b border-stone-line py-4 font-display text-2xl text-ink">Account</a>
					<a href="/wishlist/" onclick={closeMenu} class="border-b border-stone-line py-4 font-display text-2xl text-ink">Wishlist</a>
				</nav>
				<p class="mt-auto px-5 pb-6 text-xs text-ink/60">
					Free shipping on orders over $150 · Easy 30-day returns
				</p>
			</div>
		</div>
	{/if}
</header>
