<script lang="ts">
	import Reveal from '#lib/components/Reveal.svelte';

	type Row = { size: string; a: string; b: string; c?: string };

	const tops: Row[] = [
		{ size: 'XS', a: '78–82 cm · 31–32 in', b: '60–64 cm · 24–25 in' },
		{ size: 'S', a: '82–86 cm · 32–34 in', b: '64–68 cm · 25–27 in' },
		{ size: 'M', a: '86–90 cm · 34–35 in', b: '68–72 cm · 27–28 in' },
		{ size: 'L', a: '90–96 cm · 35–38 in', b: '72–78 cm · 28–31 in' },
		{ size: 'XL', a: '96–102 cm · 38–40 in', b: '78–84 cm · 31–33 in' }
	];

	const trousers: Row[] = [
		{ size: 'XS', a: '60–64 cm · 24–25 in', b: '86–90 cm · 34–35 in', c: '100 cm · 39 in' },
		{ size: 'S', a: '64–68 cm · 25–27 in', b: '90–94 cm · 35–37 in', c: '101 cm · 40 in' },
		{ size: 'M', a: '68–72 cm · 27–28 in', b: '94–98 cm · 37–39 in', c: '102 cm · 40 in' },
		{ size: 'L', a: '72–78 cm · 28–31 in', b: '98–104 cm · 39–41 in', c: '103 cm · 41 in' },
		{ size: 'XL', a: '78–84 cm · 31–33 in', b: '104–110 cm · 41–43 in', c: '104 cm · 41 in' }
	];

	const jackets: Row[] = [
		{ size: 'XS', a: '80–84 cm · 31–33 in', b: '62–66 cm · 24–26 in' },
		{ size: 'S', a: '84–88 cm · 33–35 in', b: '66–70 cm · 26–28 in' },
		{ size: 'M', a: '88–92 cm · 35–36 in', b: '70–74 cm · 28–29 in' },
		{ size: 'L', a: '92–98 cm · 36–39 in', b: '74–80 cm · 29–31 in' },
		{ size: 'XL', a: '98–104 cm · 39–41 in', b: '80–86 cm · 31–34 in' }
	];

	function table(title: string, note: string, cols: string[], rows: Row[]) {
		return { title, note, cols, rows };
	}

	const tables = [
		table('Tops & Knitwear', 'Body measurements — measure yourself, not the garment.', ['Size', 'Bust', 'Waist'], tops),
		table('Trousers', 'Body measurements. Inseam is the garment length for our regular cut.', ['Size', 'Waist', 'Hip', 'Inseam'], trousers),
		table('Jackets & Coats', 'Body measurements — jackets are cut to layer over knitwear.', ['Size', 'Bust', 'Waist'], jackets)
	];
</script>

<svelte:head>
	<title>Size Guide — AURA Essentials</title>
	<meta
		name="description"
		content="AURA Essentials size guide: bust, waist, hip and inseam measurements in cm and inches for tops, knitwear, trousers, jackets and coats, plus how to measure."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/size-guide/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Size Guide — AURA Essentials" />
	<meta
		property="og:description"
		content="Bust, waist and hip measurements in cm and inches — plus how to measure yourself."
	/>
	<meta property="og:url" content="https://aura-design.pages.dev/size-guide/" />
	<meta property="og:image" content="https://aura-design.pages.dev/images/hero.jpg" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
	<Reveal>
		<nav aria-label="Breadcrumb" class="text-sm text-ink/60">
			<a href="/help/" class="transition hover:text-ink">Help</a>
			<span aria-hidden="true"> / </span>
			<span aria-current="page" class="text-ink">Size Guide</span>
		</nav>
		<h1 class="mt-4 font-display text-[42px] leading-[1.08] font-medium text-ink sm:text-5xl">Size Guide</h1>
		<p class="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
			Most AURA pieces are cut with a relaxed, easy fit. Measure yourself (not the garment)
			and match your numbers to the tables below. Between sizes? Size down for a closer fit,
			or stay with your usual size for the intended relaxed drape.
		</p>
		<p class="mt-3 text-sm leading-relaxed text-ink/60">
			These measurements are AURA Essentials' own brand guide — they describe our fit, and
			may differ slightly from other brands.
		</p>
	</Reveal>

	{#each tables as t}
		<Reveal>
			<section class="mt-10">
				<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">{t.title}</h2>
				<p class="mt-1 text-sm text-ink/60">{t.note}</p>
				<div class="mt-4 overflow-x-auto">
					<table class="w-full min-w-[480px] border-collapse text-left text-sm">
						<thead>
							<tr class="border-b border-stone-line">
								{#each t.cols as col}
									<th scope="col" class="py-3 pr-4 font-medium text-ink last:pr-0">{col}</th>
								{/each}
							</tr>
						</thead>
						<tbody class="text-ink/75">
							{#each t.rows as row}
								<tr class="border-b border-stone-line last:border-0">
									<th scope="row" class="py-3 pr-4 font-medium text-ink">{row.size}</th>
									<td class="py-3 pr-4">{row.a}</td>
									<td class="py-3 pr-4">{row.b}</td>
									{#if row.c}
										<td class="py-3">{row.c}</td>
									{/if}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</section>
		</Reveal>
	{/each}

	<Reveal>
		<section class="mt-12 border-t border-stone-line pt-10">
			<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">How to measure</h2>
			<ul class="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/75">
				<li><strong class="font-medium text-ink">Bust:</strong> around the fullest part of your chest, tape level, breathing normally.</li>
				<li><strong class="font-medium text-ink">Waist:</strong> around your natural waist — the narrowest point, usually just above the navel.</li>
				<li><strong class="font-medium text-ink">Hip:</strong> around the fullest part of your hips, feet together.</li>
				<li><strong class="font-medium text-ink">Inseam:</strong> from the inside of the ankle up to the crotch, standing straight.</li>
			</ul>
			<p class="mt-4 text-base leading-relaxed text-ink/75">
				Measure over light clothing, keep the tape snug but not tight, and ask someone to
				help if you can — it's hard to measure your own back. Knitwear relaxes a little
				with wear, so a snug first fit usually settles into the right one.
			</p>
			<p class="mt-4 text-base leading-relaxed text-ink/75">
				Still unsure? Write to us from the
				<a href="/help/" class="font-medium text-sage-dark underline underline-offset-2 hover:text-ink">Help page</a>
				with your measurements and the piece you're eyeing, and we'll advise. And remember:
				everything can be returned or exchanged within 30 days — see
				<a href="/returns/" class="font-medium text-sage-dark underline underline-offset-2 hover:text-ink">Returns &amp; Exchanges</a>.
			</p>
		</section>
	</Reveal>
</section>
