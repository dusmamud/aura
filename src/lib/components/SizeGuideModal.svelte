<script lang="ts">
	import { X } from 'phosphor-svelte';

	type Props = { open: boolean; onClose: () => void };
	let { open, onClose }: Props = $props();

	let closeBtn: HTMLButtonElement | undefined = $state();

	function onKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') onClose();
	}

	$effect(() => {
		if (open) {
			closeBtn?.focus();
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
	<div class="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Size guide">
		<button
			type="button"
			aria-label="Close size guide"
			onclick={onClose}
			class="absolute inset-0 h-full w-full cursor-default bg-ink/40"
		></button>
		<div class="relative max-h-[85dvh] w-full max-w-lg overflow-y-auto bg-cream p-6 shadow-xl sm:p-8">
			<div class="flex items-start justify-between gap-4">
				<div>
					<h2 class="font-display text-3xl font-medium text-ink">Size Guide</h2>
					<p class="mt-1 text-sm text-ink/70">Body measurements in centimetres. A guide only — fit varies by style.</p>
				</div>
				<button
					type="button"
					bind:this={closeBtn}
					onclick={onClose}
					aria-label="Close size guide"
					class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-sage-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					<X size={22} />
				</button>
			</div>
			<table class="mt-6 w-full border-collapse text-sm">
				<caption class="sr-only">Body measurements by size</caption>
				<thead>
					<tr class="border-b border-stone-line text-left text-xs tracking-[0.12em] text-ink/60 uppercase">
						<th scope="col" class="py-2 pr-2 font-medium">Size</th>
						<th scope="col" class="py-2 pr-2 font-medium">Bust / chest</th>
						<th scope="col" class="py-2 pr-2 font-medium">Waist</th>
						<th scope="col" class="py-2 font-medium">Hip</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-stone-line"><th scope="row" class="py-2.5 pr-2 font-medium">XS</th><td class="py-2.5 pr-2">76–81</td><td class="py-2.5 pr-2">58–63</td><td class="py-2.5">84–89</td></tr>
					<tr class="border-b border-stone-line"><th scope="row" class="py-2.5 pr-2 font-medium">S</th><td class="py-2.5 pr-2">81–86</td><td class="py-2.5 pr-2">63–68</td><td class="py-2.5">89–94</td></tr>
					<tr class="border-b border-stone-line"><th scope="row" class="py-2.5 pr-2 font-medium">M</th><td class="py-2.5 pr-2">86–91</td><td class="py-2.5 pr-2">68–73</td><td class="py-2.5">94–99</td></tr>
					<tr class="border-b border-stone-line"><th scope="row" class="py-2.5 pr-2 font-medium">L</th><td class="py-2.5 pr-2">91–97</td><td class="py-2.5 pr-2">73–79</td><td class="py-2.5">99–105</td></tr>
					<tr><th scope="row" class="py-2.5 pr-2 font-medium">XL</th><td class="py-2.5 pr-2">97–104</td><td class="py-2.5 pr-2">79–86</td><td class="py-2.5">105–112</td></tr>
				</tbody>
			</table>
			<p class="mt-5 text-sm leading-relaxed text-ink/70">
				Between sizes? Size up for a relaxed fit, down for a closer fit. Accessories are One Size.
				Still unsure — write to us and we will help you choose.
			</p>
			<button
				type="button"
				onclick={onClose}
				class="mt-6 inline-block min-h-11 bg-sage px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Got it
			</button>
		</div>
	</div>
{/if}
