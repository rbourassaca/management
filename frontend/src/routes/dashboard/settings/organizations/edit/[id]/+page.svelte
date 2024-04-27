<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Panel from '$lib/components/panel.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumb';
	import Table from '$lib/components/table.svelte';

	export let data;
	export let form;

	$breadcrumbStore = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Espace client', href: '/dashboard' },
		{ name: 'Organisations', href: '/dashboard/settings/organizations' },
		{ name: data.organization.name }
	];

	let ownersEmails = '';
	let administratorsEmails = '';
	let membersEmails = '';

	let name: string = '';

	let editFormElement: HTMLFormElement;
</script>

<h1 class="h1">{data.organization.name}</h1>
<h2 class="h2">Membres</h2>
<Panel>
	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="lead">
				<iconify-icon icon="mdi:administrator" />
			</svelte:fragment>
			<svelte:fragment slot="summary">Propriétaires</svelte:fragment>
			<svelte:fragment slot="content">
				<Table
					data={data.organization.expand?.owners}
					fields={[
						{ key: 'firstName', label: 'Prénom' },
						{ key: 'lastName', label: 'Nom de famille' },
						{ key: 'email', label: 'Courriel' }
					]}
					actions={data.organization.owners.includes(data.user.id)
						? [
								{
									icon: 'clarity:trash-line',
									name: 'Supprimer',
									action: () => {
										console.log('click');
										//TODO: Handle action
									}
								}
							]
						: undefined}
				/>
				{#if data.organization.owners.includes(data.user.id)}
					<Accordion>
						<AccordionItem>
							<svelte:fragment slot="lead">
								<iconify-icon icon="mdi:administrator" />
							</svelte:fragment>
							<svelte:fragment slot="summary">Ajouter des propriétaires</svelte:fragment>
							<svelte:fragment slot="content">
								<form action="?/addMembers" method="post" class="flex flex-col gap-2">
									<label for="emails">
										Entrer les courriels des propriétaires à ajouter, séparé par une virgule.
									</label>
									<input type="hidden" name="owners" value={true} />
									<div class="flex gap-1">
										<input
											class="input"
											type="email"
											multiple={true}
											name="emails"
											placeholder="john@example.com, susy@example.com"
											bind:value={ownersEmails}
										/>
										<input
											class="btn variant-filled-primary cursor-pointer"
											type="submit"
											value="Ajouter des administrateurs"
											disabled={!(ownersEmails.length > 0)}
										/>
									</div>
								</form>
							</svelte:fragment>
						</AccordionItem>
					</Accordion>
				{/if}
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">
				<iconify-icon icon="clarity:administrator-line" />
			</svelte:fragment>
			<svelte:fragment slot="summary">Administrateurs</svelte:fragment>
			<svelte:fragment slot="content">
				<Table
					data={data.organization.expand?.administrators}
					fields={[
						{ key: 'firstName', label: 'Prénom' },
						{ key: 'lastName', label: 'Nom de famille' },
						{ key: 'email', label: 'Courriel' }
					]}
					actions={[
						{
							icon: 'clarity:trash-line',
							name: 'Supprimer',
							action: () => {
								console.log('click');
								//TODO: Handle action
							}
						}
					]}
				/>
				<Accordion>
					<AccordionItem>
						<svelte:fragment slot="lead">
							<iconify-icon icon="clarity:administrator-line" />
						</svelte:fragment>
						<svelte:fragment slot="summary">Ajouter des administrateurs</svelte:fragment>
						<svelte:fragment slot="content">
							<form action="?/addMembers" method="post" class="flex flex-col gap-2">
								<label for="emails">
									Entrer les courriels des administrateurs à ajouter, séparé par une virgule.
								</label>
								<input type="hidden" name="administrators" value={true} />
								<div class="flex gap-1">
									<input
										class="input"
										type="email"
										multiple={true}
										name="emails"
										placeholder="john@example.com, susy@example.com"
										bind:value={administratorsEmails}
									/>
									<input
										class="btn variant-filled-primary cursor-pointer"
										type="submit"
										value="Ajouter des administrateurs"
										disabled={!(administratorsEmails.length > 0)}
									/>
								</div>
							</form>
						</svelte:fragment>
					</AccordionItem>
				</Accordion>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead">
				<iconify-icon icon="clarity:user-line" />
			</svelte:fragment>
			<svelte:fragment slot="summary">Membres</svelte:fragment>
			<svelte:fragment slot="content">
				<Table
					data={data.organization.expand?.members}
					fields={[
						{ key: 'firstName', label: 'Prénom' },
						{ key: 'lastName', label: 'Nom de famille' },
						{ key: 'email', label: 'Courriel' }
					]}
					actions={[
						{
							icon: 'clarity:trash-line',
							name: 'Supprimer',
							action: () => {
								console.log('click');
								//TODO: Handle action
							}
						}
					]}
				/>
				<Accordion>
					<AccordionItem>
						<svelte:fragment slot="lead">
							<iconify-icon icon="clarity:user-line" />
						</svelte:fragment>
						<svelte:fragment slot="summary">Ajouter des membres</svelte:fragment>
						<svelte:fragment slot="content">
							<form action="?/addMembers" method="post" class="flex flex-col gap-2">
								<label for="emails">
									Entrer les courriels des membres à ajouter, séparé par une virgule.
								</label>
								<div class="flex gap-1">
									<input
										class="input"
										type="email"
										multiple={true}
										name="emails"
										placeholder="john@example.com, susy@example.com"
										bind:value={membersEmails}
									/>
									<input
										class="btn variant-filled-primary cursor-pointer"
										type="submit"
										value="Ajouter des membres"
										disabled={!(membersEmails.length > 0)}
									/>
								</div>
							</form>
						</svelte:fragment>
					</AccordionItem>
				</Accordion>
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

{#if data.organization.owners.includes(data.user.id)}
	<h2 class="h2">Supprimer l'organisation</h2>
	<Panel>
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead">
					<iconify-icon icon="clarity:trash-line" />
				</svelte:fragment>
				<svelte:fragment slot="summary">Supprimer l'organisation</svelte:fragment>
				<svelte:fragment slot="content">
					<a href={`./${data.organization.id}/delete`} class="anchor">Supprimer l'organisation</a>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</Panel>
{/if}
