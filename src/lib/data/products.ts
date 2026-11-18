export type Product = {
	slug: string;
	name: string;
	price: number;
	compareAt?: number;
	category: string;
	colour: string;
	sizes: string[];
	badge?: string;
	seasonal?: boolean;
	reviewCount?: number;
	image: string;
	blurb: string;
};

export const CATEGORIES: string[] = [
	'Knitwear',
	'Shirts',
	'Trousers',
	'Jackets',
	'Basics',
	'Accessories'
];

export const PRODUCTS: Product[] = [
	{
		slug: 'relaxed-merino-sweater',
		badge: 'New',
		seasonal: true,
		name: 'Relaxed Merino Sweater',
		price: 120,
		category: 'Knitwear',
		colour: 'Sage',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		image: '/images/prod-merino-sweater.jpg',
		blurb: 'Soft merino, relaxed through the body. A quiet staple for cool mornings.'
	},
	{
		slug: 'oversized-cotton-shirt',
		badge: 'New',
		seasonal: true,
		name: 'Oversized Cotton Shirt',
		price: 98,
		category: 'Shirts',
		colour: 'Ivory',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		image: '/images/prod-cotton-shirt.jpg',
		blurb: 'Crisp organic cotton with a generous, easy drape. Tuck it in or let it fall.'
	},
	{
		slug: 'wide-leg-pleated-trouser',
		badge: 'New',
		seasonal: true,
		name: 'Wide-Leg Pleated Trouser',
		price: 140,
		category: 'Trousers',
		colour: 'Stone',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		image: '/images/prod-pleated-trouser.jpg',
		blurb: 'High-rise, wide-leg, softly pleated. Tailored ease for every day.'
	},
	{
		slug: 'relaxed-linen-blazer',
		badge: 'New',
		seasonal: true,
		name: 'Relaxed Linen Blazer',
		price: 190,
		category: 'Jackets',
		colour: 'Sand',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		image: '/images/prod-linen-blazer.jpg',
		blurb: 'Unstructured linen that breathes. Sharp enough for work, soft enough for weekends.'
	},
	{
		slug: 'cashmere-crew-neck',
		name: 'Cashmere Crew Neck',
		price: 130,
		category: 'Knitwear',
		colour: 'Oat',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		reviewCount: 124,
		image: '/images/prod-cashmere-crew.jpg',
		blurb: 'Feather-light cashmere in a classic crew. The one you will reach for daily.'
	},
	{
		slug: 'everyday-tote',
		name: 'Everyday Tote',
		price: 165,
		category: 'Accessories',
		colour: 'Tan',
		sizes: ['One Size'],
		reviewCount: 98,
		image: '/images/prod-everyday-tote.jpg',
		blurb: 'Full-grain leather, room for a laptop and a paperback. Carries the day.'
	},
	{
		slug: 'ribbed-tank-top',
		name: 'Ribbed Tank Top',
		price: 45,
		category: 'Basics',
		colour: 'Ecru',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		reviewCount: 136,
		image: '/images/prod-ribbed-tank.jpg',
		blurb: 'A fine ribbed knit that layers under everything. Cut close, never tight.'
	},
	{
		slug: 'classic-wool-coat',
		name: 'Classic Wool Coat',
		price: 250,
		category: 'Jackets',
		colour: 'Camel',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		reviewCount: 87,
		image: '/images/prod-wool-coat.jpg',
		blurb: 'A straight, knee-length wool coat with a clean collar. Made to last seasons.'
	},
	{
		slug: 'ribbed-knit-cardigan',
		name: 'Ribbed Knit Cardigan',
		price: 135,
		category: 'Knitwear',
		colour: 'Mushroom',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		image: '/images/prod-knit-cardigan.jpg',
		blurb: 'Chunky rib, dropped shoulders, deep pockets. The cosy layer over anything.'
	},
	{
		slug: 'leather-crossbody',
		name: 'Leather Crossbody',
		price: 145,
		category: 'Accessories',
		colour: 'Chestnut',
		sizes: ['One Size'],
		image: '/images/prod-crossbody.jpg',
		blurb: 'A compact crossbody in smooth leather, with room for the essentials only.'
	},
	{
		slug: 'organic-cotton-tee',
		name: 'Organic Cotton Tee',
		price: 55,
		category: 'Basics',
		colour: 'White',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		image: '/images/prod-cotton-tee.jpg',
		blurb: 'Heavyweight organic cotton, garment-dyed. The perfect white tee, finally.'
	},
	{
		slug: 'tailored-linen-shirt',
		name: 'Tailored Linen Shirt',
		price: 115,
		category: 'Shirts',
		colour: 'Sky',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		image: '/images/prod-linen-shirt.jpg',
		blurb: 'A neat, tailored cut in washed linen. Cool, crisp, and quietly polished.'
	}
];

export type Look = {
	slug: string;
	title: string;
	image: string;
	productSlugs: string[];
};

export const LOOKS: Look[] = [
	{
		slug: 'soft-layers',
		title: 'Soft Layers',
		image: '/images/look-soft-layers.jpg',
		productSlugs: ['cashmere-crew-neck', 'wide-leg-pleated-trouser']
	},
	{
		slug: 'weekend-ease',
		title: 'Weekend Ease',
		image: '/images/look-weekend-ease.jpg',
		productSlugs: ['ribbed-knit-cardigan', 'organic-cotton-tee', 'everyday-tote']
	},
	{
		slug: 'city-minimal',
		title: 'City Minimal',
		image: '/images/look-city-minimal.jpg',
		productSlugs: ['relaxed-linen-blazer', 'oversized-cotton-shirt', 'wide-leg-pleated-trouser']
	},
	{
		slug: 'effortless-neutrals',
		title: 'Effortless Neutrals',
		image: '/images/look-effortless-neutrals.jpg',
		productSlugs: ['classic-wool-coat', 'ribbed-tank-top', 'leather-crossbody']
	}
];

export type Deal = {
	code: string;
	percentOff: number;
	label: string;
};

export const DEALS: Deal[] = [
	{ code: 'AURA20', percentOff: 20, label: '20% off Seasonal Edit' }
];

export function getProductBySlug(slug: string): Product | undefined {
	return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
	return PRODUCTS.filter((p) => p.category === category);
}
