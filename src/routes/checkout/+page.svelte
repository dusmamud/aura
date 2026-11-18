<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { Check, Lock, ShoppingBag } from 'phosphor-svelte';
	import { getProductBySlug } from '#lib/data/products';
	import { store } from '#lib/store.svelte';
	import { toast } from '#lib/toast.svelte';

	const FREE_SHIPPING_AT = 150;
	const SHIPPING_FLAT = 8;
	const PROMO_CODE = 'AURA20';
	const PROMO_KEY = 'aura-promo';
	const ORDERS_KEY = 'aura-orders';

	type OrderItem = { slug: string; name: string; size: string; qty: number; price: number; image: string };
	type Order = { id: string; items: OrderItem[]; total: number; date: string; status: string };

	const inputCls =
		'w-full min-h-11 border border-stone-line bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-sage';
	const inputErrCls =
		'w-full min-h-11 border border-red-800 bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-red-800';
	const labelCls = 'mb-1.5 block text-sm font-medium text-ink';

	let step = $state(1);
	let placing = $state(false);

	// Promo (set on the cart page, shared via localStorage)
	let promoApplied = $state(false);
	$effect(() => {
		if (browser && localStorage.getItem(PROMO_KEY) === PROMO_CODE) promoApplied = true;
	});

	// Step 1 — shipping
	let fullName = $state('');
	let email = $state('');
	let address = $state('');
	let city = $state('');
	let postcode = $state('');
	let shipErrors = $state<Record<string, string>>({});

	// Step 2 — payment (demo only, never sent anywhere)
	let cardName = $state('');
	let cardNumber = $state('');
	let expiry = $state('');
	let cvc = $state('');
	let payErrors = $state<Record<string, string>>({});

	let discount = $derived(promoApplied ? store.subtotal * 0.2 : 0);
	let afterDiscount = $derived(store.subtotal - discount);
	let shipping = $derived(store.cart.length === 0 ? 0 : afterDiscount >= FREE_SHIPPING_AT ? 0 : SHIPPING_FLAT);
	let total = $derived(afterDiscount + shipping);

	function fmt(n: number): string {
		return `$${n.toFixed(2)}`;
	}

	function validateShipping(): boolean {
		const errs: Record<string, string> = {};
		if (!fullName.trim()) errs.fullName = 'Please enter your full name.';
		if (!email.trim()) errs.email = 'Please enter your email address.';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
			errs.email = 'Please enter a valid email address.';
		if (!address.trim()) errs.address = 'Please enter your street address.';
		if (!city.trim()) errs.city = 'Please enter your city.';
		if (!postcode.trim()) errs.postcode = 'Please enter your postcode.';
		shipErrors = errs;
		return Object.keys(errs).length === 0;
	}

	function validatePayment(): boolean {
		const errs: Record<string, string> = {};
		const digits = cardNumber.replace(/\D/g, '');
		if (!cardName.trim()) errs.cardName = 'Please enter the name on the card.';
		if (digits.length < 15 || digits.length > 16)
			errs.cardNumber = 'Please enter a valid card number (15–16 digits).';
		if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry))
			errs.expiry = 'Use MM/YY, e.g. 08/28.';
		if (!/^\d{3,4}$/.test(cvc)) errs.cvc = 'Enter the 3–4 digit security code.';
		payErrors = errs;
		return Object.keys(errs).length === 0;
	}

	function formatCardNumber(value: string) {
		const digits = value.replace(/\D/g, '').slice(0, 16);
		cardNumber = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
	}

	function formatExpiry(value: string) {
		let digits = value.replace(/\D/g, '').slice(0, 4);
		if (digits.length >= 3) digits = `${digits.slice(0, 2)}/${digits.slice(2)}`;
		else if (digits.length === 2 && expiry.length < 2) digits = `${digits}/`;
		expiry = digits;
	}

	function goToStep2() {
		if (validateShipping()) step = 2;
	}

	function goToStep3() {
		if (validatePayment()) step = 3;
	}

	function readOrders(): Order[] {
		if (!browser) return [];
		try {
			return JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]') as Order[];
		} catch {
			return [];
		}
	}

	function placeOrder() {
		if (store.cart.length === 0 || placing) return;
		placing = true;
		const id = `AURA-${String(Math.floor(100000 + Math.random() * 900000))}`;
		const items: OrderItem[] = store.cart
			.map((i) => {
				const p = getProductBySlug(i.slug);
				if (!p) return null;
				return { slug: p.slug, name: p.name, size: i.size, qty: i.qty, price: p.price, image: p.image };
			})
			.filter((i): i is OrderItem => i !== null);
		const order: Order = {
			id,
			items,
			total,
			date: new Date().toISOString(),
			status: 'Confirmed'
		};
		try {
			localStorage.setItem(ORDERS_KEY, JSON.stringify([...readOrders(), order]));
			localStorage.removeItem(PROMO_KEY);
		} catch {
			// Order still confirmed on screen even if storage is unavailable.
		}
		// Clear the cart through the store so localStorage stays in sync.
		for (const item of [...store.cart]) store.removeFromCart(item.slug, item.size);
		toast.show(`Order ${id} placed — thank you!`);
		goto(`/track/?order=${id}`);
	}
