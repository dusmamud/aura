<script lang="ts">
	import { Check, Gift } from 'phosphor-svelte';
	import { toast } from '#lib/toast.svelte';

	const AMOUNTS = [50, 100, 150, 200];

	const inputCls =
		'w-full min-h-11 border border-stone-line bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-sage';
	const inputErrCls =
		'w-full min-h-11 border border-red-800 bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-red-800';
	const labelCls = 'mb-1.5 block text-sm font-medium text-ink';

	let amount = $state(100);
	let recipientName = $state('');
	let recipientEmail = $state('');
	let message = $state('');
	let error = $state('');
	let issuedCode = $state('');

	function makeCode(): string {
		const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
		let suffix = '';
		for (let i = 0; i < 4; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
		return `AURA-GIFT-${suffix}`;
	}

	function purchase() {
		if (!recipientName.trim()) {
			error = 'Please enter the recipient’s name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
			error = 'Please enter a valid recipient email address.';
			return;
		}
		error = '';
		issuedCode = makeCode();
		toast.show(`Gift card ${issuedCode} created — $${amount}`);
	}

	function copyCode() {
		if (!issuedCode) return;
		if (navigator.clipboard) {
			navigator.clipboard.writeText(issuedCode).then(
				() => toast.show('Gift card code copied'),
				() => toast.show(`Code: ${issuedCode}`)
			);
		} else {
			toast.show(`Code: ${issuedCode}`);
		}
	}
</script>

<svelte:head>
	<title>Gift Cards — AURA Essentials</title>
	<meta
		name="description"
		content="Give an AURA Essentials gift card — choose $50, $100, $150 or $200, add a message, and share the code. Demo only, no payment is taken."
	/>
	<link rel="canonical" href="https://aura-design.pages.dev/gift-cards/" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<div class="mx-auto max-w-2xl text-center">
		<Gift size={40} class="mx-auto text-sage-dark" />
		<h1 class="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">Gift Cards</h1>
		<p class="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
			Give the gift of effortless essentials. Choose an amount, add a message, and share the code with
			someone you love. Demo only — no payment is taken and no real gift card is issued.
		</p>
	</div>

	<div class="mx-auto mt-10 max-w-2xl border border-stone-line bg-cream-2 p-6 sm:p-8">
		<form
			onsubmit={(e) => {
				e.preventDefault();
				purchase();
			}}
		>
			<fieldset>
				<legend class="text-sm font-medium text-ink">Choose an amount</legend>
				<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Gift card amount">
					{#each AMOUNTS as a}
						<button
							type="button"
							role="radio"
							aria-checked={amount === a}
							onclick={() => (amount = a)}
							class="min-h-12 border px-4 py-3 font-display text-2xl font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage {amount === a
								? 'border-sage bg-sage text-white'
								: 'border-stone-line bg-cream text-ink hover:border-sage'}"
						>
							${a}
						</button>
					{/each}
				</div>
			</fieldset>

			<div class="mt-6 grid gap-5 sm:grid-cols-2">
				<div>
					<label for="gift-name" class={labelCls}>Recipient’s name</label>
					<input
						id="gift-name"
						type="text"
						bind:value={recipientName}
						autocomplete="off"
						aria-invalid={error ? 'true' : 'false'}
						class={error ? inputErrCls : inputCls}
					/>
				</div>
				<div>
					<label for="gift-email" class={labelCls}>Recipient’s email</label>
					<input
						id="gift-email"
						type="email"
						bind:value={recipientEmail}
						autocomplete="email"
						aria-invalid={error ? 'true' : 'false'}
						class={error ? inputErrCls : inputCls}
					/>
				</div>
				<div class="sm:col-span-2">
					<label for="gift-message" class={labelCls}>Message <span class="font-normal text-ink/60">(optional)</span></label>
					<textarea
						id="gift-message"
						bind:value={message}
						rows="3"
						maxlength="200"
						placeholder="A little something for you…"
						class="w-full resize-y border border-stone-line bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-sage"
					></textarea>
				</div>
			</div>

			{#if error}
				<p role="alert" class="mt-4 text-sm text-red-800">{error}</p>
			{/if}

			<button
				type="submit"
				class="mt-6 min-h-12 w-full bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
			>
				Purchase Gift Card — ${amount}
			</button>
			<p class="mt-3 text-center text-xs text-ink/60">
				Demo only — no payment is taken and no email is sent.
			</p>
		</form>

		{#if issuedCode}
			<div class="mt-8 border border-sage bg-sage-panel px-6 py-6 text-center" role="status">
				<Check size={28} class="mx-auto text-sage-dark" />
				<h2 class="mt-2 font-display text-2xl font-medium text-ink">Your gift card is ready</h2>
				<p class="mt-1 text-sm text-ink/75">
					${amount} for {recipientName}
					{#if message} — “{message}”{/if}
				</p>
				<p class="mt-4 inline-block bg-cream px-5 py-3 font-mono text-lg font-medium tracking-[0.12em] text-ink">
					{issuedCode}
				</p>
				<div class="mt-4">
					<button
						type="button"
						onclick={copyCode}
						class="min-h-11 border border-stone-line bg-cream px-6 text-sm font-medium text-ink transition hover:bg-cream-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
					>
						Copy Code
					</button>
				</div>
				<p class="mt-3 text-xs leading-relaxed text-ink/60">
					Share this code with the recipient. In the full store it would be redeemed at checkout — for
					now, keep it as a demo keepsake.
				</p>
			</div>
		{/if}
	</div>
</div>
