<script lang="ts">
	import { enhance } from '$app/forms';
	import Panel from '$lib/components/panel.svelte';

	export let form;

	let email: string = form?.values?.email || '';
	let password: string = '';
	let formElement: HTMLFormElement;
</script>

<div class="container h-full mx-auto flex flex-col gap-4 justify-center items-center">
	<h2 class="h2">Se connecter</h2>
	<Panel style="w-screen max-w-lg">
		<form
			method="post"
			use:enhance
			action="?/login"
			bind:this={formElement}
			class="flex flex-col gap-4"
		>
			<label class="label">
				<span>Courriel</span>
				<input
					class="input"
					title="Input (email)"
					type="email"
					placeholder="john@example.com"
					autocomplete="email"
					name="email"
					bind:value={email}
				/>
			</label>
			<label class="label">
				<span>Mot de passe</span>
				<input
					class="input"
					title="Input (password)"
					type="password"
					placeholder="password"
					name="password"
					bind:value={password}
				/>
			</label>
			{#if form?.success === false}
				<span class="badge variant-filled-error">Mauvais courriel ou mot de passe.</span>
			{/if}
			<button
				type="button"
				class="btn variant-filled-primary"
				disabled={!(email.length > 0 && password.length > 0)}
				on:click={() => {
					formElement.submit();
				}}
			>
				<span>Se connecter</span>
			</button>
		</form>
	</Panel>
</div>