</script>

<svelte:head>
	<title>Checkout — AURA Essentials</title>
	<meta
		name="description"
		content="Demo checkout for AURA Essentials. Shipping, payment and review — no payment is taken and no card details are sent anywhere."
	/>
	<link rel="canonical" href="https://aura.pages.dev/checkout/" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<h1 class="font-display text-4xl font-medium text-ink sm:text-5xl">Checkout</h1>
	<p class="mt-2 flex items-center gap-2 text-sm text-ink/70">
		<Lock size={15} class="text-sage-dark" />
		Demo checkout — no payment is taken and no card details are sent anywhere.
	</p>

	{#if store.cart.length === 0}
		<div class="mt-10 flex flex-col items-center border border-stone-line bg-cream-2 px-6 py-16 text-center">
			<ShoppingBag size={40} class="text-sage-dark" />
			<h2 class="mt-4 font-display text-3xl font-medium text-ink">Your bag is empty</h2>
			<p class="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
				There is nothing to check out yet. Add a few pieces to your bag first.
			</p>
			<a
				href="/shop/"
				class="mt-6 inline-block bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Continue Shopping
			</a>
		</div>
	{:else}
		<!-- Step indicator -->
		<ol class="mt-8 flex items-center gap-2 sm:gap-4" aria-label="Checkout steps">
			{#each [{ n: 1, label: 'Shipping' }, { n: 2, label: 'Payment' }, { n: 3, label: 'Review' }] as s}
				<li class="flex flex-1 items-center gap-2 sm:gap-3 {s.n < 3 ? 'after:h-px after:flex-1 after:bg-stone-line' : ''}">
					<span
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-medium {step > s.n
							? 'bg-sage text-white'
							: step === s.n
								? 'bg-sage text-white'
								: 'border border-stone-line bg-cream-2 text-ink/60'}"
						aria-current={step === s.n ? 'step' : undefined}
					>
						{#if step > s.n}<Check size={18} />{:else}{s.n}{/if}
					</span>
					<span class="text-sm {step === s.n ? 'font-medium text-ink' : 'text-ink/60'}">{s.label}</span>
				</li>
			{/each}
		</ol>

		<div class="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
			<div>
				<!-- Step 1: Shipping -->
				{#if step === 1}
					<section aria-label="Shipping details">
						<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Shipping details</h2>
						<div class="mt-5 grid gap-5 sm:grid-cols-2">
							<div>
								<label for="ship-name" class={labelCls}>Full name</label>
								<input
									id="ship-name"
									type="text"
									bind:value={fullName}
									autocomplete="name"
									aria-invalid={shipErrors.fullName ? 'true' : 'false'}
									aria-describedby={shipErrors.fullName ? 'ship-name-error' : undefined}
									class={shipErrors.fullName ? inputErrCls : inputCls}
								/>
								{#if shipErrors.fullName}<p id="ship-name-error" role="alert" class="mt-1.5 text-sm text-red-800">{shipErrors.fullName}</p>{/if}
							</div>
							<div>
								<label for="ship-email" class={labelCls}>Email</label>
								<input
									id="ship-email"
									type="email"
									bind:value={email}
									autocomplete="email"
									aria-invalid={shipErrors.email ? 'true' : 'false'}
									aria-describedby={shipErrors.email ? 'ship-email-error' : undefined}
									class={shipErrors.email ? inputErrCls : inputCls}
								/>
								{#if shipErrors.email}<p id="ship-email-error" role="alert" class="mt-1.5 text-sm text-red-800">{shipErrors.email}</p>{/if}
							</div>
							<div class="sm:col-span-2">
								<label for="ship-address" class={labelCls}>Street address</label>
								<input
									id="ship-address"
									type="text"
									bind:value={address}
									autocomplete="street-address"
									aria-invalid={shipErrors.address ? 'true' : 'false'}
									aria-describedby={shipErrors.address ? 'ship-address-error' : undefined}
									class={shipErrors.address ? inputErrCls : inputCls}
								/>
								{#if shipErrors.address}<p id="ship-address-error" role="alert" class="mt-1.5 text-sm text-red-800">{shipErrors.address}</p>{/if}
							</div>
							<div>
								<label for="ship-city" class={labelCls}>City</label>
								<input
									id="ship-city"
									type="text"
									bind:value={city}
									autocomplete="address-level2"
									aria-invalid={shipErrors.city ? 'true' : 'false'}
									aria-describedby={shipErrors.city ? 'ship-city-error' : undefined}
									class={shipErrors.city ? inputErrCls : inputCls}
								/>
								{#if shipErrors.city}<p id="ship-city-error" role="alert" class="mt-1.5 text-sm text-red-800">{shipErrors.city}</p>{/if}
							</div>
							<div>
								<label for="ship-postcode" class={labelCls}>Postcode</label>
								<input
									id="ship-postcode"
									type="text"
									bind:value={postcode}
									autocomplete="postal-code"
									aria-invalid={shipErrors.postcode ? 'true' : 'false'}
									aria-describedby={shipErrors.postcode ? 'ship-postcode-error' : undefined}
									class={shipErrors.postcode ? inputErrCls : inputCls}
								/>
								{#if shipErrors.postcode}<p id="ship-postcode-error" role="alert" class="mt-1.5 text-sm text-red-800">{shipErrors.postcode}</p>{/if}
							</div>
						</div>
						<button
							type="button"
							onclick={goToStep2}
							class="mt-7 min-h-12 bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
						>
							Continue to Payment
						</button>
					</section>
				{/if}

				<!-- Step 2: Payment -->
				{#if step === 2}
					<section aria-label="Payment details">
						<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Payment</h2>
						<p class="mt-2 text-sm text-ink/70">
							Demo only — enter any numbers you like. Nothing is charged and nothing leaves your browser.
						</p>
						<div class="mt-5 grid gap-5 sm:grid-cols-2">
							<div class="sm:col-span-2">
								<label for="card-name" class={labelCls}>Name on card</label>
								<input
									id="card-name"
									type="text"
									bind:value={cardName}
									autocomplete="cc-name"
									aria-invalid={payErrors.cardName ? 'true' : 'false'}
									aria-describedby={payErrors.cardName ? 'card-name-error' : undefined}
									class={payErrors.cardName ? inputErrCls : inputCls}
								/>
								{#if payErrors.cardName}<p id="card-name-error" role="alert" class="mt-1.5 text-sm text-red-800">{payErrors.cardName}</p>{/if}
							</div>
							<div class="sm:col-span-2">
								<label for="card-number" class={labelCls}>Card number</label>
								<input
									id="card-number"
									type="text"
									inputmode="numeric"
									value={cardNumber}
									oninput={(e) => formatCardNumber(e.currentTarget.value)}
									placeholder="1234 5678 9012 3456"
									autocomplete="cc-number"
									aria-invalid={payErrors.cardNumber ? 'true' : 'false'}
									aria-describedby={payErrors.cardNumber ? 'card-number-error' : undefined}
									class={payErrors.cardNumber ? inputErrCls : inputCls}
								/>
								{#if payErrors.cardNumber}<p id="card-number-error" role="alert" class="mt-1.5 text-sm text-red-800">{payErrors.cardNumber}</p>{/if}
							</div>
							<div>
								<label for="card-expiry" class={labelCls}>Expiry (MM/YY)</label>
								<input
									id="card-expiry"
									type="text"
									inputmode="numeric"
									value={expiry}
									oninput={(e) => formatExpiry(e.currentTarget.value)}
									placeholder="08/28"
									autocomplete="cc-exp"
									aria-invalid={payErrors.expiry ? 'true' : 'false'}
									aria-describedby={payErrors.expiry ? 'card-expiry-error' : undefined}
									class={payErrors.expiry ? inputErrCls : inputCls}
								/>
								{#if payErrors.expiry}<p id="card-expiry-error" role="alert" class="mt-1.5 text-sm text-red-800">{payErrors.expiry}</p>{/if}
							</div>
							<div>
								<label for="card-cvc" class={labelCls}>CVC</label>
								<input
									id="card-cvc"
									type="text"
									inputmode="numeric"
									bind:value={cvc}
									maxlength={4}
									placeholder="123"
									autocomplete="cc-csc"
									aria-invalid={payErrors.cvc ? 'true' : 'false'}
									aria-describedby={payErrors.cvc ? 'card-cvc-error' : undefined}
									class={payErrors.cvc ? inputErrCls : inputCls}
								/>
								{#if payErrors.cvc}<p id="card-cvc-error" role="alert" class="mt-1.5 text-sm text-red-800">{payErrors.cvc}</p>{/if}
							</div>
						</div>
						<div class="mt-7 flex flex-wrap gap-3">
							<button
								type="button"
								onclick={() => (step = 1)}
								class="min-h-12 border border-stone-line bg-cream px-8 py-3.5 text-sm font-medium text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
							>
								Back to Shipping
							</button>
							<button
								type="button"
								onclick={goToStep3}
								class="min-h-12 bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
							>
								Review Order
							</button>
						</div>
					</section>
				{/if}

				<!-- Step 3: Review -->
				{#if step === 3}
					<section aria-label="Review your order">
						<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Review your order</h2>
						<div class="mt-5 grid gap-5 sm:grid-cols-2">
							<div class="border border-stone-line bg-cream-2 p-5">
								<h3 class="text-sm font-medium tracking-wide text-ink uppercase">Ship to</h3>
								<p class="mt-2 text-sm leading-relaxed text-ink/80">
									{fullName}<br />{address}<br />{city}, {postcode}<br />{email}
								</p>
								<button type="button" onclick={() => (step = 1)} class="mt-3 min-h-11 text-sm text-sage-dark underline focus-visible:outline-2 focus-visible:outline-sage">
									Edit shipping
								</button>
							</div>
							<div class="border border-stone-line bg-cream-2 p-5">
								<h3 class="text-sm font-medium tracking-wide text-ink uppercase">Payment</h3>
								<p class="mt-2 text-sm leading-relaxed text-ink/80">
									{cardName}<br />Card ending in {cardNumber.replace(/\D/g, '').slice(-4)}<br />Expires {expiry}
								</p>
								<button type="button" onclick={() => (step = 2)} class="mt-3 min-h-11 text-sm text-sage-dark underline focus-visible:outline-2 focus-visible:outline-sage">
									Edit payment
								</button>
							</div>
						</div>
						<ul class="mt-6 divide-y divide-stone-line border-y border-stone-line">
							{#each store.cart as item (item.slug + item.size)}
								{@const product = getProductBySlug(item.slug)}
								{#if product}
									<li class="flex items-center justify-between gap-3 py-3 text-sm">
										<span class="text-ink">{product.name} · Size {item.size} × {item.qty}</span>
										<span class="font-medium text-ink">{fmt(product.price * item.qty)}</span>
									</li>
								{/if}
							{/each}
						</ul>
						<button
							type="button"
							onclick={placeOrder}
							disabled={placing}
							class="mt-7 flex min-h-12 items-center justify-center gap-2 bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage disabled:opacity-60"
						>
							<Lock size={15} />
							{placing ? 'Placing your order…' : `Place Order — ${fmt(total)}`}
						</button>
						<p class="mt-3 text-xs text-ink/60">
							Demo checkout — no payment is taken, no card details are sent anywhere, and nothing is shipped.
						</p>
					</section>
				{/if}
			</div>

			<!-- Order summary -->
			<aside class="lg:sticky lg:top-32 lg:self-start">
				<div class="border border-stone-line bg-cream-2 p-5 sm:p-6">
					<h2 class="font-display text-2xl font-medium text-ink">Order Summary</h2>
					<dl class="mt-5 space-y-2.5 text-sm">
						<div class="flex justify-between">
							<dt class="text-ink/80">Subtotal ({store.cartCount} {store.cartCount === 1 ? 'item' : 'items'})</dt>
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
							<dd class="font-medium text-ink">{shipping === 0 ? 'Free' : fmt(shipping)}</dd>
						</div>
						<div class="flex justify-between border-t border-stone-line pt-3 text-base">
							<dt class="font-medium text-ink">Total</dt>
							<dd class="font-medium text-ink">{fmt(total)}</dd>
						</div>
					</dl>
					<p class="mt-4 text-xs leading-relaxed text-ink/60">
						Free shipping on orders over $150 after discount. 30-day easy returns.
					</p>
				</div>
			</aside>
		</div>
	{/if}
</div>
