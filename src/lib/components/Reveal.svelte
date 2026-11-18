<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { children: Snippet; class?: string };
	let { children, class: cls = '' }: Props = $props();

	let el: HTMLDivElement | undefined = $state();
	let visible = $state(false);

	$effect(() => {
		const node = el;
		if (!node) return;
		if (typeof IntersectionObserver === 'undefined') {
			visible = true;
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visible = true;
						observer.disconnect();
					}
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
		);
		observer.observe(node);
		return () => observer.disconnect();
	});
</script>

<div bind:this={el} class="reveal {visible ? 'is-visible' : ''} {cls}">
	{@render children()}
</div>
