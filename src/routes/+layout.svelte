<script lang="ts">
	import '../lib/app.css';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import Toasts from '#lib/components/Toasts.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link
		rel="icon"
		href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%237A8B6F'/%3E%3Ctext x='32' y='46' font-family='Georgia, serif' font-size='38' fill='%23F5F1EB' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E"
	/>
	<noscript><style>.reveal{opacity:1 !important;transform:none !important;}</style></noscript>
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<Footer />
<CartDrawer />
<Toasts />
