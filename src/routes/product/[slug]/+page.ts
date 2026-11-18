import { error } from '@sveltejs/kit';
import { PRODUCTS, getProductBySlug } from '#lib/data/products';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => PRODUCTS.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const product = getProductBySlug(params.slug);
	if (!product) error(404, 'Product not found');
	return { product };
};
