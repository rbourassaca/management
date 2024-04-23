<script lang="ts">
	import { enhance } from '$app/forms';
	import Panel from '$lib/components/panel.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumb';
	$breadcrumbStore = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Espace client', href: '/dashboard' },
		{ name: 'Organisations', href: '/dashboard/settings/organizations' },
		{ name: 'Créer une organisation' }
	];

	let formElement: HTMLFormElement;
	let name: string = '';
</script>

<h1 class="h1">Créer une organisation</h1>

<Panel>
	<form
		action="?/create"
		method="post"
		class="flex flex-col gap-4"
		use:enhance
		bind:this={formElement}
	>
		<label class="label">
			<span>Nom</span>
			<input
				class="input"
				type="text"
				placeholder="Les Astraunautes Inc."
				bind:value={name}
				name="name"
			/>
		</label>
		<button
			type="button"
			class="btn variant-filled-primary"
			disabled={!(name.length > 0)}
			on:click={() => {
				formElement.submit();
			}}
		>
			<span>Créer mon organisation</span>
		</button>
	</form>
</Panel>
