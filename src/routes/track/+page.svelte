<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/env';
	import { Check, MagnifyingGlass, Package } from 'phosphor-svelte';

	const ORDERS_KEY = 'aura-orders';

	type OrderItem = { slug: string; name: string; size: string; qty: number; price: number; image: string };
	type Order = { id: string; items: OrderItem[]; total: number; date: string; status: string };

	let orderInput = $state('');
	let lookedUp = $state(false);
	let found = $state<Order | null>(null);
	let justPlaced = $state(false);

	// Prefill from ?order= on the client (prerender has no query string).
	$effect(() => {
		if (!browser) return;
		const q = page.url.searchParams.get('order');
		if (q) {
			orderInput = q.toUpperCase();
			lookUp(q, true);
		}
	});

	function readOrders(): Order[] {
		try {
			return JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]') as Order[];
		} catch {
			return [];
		}
	}

	function lookUp(raw: string, fromQuery = false) {
		const id = raw.trim().toUpperCase();
		if (!id) return;
		// Local const: reading `found` here would make the ?order= $effect
		// re-run on every write (effect_update_depth_exceeded loop).
		const f = readOrders().find((o) => o.id.toUpperCase() === id) ?? null;
		found = f;
		lookedUp = true;
		justPlaced = fromQuery && f !== null;
	}

	function fmt(n: number): string {
		return `$${n.toFixed(2)}`;
	}

	function fmtDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	function addDays(iso: string, days: number): string {
		const d = new Date(iso);
		d.setDate(d.getDate() + days);
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	// Demo timeline: only "Confirmed" is done at placement; the rest are estimates.
	const STEPS = [
		{ label: 'Confirmed', dayOffset: 0 },
		{ label: 'Packed', dayOffset: 1 },
		{ label: 'Shipped', dayOffset: 2 },
		{ label: 'Delivered', dayOffset: 4 }
	];
</script>

<svelte:head>
	<title>Track Your Order — AURA Essentials</title>
	<meta
		name="description"
		content="Track your AURA Essentials order by number. Demo tracking — orders placed at the demo checkout appear here."
	/>
	<link rel="canonical" href="https://aura.pages.dev/track/" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<div class="mx-auto max-w-2xl">
		<h1 class="text-center font-display text-4xl font-medium text-ink sm:text-5xl">Track Your Order</h1>
		<p class="mt-3 text-center text-sm leading-relaxed text-ink/70">
			Enter your order number (it looks like AURA-123456) to see its status. Demo tracking — orders are
			created when you place one at the demo checkout.
		</p>

		<form
			class="mt-8 flex gap-2"
			onsubmit={(e) => {
				e.preventDefault();
				lookUp(orderInput);
			}}
		>
			<label for="order-number" class="sr-only">Order number</label>
			<input
				id="order-number"
				type="text"
				bind:value={orderInput}
				placeholder="AURA-123456"
				autocomplete="off"
				class="min-h-12 min-w-0 flex-1 border border-stone-line bg-cream-2 px-4 text-sm tracking-wide text-ink uppercase placeholder:normal-case focus-visible:outline-2 focus-visible:outline-sage"
			/>
			<button
				type="submit"
				class="inline-flex min-h-12 shrink-0 items-center gap-2 bg-sage px-6 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				<MagnifyingGlass size={16} /> Track
			</button>
		</form>

		{#if lookedUp && !found}
			<div class="mt-8 border border-stone-line bg-cream-2 px-6 py-10 text-center">
				<Package size={40} class="mx-auto text-sage-dark" />
				<h2 class="mt-4 font-display text-2xl font-medium text-ink">Order not found</h2>
				<p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/70">
					We could not find <strong class="font-medium text-ink">{orderInput.trim().toUpperCase()}</strong> in
					this browser. Check the number and try again — or place an order at the demo checkout and a
					tracking number will be created for you.
				</p>
				<a
					href="/shop/"
					class="mt-6 inline-block bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Continue Shopping
				</a>
			</div>
		{/if}

		{#if found}
			{#if justPlaced}
				<div class="mt-8 border border-sage bg-sage-panel px-6 py-5 text-center" role="status">
					<h2 class="font-display text-2xl font-medium text-ink">Thank you — your order is confirmed!</h2>
					<p class="mt-1 text-sm text-ink/75">
						Order <strong class="font-medium text-ink">{found.id}</strong> · {fmt(found.total)} · placed
						{fmtDate(found.date)}. A confirmation would normally arrive by email — this is a demo, so
						nothing was sent or charged.
					</p>
				</div>
			{/if}

			<section class="mt-6 border border-stone-line bg-cream-2 p-6 sm:p-8" aria-label="Order status">
				<div class="flex flex-wrap items-baseline justify-between gap-2">
					<h2 class="font-display text-2xl font-medium text-ink">{found.id}</h2>
					<p class="text-sm text-ink/60">Placed {fmtDate(found.date)} · Total {fmt(found.total)}</p>
				</div>

				<!-- Timeline -->
				<ol class="mt-8 space-y-0">
					{#each STEPS as s, i}
						<li class="relative flex gap-4 pb-7 last:pb-0">
							{#if i < STEPS.length - 1}
								<span class="absolute left-[17px] top-9 h-[calc(100%-36px)] w-px bg-stone-line" aria-hidden="true"></span>
							{/if}
							<span
								class="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full {i === 0
									? 'bg-sage text-white'
									: 'border border-stone-line bg-cream text-ink/50'}"
							>
								{#if i === 0}<Check size={16} />{:else}<span class="text-xs font-medium">{i + 1}</span>{/if}
							</span>
							<div class="pt-1">
								<p class="text-sm font-medium {i === 0 ? 'text-ink' : 'text-ink/70'}">{s.label}</p>
								<p class="mt-0.5 text-xs text-ink/60">
									{#if i === 0}
										{fmtDate(found.date)} — your order is confirmed
									{:else}
										Estimated {addDays(found.date, s.dayOffset)}
									{/if}
								</p>
							</div>
						</li>
					{/each}
				</ol>

				<!-- Items -->
				<ul class="mt-8 divide-y divide-stone-line border-t border-stone-line">
					{#each found.items as item (item.slug + item.size)}
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
							<span class="shrink-0 text-sm font-medium text-ink">{fmt(item.price * item.qty)}</span>
						</li>
					{/each}
				</ul>
				<p class="mt-4 text-xs leading-relaxed text-ink/60">
					Demo tracking — statuses are estimates. Nothing is actually shipped.
				</p>
			</section>
		{/if}
	</div>
</div>
