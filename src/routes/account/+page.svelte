<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { CaretDown, MapPin, Package, SignOut, User } from 'phosphor-svelte';
	import { toast } from '#lib/toast.svelte';

	const USER_KEY = 'aura-user';
	const ORDERS_KEY = 'aura-orders';
	const ADDRESS_KEY = 'aura-address';

	type OrderItem = { slug: string; name: string; size: string; qty: number; price: number; image: string };
	type Order = { id: string; items: OrderItem[]; total: number; date: string; status: string };
	type SavedUser = { name: string; email: string };
	type Address = { fullName: string; address: string; city: string; postcode: string };

	const inputCls =
		'w-full min-h-11 border border-stone-line bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-sage';
	const labelCls = 'mb-1.5 block text-sm font-medium text-ink';

	let user = $state<SavedUser | null>(null);
	let orders = $state<Order[]>([]);
	let tab = $state<'orders' | 'addresses'>('orders');
	let expandedId = $state<string | null>(null);

	let addrFullName = $state('');
	let addrStreet = $state('');
	let addrCity = $state('');
	let addrPostcode = $state('');
	let addrSaved = $state(false);

	$effect(() => {
		if (!browser) return;
		try {
			const rawUser = localStorage.getItem(USER_KEY);
			user = rawUser ? (JSON.parse(rawUser) as SavedUser) : null;
			orders = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]') as Order[];
			const rawAddr = localStorage.getItem(ADDRESS_KEY);
			if (rawAddr) {
				const a = JSON.parse(rawAddr) as Address;
				addrFullName = a.fullName;
				addrStreet = a.address;
				addrCity = a.city;
				addrPostcode = a.postcode;
				addrSaved = true;
			}
		} catch {
			user = null;
			orders = [];
		}
	});

	function fmt(n: number): string {
		return `$${n.toFixed(2)}`;
	}

	function fmtDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}

	function saveAddress() {
		if (!addrFullName.trim() || !addrStreet.trim() || !addrCity.trim() || !addrPostcode.trim()) {
			toast.show('Please fill in every address field');
			return;
		}
		try {
			localStorage.setItem(
				ADDRESS_KEY,
				JSON.stringify({ fullName: addrFullName, address: addrStreet, city: addrCity, postcode: addrPostcode })
			);
		} catch {
			// Address still shown for this session.
		}
		addrSaved = true;
		toast.show('Address saved');
	}

	function signOut() {
		try {
			localStorage.removeItem(USER_KEY);
		} catch {
			// Signed out for this session regardless.
		}
		user = null;
		toast.show('You have signed out');
		goto('/signin/');
	}

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}
</script>

