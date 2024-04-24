<script lang="ts">
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	import { enhance } from '$app/forms';
	import { getModalStore, Accordion, AccordionItem } from '@skeletonlabs/skeleton';

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
<h2 class="h2">Membres</h2>
<Panel>
	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="lead">
				<iconify-icon icon="clarity:administrator-line" />
			</svelte:fragment>
			<svelte:fragment slot="summary">Administrateurs</svelte:fragment>
			<svelte:fragment slot="content">
				<div class="table-container">
					<table class="table table-compact">
						<thead>
							<tr>
								<th>Prénom</th>
								<th>Nom de Famille</th>
								<th>Courriel</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#if owners}
								{#each owners as owner}
									<tr>
										<td>{owner.firstName}</td>
										<td>{owner.lastName}</td>
										<td>{owner.email}</td>
										<td>
											<button
												class="chip variant-soft hover:variant-filled"
												disabled={!(owners.length > 1)}
											>
												<span><iconify-icon icon="clarity:trash-line" /></span>
												<span>Supprimer</span>
											</button>
										</td>
									</tr>
								{/each}
							{/if}
							<tr>
								<td>
									<input class="input" type="text" name="" id="" />
								</td>
								<td>
									<input class="input" type="text" name="" id="" />
								</td>
								<td>
									<input class="input" type="email" name="" id="" />
								</td>
								<td>
									<button class="chip variant-soft hover:variant-filled">
										<span><iconify-icon icon="clarity:plus-line" /></span>
										<span>Ajouter</span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">
				<iconify-icon icon="clarity:user-line" />
			</svelte:fragment>
			<svelte:fragment slot="summary">Membres</svelte:fragment>
			<svelte:fragment slot="content">
				<!-- TODO: Table -->
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</Panel>

<h2 class="h2">Informations</h2>
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
			<span>Modifier les informations</span>
		</button>
	</form>
</Panel>

<h2 class="h2">Supprimer l'organisation</h2>
<Panel>
	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="lead">
				<iconify-icon icon="clarity:trash-line" />
			</svelte:fragment>
			<svelte:fragment slot="summary">Supprimer l'organisation</svelte:fragment>
			<svelte:fragment slot="content">
				<form
					action="?/remove"
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
