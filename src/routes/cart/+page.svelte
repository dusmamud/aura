<script lang="ts">
	import { Minus, Plus, ShoppingBag, Tag, Trash, Truck } from 'phosphor-svelte';
	import { getProductBySlug } from '#lib/data/products';
	import { store } from '#lib/store.svelte';
	import { toast } from '#lib/toast.svelte';

	const FREE_SHIPPING_AT = 150;
	const SHIPPING_FLAT = 8;
	const PROMO_CODE = 'AURA20';
	const PROMO_KEY = 'aura-promo';

	let promoInput = $state('');
	let promoApplied = $state(false);
	let promoError = $state('');

	$effect(() => {
		if (typeof localStorage !== 'undefined' && localStorage.getItem(PROMO_KEY) === PROMO_CODE) {
			promoApplied = true;
			promoInput = PROMO_CODE;
		}
	});

	let discount = $derived(promoApplied ? store.subtotal * 0.2 : 0);
	let afterDiscount = $derived(store.subtotal - discount);
	let shipping = $derived(
		store.cart.length === 0 ? 0 : afterDiscount >= FREE_SHIPPING_AT ? 0 : SHIPPING_FLAT
	);
	let total = $derived(afterDiscount + shipping);
	let remaining = $derived(Math.max(0, FREE_SHIPPING_AT - afterDiscount));
	let progress = $derived(Math.min(100, (afterDiscount / FREE_SHIPPING_AT) * 100));

	function fmt(n: number): string {
		return `$${n.toFixed(2)}`;
	}

	function applyPromo() {
		const code = promoInput.trim().toUpperCase();
		if (code === PROMO_CODE) {
			promoApplied = true;
			promoError = '';
			try {
				localStorage.setItem(PROMO_KEY, PROMO_CODE);
			} catch {
				// Promo still applies for this session.
			}
			toast.show('Code AURA20 applied — 20% off your order');
		} else {
			promoError = 'That code is not valid. Try AURA20 for 20% off the Seasonal Edit.';
		}
	}

	function removePromo() {
		promoApplied = false;
		promoInput = '';
		promoError = '';
		try {
			localStorage.removeItem(PROMO_KEY);
		} catch {
			// Nothing to clear.
		}
	}

	function removeItem(slug: string, size: string, name: string) {
		store.removeFromCart(slug, size);
		toast.show(`${name} removed from your bag`);
	}
</script>