<svelte:head>
	<title>My Account — AURA Essentials</title>
	<meta
		name="description"
		content="Your AURA Essentials account: view demo orders, manage your saved address, and sign out."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/account/" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<h1 class="font-display text-4xl font-medium text-ink sm:text-5xl">My Account</h1>

	{#if user === null}
		<div class="mt-10 flex flex-col items-center border border-stone-line bg-cream-2 px-6 py-16 text-center">
			<User size={40} class="text-sage-dark" />
			<h2 class="mt-4 font-display text-3xl font-medium text-ink">You are not signed in</h2>
			<p class="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
				Sign in to see your orders and saved address. This is a demo — signing in only stores your
				details in your own browser.
			</p>
			<a
				href="/signin/"
				class="mt-6 inline-block bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Sign In
			</a>
		</div>
	{:else}
		<div class="mt-4 flex flex-wrap items-center justify-between gap-4">
			<p class="text-base text-ink/80">
				Hello, <strong class="font-medium text-ink">{user.name}</strong> · {user.email}
			</p>
			<button
				type="button"
				onclick={signOut}
				class="inline-flex min-h-11 items-center gap-2 border border-stone-line bg-cream px-5 text-sm font-medium text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				<SignOut size={16} /> Sign Out
			</button>
		</div>

		<!-- Tabs -->
		<div class="mt-8 flex gap-2 border-b border-stone-line" role="tablist" aria-label="Account sections">
			<button
				type="button"
				role="tab"
				aria-selected={tab === 'orders'}
				onclick={() => (tab = 'orders')}
				class="flex min-h-12 items-center gap-2 border-b-2 px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-sage {tab === 'orders'
					? 'border-sage text-ink'
					: 'border-transparent text-ink/60 hover:text-ink'}"
			>
				<Package size={17} /> Orders ({orders.length})
			</button>
			<button
				type="button"
				role="tab"
				aria-selected={tab === 'addresses'}
				onclick={() => (tab = 'addresses')}
				class="flex min-h-12 items-center gap-2 border-b-2 px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-sage {tab === 'addresses'
					? 'border-sage text-ink'
					: 'border-transparent text-ink/60 hover:text-ink'}"
			>
				<MapPin size={17} /> Addresses
			</button>
		</div>

		<!-- Orders -->
		{#if tab === 'orders'}
			<section class="mt-8" aria-label="Your orders">
				{#if orders.length === 0}
					<div class="border border-stone-line bg-cream-2 px-6 py-12 text-center">
						<Package size={36} class="mx-auto text-sage-dark" />
						<h2 class="mt-3 font-display text-2xl font-medium text-ink">No orders yet</h2>
						<p class="mt-2 text-sm text-ink/70">
							Orders you place at the demo checkout will appear here.
						</p>
						<a
							href="/shop/"
							class="mt-5 inline-block bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
						>
							Start Shopping
						</a>
					</div>
				{:else}
					<ul class="space-y-4">
						{#each orders as order (order.id)}
							<li class="border border-stone-line bg-cream-2">
								<button
									type="button"
									onclick={() => toggleExpand(order.id)}
									aria-expanded={expandedId === order.id}
									class="flex w-full min-h-12 flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-sage"
								>
									<span class="flex flex-wrap items-center gap-x-4 gap-y-1">
										<span class="font-display text-xl font-medium text-ink">{order.id}</span>
										<span class="text-sm text-ink/60">{fmtDate(order.date)}</span>
										<span class="bg-sage-panel px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-sage-dark uppercase">
											{order.status}
										</span>
									</span>
									<span class="flex items-center gap-2">
										<span class="text-base font-medium text-ink">{fmt(order.total)}</span>
										<CaretDown
											size={17}
											class="text-ink/60 transition-transform {expandedId === order.id ? 'rotate-180' : ''}"
										/>
									</span>
								</button>
								{#if expandedId === order.id}
									<ul class="divide-y divide-stone-line border-t border-stone-line px-5 py-2">
										{#each order.items as item (item.slug + item.size)}
											<li class="flex items-center gap-4 py-3">
												<img
													src={item.image}
													alt={item.name}
													width="80"
													height="100"
													loading="lazy"
													class="h-16 w-12 bg-cream object-cover"
												/>
												<span class="min-w-0 flex-1 text-sm text-ink">
													{item.name} · Size {item.size} × {item.qty}
												</span>
												<span class="shrink-0 text-sm font-medium text-ink">
													{fmt(item.price * item.qty)}
												</span>
											</li>
										{/each}
									</ul>
									<div class="flex flex-wrap gap-3 border-t border-stone-line px-5 py-4">
										<a
											href="/track/?order={order.id}"
											class="inline-flex min-h-11 items-center bg-sage px-5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
										>
											Track Order
										</a>
									</div>
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
			</section>
		{/if}

		<!-- Addresses -->
		{#if tab === 'addresses'}
			<section class="mt-8 max-w-xl" aria-label="Saved address">
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Saved Address</h2>
				<p class="mt-2 text-sm text-ink/70">
					Saved only in your browser — this is a demo, so nothing is stored on a server.
				</p>
				<form
					class="mt-6 grid gap-5 sm:grid-cols-2"
					onsubmit={(e) => {
						e.preventDefault();
						saveAddress();
					}}
				>
					<div class="sm:col-span-2">
						<label for="addr-name" class={labelCls}>Full name</label>
						<input id="addr-name" type="text" bind:value={addrFullName} autocomplete="name" class={inputCls} />
					</div>
					<div class="sm:col-span-2">
						<label for="addr-street" class={labelCls}>Street address</label>
						<input id="addr-street" type="text" bind:value={addrStreet} autocomplete="street-address" class={inputCls} />
					</div>
					<div>
						<label for="addr-city" class={labelCls}>City</label>
						<input id="addr-city" type="text" bind:value={addrCity} autocomplete="address-level2" class={inputCls} />
					</div>
					<div>
						<label for="addr-postcode" class={labelCls}>Postcode</label>
						<input id="addr-postcode" type="text" bind:value={addrPostcode} autocomplete="postal-code" class={inputCls} />
					</div>
					<div class="sm:col-span-2">
						<button
							type="submit"
							class="min-h-12 bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
						>
							{addrSaved ? 'Update Address' : 'Save Address'}
						</button>
						{#if addrSaved}
							<p class="mt-3 text-sm text-sage-dark">Address saved in this browser.</p>
						{/if}
					</div>
				</form>
			</section>
		{/if}
	{/if}
</div>
