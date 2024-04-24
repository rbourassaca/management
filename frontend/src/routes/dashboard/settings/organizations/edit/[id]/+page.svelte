<script lang="ts">
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Panel from '$lib/components/panel.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumb';

	export let data;
	export let form;

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'confirm',
		title: 'Attention',
		body: `Êtes-vous sur de vouloir supprimer l'organisation <code class="code">${data.organization.name}</code> ? Tous les renseignements de l'organisation seront supprimé et il sera impossible d'y accéder après la suppression.`,
		buttonTextConfirm: "Supprimer l'organisation",
		buttonTextCancel: 'Annuler',
		response: async (r: boolean) => {
			if (r) {
				removeFormElement.submit();
			}
		}
	};

	$breadcrumbStore = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Espace client', href: '/dashboard' },
		{ name: 'Organisations', href: '/dashboard/settings/organizations' },
		{ name: data.organization.name }
	];

	let name: string = '';
	let owners = data.organization.expand?.owners;
	let members = data.organization.expand?.members;

	let editFormElement: HTMLFormElement;
	let removeFormElement: HTMLFormElement;
</script>

<h1 class="h1">{data.organization.name}</h1>

<Panel>
	<form action="?/edit" method="post" class="flex flex-col gap-4" bind:this={editFormElement}>
		<label class="label">
			<span>Nom</span>
			{#if form !== null && form.error.name}
				<span class="badge variant-filled-error">{form.error.name.code}</span>
			{/if}
			<input
				class="input"
				type="text"
				name="name"
				placeholder={data.organization.name}
				bind:value={name}
			/>
		</label>
		<button
			type="button"
			class="btn variant-filled-primary"
			disabled={!(name.length > 0)}
			on:click={(e) => {
				editFormElement.submit();
			}}
		>
			<span>Modifier mon organisation</span>
		</button>
	</form>
	<form action="?/remove" method="post" bind:this={removeFormElement} use:enhance class="hidden" />
	<button
		type="button"
		class="btn variant-filled-error"
		on:click={() => {
			modalStore.trigger(modal);
		}}
	>
		Supprimer l'organisation
	</button>
</Panel>
