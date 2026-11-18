<script lang="ts">
	import { ArrowLeft, MagnifyingGlass } from 'phosphor-svelte';
	import Reveal from '#lib/components/Reveal.svelte';

	let { status, error }: { status: number; error: App.Error } = $props();

	let query = $state('');

	const is404 = $derived(status === 404);

	const popular = [
		{ label: 'Shop all products', href: '/shop/' },
		{ label: 'New arrivals', href: '/new/' },
		{ label: 'Lookbook', href: '/lookbook/' },
		{ label: 'Our story', href: '/about/' },
		{ label: 'Help & FAQ', href: '/help/' },
		{ label: 'Size guide', href: '/size-guide/' },
		{ label: 'Shipping & delivery', href: '/shipping/' },
		{ label: 'Returns & exchanges', href: '/returns/' }
	];
</script>

<svelte:head>
	<title>{is404 ? 'Page not found' : 'Something went wrong'} — AURA Essentials</title>
	<meta
		name="description"
		content="This page couldn't be found. Search the AURA Essentials collection or head back to the home page."
	/>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
	<Reveal>
		<p class="font-display text-7xl leading-none font-medium text-sage sm:text-8xl" aria-hidden="true">
			{status}
		</p>
		<h1 class="mt-4 font-display text-[42px] leading-[1.08] font-medium text-ink sm:text-5xl">
			{is404 ? 'Page not found' : 'Something went wrong'}
		</h1>
		<p class="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/75">
			{#if is404}
				The page you're looking for has moved, or the link you followed is out of date.
				Try searching, or head back to the start.
			{:else}
				{error?.message ?? 'An unexpected error stopped this page from loading. Please try again.'}
			{/if}
		</p>
	</Reveal>

	<Reveal>
		<form
			class="mx-auto mt-8 flex max-w-md items-stretch overflow-hidden rounded-md border border-stone-line bg-cream-2 focus-within:border-sage"
			action="/search/"
			method="get"
			role="search"
		>
			<label for="error-search" class="sr-only">Search products</label>
			<input
				id="error-search"
				type="search"
				name="q"
				bind:value={query}
				placeholder="Search products…"
				autocomplete="off"
				class="min-h-11 min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
			/>
			<button
				type="submit"
				aria-label="Search"
				class="flex w-12 shrink-0 items-center justify-center bg-sage text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				<MagnifyingGlass size={18} />
			</button>
		</form>
	</Reveal>

	<Reveal>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
			<a
				href="/"
				class="inline-flex min-h-11 items-center gap-2 bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				<ArrowLeft size={16} />
				Back to home
			</a>
			<a
				href="/help/"
				class="inline-flex min-h-11 items-center text-sm font-medium text-ink transition hover:text-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Visit the Help Centre
			</a>
		</div>
	</Reveal>

	<Reveal>
		<div class="mt-12 border-t border-stone-line pt-8 text-left">
			<h2 class="text-center font-display text-2xl font-medium text-ink">Popular pages</h2>
			<ul class="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-center sm:grid-cols-4">
				{#each popular as link}
					<li>
						<a
							href={link.href}
							class="inline-block min-h-11 py-2 text-sm text-ink/75 transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</Reveal>
</section>
