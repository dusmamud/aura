<script lang="ts">
	import { Check, X } from 'phosphor-svelte';
	import { toast } from '../toast.svelte';
</script>

<div class="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-2 px-4" aria-live="polite">
	{#each toast.toasts as t (t.id)}
		<div class="pointer-events-auto flex w-full items-center gap-3 rounded-md bg-ink px-4 py-3 text-sm text-cream shadow-lg">
			<Check size={17} class="shrink-0 text-sage-panel" />
			<p class="flex-1">{t.message}</p>
			<button
				type="button"
				onclick={() => toast.dismiss(t.id)}
				aria-label="Dismiss notification"
				class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-cream/70 transition hover:text-cream focus-visible:outline-2 focus-visible:outline-sage-panel"
			>
				<X size={16} />
			</button>
		</div>
	{/each}
</div>
