import { getProductBySlug } from './data/products';

export type CartItem = { slug: string; size: string; qty: number };

const CART_KEY = 'aura-cart';
const WISHLIST_KEY = 'aura-wishlist';
const RECENT_KEY = 'aura-recent';

function read<T>(key: string, fallback: T): T {
	if (typeof localStorage === 'undefined') return fallback;
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

function write(key: string, value: unknown): void {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Storage full or unavailable — cart stays in memory for this session.
	}
}

class Store {
	cart = $state<CartItem[]>(read<CartItem[]>(CART_KEY, []));
	wishlist = $state<string[]>(read<string[]>(WISHLIST_KEY, []));
	recentlyViewed = $state<string[]>(read<string[]>(RECENT_KEY, []));
	cartOpen = $state(false);

	cartCount = $derived(this.cart.reduce((n, i) => n + i.qty, 0));

	subtotal = $derived(
		this.cart.reduce((sum, i) => {
			const p = getProductBySlug(i.slug);
			return sum + (p ? p.price * i.qty : 0);
		}, 0)
	);

	addToCart(slug: string, size: string, qty = 1): void {
		const existing = this.cart.find((i) => i.slug === slug && i.size === size);
		if (existing) {
			existing.qty = Math.min(9, existing.qty + qty);
		} else {
			this.cart.push({ slug, size, qty: Math.min(9, qty) });
		}
		this.persistCart();
	}

	removeFromCart(slug: string, size: string): void {
		this.cart = this.cart.filter((i) => !(i.slug === slug && i.size === size));
		this.persistCart();
	}

	setQty(slug: string, size: string, qty: number): void {
		const item = this.cart.find((i) => i.slug === slug && i.size === size);
		if (!item) return;
		if (qty <= 0) {
			this.removeFromCart(slug, size);
			return;
		}
		item.qty = Math.min(9, qty);
		this.persistCart();
	}

	toggleWishlist(slug: string): void {
		if (this.wishlist.includes(slug)) {
			this.wishlist = this.wishlist.filter((s) => s !== slug);
		} else {
			this.wishlist = [...this.wishlist, slug];
		}
		write(WISHLIST_KEY, this.wishlist);
	}

	isWishlisted(slug: string): boolean {
		return this.wishlist.includes(slug);
	}

	addRecent(slug: string): void {
		this.recentlyViewed = [slug, ...this.recentlyViewed.filter((s) => s !== slug)].slice(0, 8);
		write(RECENT_KEY, this.recentlyViewed);
	}

	private persistCart(): void {
		write(CART_KEY, this.cart);
	}
}

export const store = new Store();
