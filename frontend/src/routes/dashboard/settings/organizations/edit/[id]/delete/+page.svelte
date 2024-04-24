<script lang="ts">
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	import { enhance } from '$app/forms';
	import { breadcrumbStore } from '$lib/stores/breadcrumb';
	import { getModalStore, Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Panel from '$lib/components/panel.svelte';

	export let data;

	$breadcrumbStore = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Espace client', href: '/dashboard' },
		{ name: 'Organisations', href: '/dashboard/settings/organizations' },
		{
			name: data.organization.name,
			href: `/dashboard/settings/organizations/edit/${data.organization.id}`
		},
		{ name: "Supprimer l'organisation" }
	];

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

	let removeFormElement: HTMLFormElement;
</script>

<h1 class="h1">Supprimer {data.organization.name}</h1>
<Panel>
	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="lead">
				<iconify-icon icon="clarity:trash-line" />
			</svelte:fragment>
			<svelte:fragment slot="summary"
				>Afficher le bouton pour supprimer l'organisation</svelte:fragment
			>
			<svelte:fragment slot="content">
				<form
					action="?/delete"
					method="post"
					bind:this={removeFormElement}
					use:enhance
					class="hidden"
				/>
				<button
					type="button"
					class="btn variant-filled-error w-full"
					on:click={() => {
						modalStore.trigger(modal);
					}}
				>
					Supprimer l'organisation
				</button>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</Panel>
