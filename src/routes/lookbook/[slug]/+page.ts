import { error } from '@sveltejs/kit';
import { LOOKS, getProductBySlug } from '#lib/data/products';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => LOOKS.map((l) => ({ slug: l.slug }));

export const load: PageLoad = ({ params }) => {
	const look = LOOKS.find((l) => l.slug === params.slug);
	if (!look) error(404, 'Look not found');
	const products = look.productSlugs
		.map((slug) => getProductBySlug(slug))
		.filter((p): p is NonNullable<typeof p> => Boolean(p));
	return { look, products };
};
