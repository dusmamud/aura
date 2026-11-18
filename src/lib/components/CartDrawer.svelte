<script lang="ts">
	import { ArrowRight, Minus, Plus, Trash, X } from 'phosphor-svelte';
	import { store } from '../store.svelte';
	import { getProductBySlug } from '../data/products';

	const FREE_SHIPPING_AT = 150;

	let open = $derived(store.cartOpen);
	let dialog: HTMLDivElement | undefined = $state();
	let closeBtn: HTMLButtonElement | undefined = $state();

	let remaining = $derived(Math.max(0, FREE_SHIPPING_AT - store.subtotal));
	let progress = $derived(Math.min(100, (store.subtotal / FREE_SHIPPING_AT) * 100));

	function close() {
		store.cartOpen = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') {
			close();
			return;
		}
		// Minimal focus trap: keep Tab inside the drawer.
		if (e.key === 'Tab' && dialog) {
			const focusables = dialog.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
			);
			if (focusables.length === 0) return;
			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	}

	$effect(() => {
		if (open) {
			closeBtn?.focus();
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
	<div class="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
		<button
			type="button"
			aria-label="Close shopping bag"
			onclick={close}
			class="absolute inset-0 h-full w-full cursor-default bg-ink/40"
		></button>
		<div
			bind:this={dialog}
			class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-xl"
		>
			<div class="flex items-center justify-between border-b border-stone-line px-5 py-4">
				<h2 class="font-display text-2xl font-semibold text-ink">
					Your Bag {#if store.cartCount > 0}({store.cartCount}){/if}
				</h2>
				<button
					type="button"
					bind:this={closeBtn}
					onclick={close}
					aria-label="Close shopping bag"
					class="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					<X size={22} />
				</button>
			</div>

			<!-- Free shipping progress -->
			<div class="border-b border-stone-line px-5 py-4">
				{#if remaining > 0}
					<p class="text-sm text-ink/80">
						You are <strong class="font-medium text-ink">${remaining.toFixed(0)}</strong> away from free shipping
					</p>
				{:else}
					<p class="text-sm text-sage-dark">You have unlocked free shipping.</p>
				{/if}
				<div
					class="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-line"
					role="progressbar"
					aria-valuenow={Math.round(progress)}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label="Progress towards free shipping"
				>
					<div class="h-full rounded-full bg-sage transition-all duration-500" style="width: {progress}%"></div>
				</div>
			</div>

			<!-- Items -->
			<div class="flex-1 overflow-y-auto px-5 py-4">
				{#if store.cart.length === 0}
					<p class="py-10 text-center text-sm text-ink/60">Your bag is empty.</p>
					<p class="text-center">
						<a
							href="/shop/"
							onclick={close}
							class="inline-block bg-sage px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark"
						>
							Continue Shopping
						</a>
					</p>
				{:else}
					<ul class="space-y-5">
						{#each store.cart as item (item.slug + item.size)}
							{@const product = getProductBySlug(item.slug)}
							{#if product}
								<li class="flex gap-4">
									<a href="/product/{product.slug}/" onclick={close} class="shrink-0" tabindex="-1">
										<img
											src={product.image}
											alt={product.name}
											width="120"
											height="150"
											loading="lazy"
											class="h-24 w-20 bg-cream-2 object-cover"
										/>
									</a>
									<div class="min-w-0 flex-1">
										<div class="flex items-start justify-between gap-2">
											<div>
												<p class="text-sm font-medium text-ink">
													<a href="/product/{product.slug}/" onclick={close} class="hover:text-sage-dark">{product.name}</a>
												</p>
												<p class="mt-0.5 text-xs text-ink/60">Size: {item.size}</p>
											</div>
											<p class="shrink-0 text-sm text-ink">${product.price * item.qty}</p>
										</div>
										<div class="mt-2 flex items-center justify-between">
											<div class="flex items-center border border-stone-line">
												<button
													type="button"
													onclick={() => store.setQty(item.slug, item.size, item.qty - 1)}
													aria-label="Decrease quantity of {product.name}"
													class="flex h-9 w-9 items-center justify-center text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-sage"
												>
													<Minus size={14} />
												</button>
												<span class="w-8 text-center text-sm" aria-label="Quantity">{item.qty}</span>
												<button
													type="button"
													onclick={() => store.setQty(item.slug, item.size, item.qty + 1)}
													disabled={item.qty >= 9}
													aria-label="Increase quantity of {product.name}"
													class="flex h-9 w-9 items-center justify-center text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-sage disabled:opacity-40"
												>
													<Plus size={14} />
												</button>
											</div>
											<button
												type="button"
												onclick={() => store.removeFromCart(item.slug, item.size)}
												aria-label="Remove {product.name} from bag"
												class="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition hover:bg-sage-panel hover:text-ink focus-visible:outline-2 focus-visible:outline-sage"
											>
												<Trash size={17} />
											</button>
										</div>
									</div>
								</li>
							{/if}
						{/each}
					</ul>
				{/if}
			</div>

			<!-- Footer -->
			{#if store.cart.length > 0}
				<div class="border-t border-stone-line px-5 py-4">
					<div class="flex items-center justify-between text-base">
						<span class="text-ink/80">Subtotal</span>
						<span class="font-medium text-ink">${store.subtotal}</span>
					</div>
					<p class="mt-1 text-xs text-ink/60">Shipping and taxes calculated at checkout.</p>
					<a
						href="/checkout/"
						class="mt-4 flex items-center justify-center gap-2 bg-sage px-6 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						Checkout <ArrowRight size={16} />
					</a>
				</div>
			{/if}
		</div>
	</div>
{/if}
