# AURA Essentials

Modern essentials. Effortless every day. A fashion storefront — timeless pieces,
thoughtful design, made for real life.

Live: https://aura.pages.dev

## Stack (locked)

- Svelte 5.57.3 + SvelteKit 3.2.0 + Vite 8.3.8 + TypeScript
- Tailwind CSS 4.3.5 + adapter-static (prerender, `trailingSlash: 'always'`)
- Icons: phosphor-svelte only
- Fonts: Cormorant Garamond (display serif) + Jost (body sans)

## Pages (26 prerendered routes)

Home, Shop (filters / sort / search), Categories, New Arrivals, Collections,
Lookbook + 4 looks, Product detail ×12, Cart (drawer + page), Checkout (demo,
order `AURA-*`), Search, Wishlist, Compare (max 3), Sign in (demo), Account,
Track order, Gift cards (`AURA-GIFT-*`), Deals (`AURA20` = 20% off), About,
Help / FAQ, Shipping, Returns, Size Guide, Privacy, Terms, Accessibility, 404,
`sitemap.xml` + `robots.txt`.

## Features

- Cart / wishlist / recently viewed in localStorage; free-shipping progress to $150
- 3-step demo checkout, demo sign-in, gift cards, order tracking (demo data)
- One meta layer per page, server-rendered JSON-LD (Organization / WebSite /
  Product / Offer — no aggregateRating in structured data), sitemap of content
  routes only, `_headers` with immutable hashed assets
- Mobile-first, overflow 0px at 320 / 360 / 390 / 768 / 1024 / 1440; motion is
  opacity / transform only, with `prefers-reduced-motion` respected

## Develop

```sh
npm install
npm run dev
npm run check   # svelte-check
npm run build   # static output in build/
npm run preview # vite preview --host 127.0.0.1
```

## API seam

`src/lib/api.ts` holds the base URL + static catalogue data. The frontend is
client-side first; a Go REST API replaces the seam later (same pattern as
Shoemate / Kumbuild).

## Deploy

GitHub Actions (`.github/workflows/deploy-cloudflare-pages.yml`) builds and
deploys `build/` to the Cloudflare Pages project `aura` on every push to `main`.
Required repo secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

## Notes

- Product photos are AI-generated in the reference palette (warm cream / beige /
  taupe / sage). On-page star counts come from the reference design; no
  testimonials are invented and no ratings are published in JSON-LD.
- Contact / social links are placeholders until real brand profiles exist.
