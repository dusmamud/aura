import { PRODUCTS, getProductBySlug, type Product } from './data/products';

// API seam: the frontend talks to this module only. Today it returns the
// static catalogue; a Go REST API will replace these implementations later
// (set VITE_API_BASE to the API origin and swap the bodies for fetch calls).
export const API_BASE: string = import.meta.env.VITE_API_BASE ?? '';

export async function getProducts(): Promise<Product[]> {
	return PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
	return getProductBySlug(slug);
}
