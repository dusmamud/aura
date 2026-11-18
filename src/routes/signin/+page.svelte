<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from '#lib/toast.svelte';

	const USER_KEY = 'aura-user';

	const inputCls =
		'w-full min-h-11 border border-stone-line bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-sage';
	const inputErrCls =
		'w-full min-h-11 border border-red-800 bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-red-800';
	const labelCls = 'mb-1.5 block text-sm font-medium text-ink';

	// Sign in
	let signinEmail = $state('');
	let signinPassword = $state('');
	let signinError = $state('');

	// Create account
	let newName = $state('');
	let newEmail = $state('');
	let newPassword = $state('');
	let createError = $state('');

	function nameFromEmail(email: string): string {
		const prefix = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
		return prefix
			.split(' ')
			.filter(Boolean)
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
	}

	function saveUser(name: string, email: string) {
		try {
			localStorage.setItem(USER_KEY, JSON.stringify({ name, email }));
		} catch {
			// Demo sign-in still continues for this session.
		}
	}

	function signIn() {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signinEmail.trim())) {
			signinError = 'Please enter a valid email address.';
			return;
		}
		if (signinPassword.length < 6) {
			signinError = 'Password must be at least 6 characters.';
			return;
		}
		signinError = '';
		saveUser(nameFromEmail(signinEmail.trim()), signinEmail.trim());
		toast.show('Welcome back to AURA Essentials');
		goto('/account/');
	}

	function createAccount() {
		if (!newName.trim()) {
			createError = 'Please enter your name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {
			createError = 'Please enter a valid email address.';
			return;
		}
		if (newPassword.length < 6) {
			createError = 'Password must be at least 6 characters.';
			return;
		}
		createError = '';
		saveUser(newName.trim(), newEmail.trim());
		toast.show(`Welcome to AURA Essentials, ${newName.trim()}`);
		goto('/account/');
	}
</script>

<svelte:head>
	<title>Sign In — AURA Essentials</title>
	<meta
		name="description"
		content="Sign in to your AURA Essentials account or create one. Demo only — your details stay in your browser."
	/>
	<link rel="canonical" href="https://aura.pages.dev/signin/" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<div class="mx-auto max-w-xl text-center">
		<h1 class="font-display text-4xl font-medium text-ink sm:text-5xl">Welcome to AURA</h1>
		<p class="mt-3 text-sm leading-relaxed text-ink/70">
			Sign in to view your orders and saved details. This is a demo — your details are stored only in
			your own browser, and no account is created on any server.
		</p>
	</div>

	<div class="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-2">
		<!-- Sign in -->
		<section class="border border-stone-line bg-cream-2 p-6 sm:p-8" aria-label="Sign in">
			<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Sign In</h2>
			<form
				class="mt-6 space-y-5"
				onsubmit={(e) => {
					e.preventDefault();
					signIn();
				}}
			>
				<div>
					<label for="signin-email" class={labelCls}>Email</label>
					<input
						id="signin-email"
						type="email"
						bind:value={signinEmail}
						autocomplete="email"
						aria-invalid={signinError ? 'true' : 'false'}
						aria-describedby={signinError ? 'signin-error' : undefined}
						class={signinError ? inputErrCls : inputCls}
					/>
				</div>
				<div>
					<label for="signin-password" class={labelCls}>Password</label>
					<input
						id="signin-password"
						type="password"
						bind:value={signinPassword}
						autocomplete="current-password"
						aria-invalid={signinError ? 'true' : 'false'}
						aria-describedby={signinError ? 'signin-error' : undefined}
						class={signinError ? inputErrCls : inputCls}
					/>
				</div>
				{#if signinError}
					<p id="signin-error" role="alert" class="text-sm text-red-800">{signinError}</p>
				{/if}
				<button
					type="submit"
					class="min-h-12 w-full bg-sage px-8 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Sign In
				</button>
			</form>
			<p class="mt-4 text-xs leading-relaxed text-ink/60">
				Demo only — any email and a password of 6+ characters will sign you in.
			</p>
		</section>

		<!-- Create account -->
		<section class="border border-stone-line bg-cream-2 p-6 sm:p-8" aria-label="Create account">
			<h2 class="font-display text-2xl font-medium text-ink sm:text-3xl">Create Account</h2>
			<form
				class="mt-6 space-y-5"
				onsubmit={(e) => {
					e.preventDefault();
					createAccount();
				}}
			>
				<div>
					<label for="create-name" class={labelCls}>Full name</label>
					<input
						id="create-name"
						type="text"
						bind:value={newName}
						autocomplete="name"
						aria-invalid={createError ? 'true' : 'false'}
						aria-describedby={createError ? 'create-error' : undefined}
						class={createError ? inputErrCls : inputCls}
					/>
				</div>
				<div>
					<label for="create-email" class={labelCls}>Email</label>
					<input
						id="create-email"
						type="email"
						bind:value={newEmail}
						autocomplete="email"
						aria-invalid={createError ? 'true' : 'false'}
						aria-describedby={createError ? 'create-error' : undefined}
						class={createError ? inputErrCls : inputCls}
					/>
				</div>
				<div>
					<label for="create-password" class={labelCls}>Password</label>
					<input
						id="create-password"
						type="password"
						bind:value={newPassword}
						autocomplete="new-password"
						aria-invalid={createError ? 'true' : 'false'}
						aria-describedby={createError ? 'create-error' : undefined}
						class={createError ? inputErrCls : inputCls}
					/>
				</div>
				{#if createError}
					<p id="create-error" role="alert" class="text-sm text-red-800">{createError}</p>
				{/if}
				<button
					type="submit"
					class="min-h-12 w-full bg-ink px-8 py-3.5 text-sm font-medium tracking-wide text-cream transition hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
				>
					Create Account
				</button>
			</form>
			<p class="mt-4 text-xs leading-relaxed text-ink/60">
				Demo only — no real account is created and nothing is sent to a server.
			</p>
		</section>
	</div>
</div>
