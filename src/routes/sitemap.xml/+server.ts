import { LOOKS, PRODUCTS } from '#lib/data/products';

export const prerender = true;

const SITE = 'https://aura-design.pages.dev';

const STATIC_ROUTES = [
	'/',
	'/shop/',
	'/categories/',
	'/new/',
	'/collections/',
	'/lookbook/',
	'/deals/',
	'/gift-cards/',
	'/about/',
	'/help/',
	'/shipping/',
	'/returns/',
	'/size-guide/',
	'/privacy/',
	'/terms/',
	'/accessibility/'
];

export function GET(): Response {
	const urls = [
		...STATIC_ROUTES,
		...PRODUCTS.map((p) => `/product/${p.slug}/`),
		...LOOKS.map((l) => `/lookbook/${l.slug}/`)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
		.map((u) => `  <url><loc>${SITE}${u}</loc></url>`)
		.join('\n')}\n</urlset>\n`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
}