<svelte:head>
	<title>Your Bag — AURA Essentials</title>
	<meta
		name="description"
		content="Review your AURA Essentials bag, apply code AURA20 for 20% off, and check out. Free shipping on orders over $150."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/cart/" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<h1 class="font-display text-4xl font-medium text-ink sm:text-5xl">Your Bag</h1>
	<p class="mt-2 text-sm text-ink/70">
		{#if store.cartCount > 0}
			{store.cartCount}
			{store.cartCount === 1 ? 'item' : 'items'} · Demo checkout — no payment is taken.
		{:else}
			Demo checkout — no payment is taken.
		{/if}
	</p>

	{#if store.cart.length === 0}
		<div class="mt-10 flex flex-col items-center border border-stone-line bg-cream-2 px-6 py-16 text-center">
			<ShoppingBag size={40} class="text-sage-dark" />
			<h2 class="mt-4 font-display text-3xl font-medium text-ink">Your bag is empty</h2>
			<p class="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
				Nothing here yet. Browse the new arrivals and seasonal pieces to find something you love.
			</p>
			<a
				href="/shop/"
				class="mt-6 inline-block bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Continue Shopping
			</a>
		</div>
	{:else}
		<div class="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
			<!-- Line items -->
			<ul class="divide-y divide-stone-line border-y border-stone-line">
				{#each store.cart as item (item.slug + item.size)}
					{@const product = getProductBySlug(item.slug)}
					{#if product}
						<li class="flex gap-4 py-5 sm:gap-6">
							<a href="/product/{product.slug}/" class="shrink-0" tabindex="-1">
								<img
									src={product.image}
									alt={product.name}
									width="160"
									height="200"
									class="h-28 w-[88px] bg-cream-2 object-cover sm:h-36 sm:w-28"
								/>
							</a>
							<div class="min-w-0 flex-1">
								<div class="flex items-start justify-between gap-3">
									<div>
										<h2 class="text-base font-medium text-ink">
											<a href="/product/{product.slug}/" class="hover:text-sage-dark">{product.name}</a>
										</h2>
										<p class="mt-1 text-sm text-ink/60">Size: {item.size} · {product.colour}</p>
										<p class="mt-0.5 text-sm text-ink/60">{fmt(product.price)} each</p>
									</div>
									<p class="shrink-0 text-base font-medium text-ink">
										{fmt(product.price * item.qty)}
									</p>
								</div>
								<div class="mt-3 flex items-center justify-between gap-3">
									<div class="flex items-center border border-stone-line" aria-label="Quantity">
										<button
											type="button"
											onclick={() => store.setQty(item.slug, item.size, item.qty - 1)}
											aria-label="Decrease quantity of {product.name}"
											class="flex h-11 w-11 items-center justify-center text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-sage"
										>
											<Minus size={15} />
										</button>
										<span class="w-9 text-center text-sm" aria-label="Quantity">{item.qty}</span>
										<button
											type="button"
											onclick={() => store.setQty(item.slug, item.size, item.qty + 1)}
											disabled={item.qty >= 9}
											aria-label="Increase quantity of {product.name}"
											class="flex h-11 w-11 items-center justify-center text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-sage disabled:opacity-40"
										>
											<Plus size={15} />
										</button>
									</div>
									<button
										type="button"
										onclick={() => removeItem(item.slug, item.size, product.name)}
										aria-label="Remove {product.name} from bag"
										class="inline-flex h-11 items-center gap-1.5 px-2 text-sm text-ink/60 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-sage"
									>
										<Trash size={17} /> Remove
									</button>
								</div>
							</div>
						</li>
					{/if}
				{/each}
			</ul>

			<!-- Summary -->
			<aside class="lg:sticky lg:top-32 lg:self-start">
				<div class="border border-stone-line bg-cream-2 p-5 sm:p-6">
					<!-- Free shipping progress -->
					<div class="flex items-start gap-2.5">
						<Truck size={20} class="mt-0.5 shrink-0 text-sage-dark" />
						{#if remaining > 0}
							<p class="text-sm leading-relaxed text-ink/80">
								You are <strong class="font-medium text-ink">{fmt(remaining)}</strong> away from free shipping
							</p>
						{:else}
							<p class="text-sm leading-relaxed text-sage-dark">
								You have unlocked free shipping.
							</p>
						{/if}
					</div>
					<div
						class="mt-3 h-1.5 overflow-hidden rounded-full bg-stone-line"
						role="progressbar"
						aria-valuenow={Math.round(progress)}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-label="Progress towards free shipping"
					>
						<div class="h-full rounded-full bg-sage transition-all duration-500" style="width: {progress}%"></div>
					</div>

					<!-- Promo code -->
					<div class="mt-6 border-t border-stone-line pt-5">
						{#if promoApplied}
							<div class="flex items-center justify-between gap-3 bg-sage-panel px-3 py-2.5">
								<p class="flex items-center gap-2 text-sm font-medium text-ink">
									<Tag size={16} class="text-sage-dark" /> AURA20 applied — 20% off
								</p>
								<button
									type="button"
									onclick={removePromo}
									class="inline-flex h-11 items-center px-2 text-sm text-ink/70 underline transition hover:text-ink focus-visible:outline-2 focus-visible:outline-sage"
								>
									Remove
								</button>
							</div>
						{:else}
							<label for="promo-code" class="text-sm font-medium text-ink">Promo code</label>
							<div class="mt-2 flex gap-2">
								<input
									id="promo-code"
									type="text"
									bind:value={promoInput}
									placeholder="e.g. AURA20"
									autocomplete="off"
									aria-invalid={promoError ? 'true' : 'false'}
									aria-describedby={promoError ? 'promo-error' : undefined}
									class="min-h-11 min-w-0 flex-1 border border-stone-line bg-cream px-3 text-sm text-ink uppercase placeholder:normal-case focus-visible:outline-2 focus-visible:outline-sage"
								/>
								<button
									type="button"
									onclick={applyPromo}
									class="min-h-11 shrink-0 bg-ink px-5 text-sm font-medium tracking-wide text-cream transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
								>
									Apply
								</button>
							</div>
							{#if promoError}
								<p id="promo-error" role="alert" class="mt-2 text-sm text-red-800">{promoError}</p>
							{:else}
								<p class="mt-2 text-xs text-ink/60">
									Tip: use <strong class="font-medium">AURA20</strong> for 20% off the Seasonal Edit.
								</p>
							{/if}
						{/if}
					</div>

					<!-- Totals -->
					<dl class="mt-6 space-y-2.5 border-t border-stone-line pt-5 text-sm">
						<div class="flex justify-between">
							<dt class="text-ink/80">Subtotal</dt>
							<dd class="font-medium text-ink">{fmt(store.subtotal)}</dd>
						</div>
						{#if promoApplied}
							<div class="flex justify-between text-sage-dark">
								<dt>Discount (AURA20 — 20%)</dt>
								<dd class="font-medium">−{fmt(discount)}</dd>
							</div>
						{/if}
						<div class="flex justify-between">
							<dt class="text-ink/80">Shipping</dt>
							<dd class="font-medium text-ink">
								{shipping === 0 ? 'Free' : fmt(shipping)}
							</dd>
						</div>
						<div class="flex justify-between border-t border-stone-line pt-3 text-base">
							<dt class="font-medium text-ink">Total</dt>
							<dd class="font-medium text-ink">{fmt(total)}</dd>
						</div>
					</dl>

					<a
						href="/checkout/"
						class="mt-6 flex min-h-12 items-center justify-center bg-sage px-6 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						Proceed to Checkout
					</a>
					<p class="mt-3 text-center text-xs text-ink/60">
						Demo checkout — no payment is taken and nothing is shipped.
					</p>
				</div>
			</aside>
		</div>
	{/if}
</div>
