<script lang="ts">
	import { Heart, Plus, Star } from 'phosphor-svelte';
	import { store } from '../store.svelte';
	import { toast } from '../toast.svelte';
	import type { Product } from '../data/products';

	type Props = { product: Product };
	let { product }: Props = $props();

	let wishlisted = $derived(store.isWishlisted(product.slug));

	function toggleHeart() {
		store.toggleWishlist(product.slug);
		toast.show(
			store.isWishlisted(product.slug)
				? `${product.name} added to your wishlist`
				: `${product.name} removed from your wishlist`
		);
	}

	// Quick-add uses the middle size (M) when the product has sizes, otherwise
	// its only size — PDP still asks for a size for a deliberate purchase.
	function quickAdd() {
		const size = product.sizes.includes('M') ? 'M' : product.sizes[0];
		store.addToCart(product.slug, size);
		toast.show(`${product.name} (${size}) added to your bag`);
	}
</script>

<article class="group">
	<div class="relative overflow-hidden bg-cream-2">
		<a href="/product/{product.slug}/" aria-label={product.name} tabindex="-1">
			<img
				src={product.image}
				alt={product.name}
				width="600"
				height="750"
				loading="lazy"
				class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
			/>
		</a>
		{#if product.badge}
			<span class="absolute left-3 top-3 bg-cream px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] text-ink uppercase">
				{product.badge}
			</span>
		{/if}
		<button
			type="button"
			onclick={toggleHeart}
			aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
			aria-pressed={wishlisted}
			class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-ink shadow-sm transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
		>
			<Heart size={19} weight={wishlisted ? 'fill' : 'regular'} class={wishlisted ? 'text-sage-dark' : ''} />
		</button>
		<button
			type="button"
			onclick={quickAdd}
			aria-label={`Quick-add ${product.name} to your bag`}
			class="absolute inset-x-3 bottom-3 flex translate-y-1 items-center justify-center gap-2 bg-ink/90 px-4 py-2.5 text-[13px] font-medium tracking-wide text-cream opacity-0 transition duration-300 hover:bg-ink focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
		>
			<Plus size={15} />
			Quick Add — ${product.price}
		</button>
	</div>
	<div class="mt-3 flex items-start justify-between gap-3">
		<div>
			<h3 class="text-[15px] leading-snug text-ink">
				<a href="/product/{product.slug}/" class="transition hover:text-sage-dark">{product.name}</a>
			</h3>
			{#if product.reviewCount}
				<p class="mt-1 flex items-center gap-1 text-xs text-ink/60" aria-label="{product.reviewCount} reviews">
					<span class="flex text-sage-dark" aria-hidden="true">
						{#each [0, 1, 2, 3, 4] as _}
							<Star size={12} weight="fill" />
						{/each}
					</span>
					({product.reviewCount})
				</p>
			{/if}
		</div>
		<p class="shrink-0 text-[15px] text-ink">${product.price}</p>
	</div>
</article>
