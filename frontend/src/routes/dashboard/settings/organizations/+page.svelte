<script lang="ts">
	import { breadcrumbStore } from '$lib/stores/breadcrumb';

	import Panel from '$lib/components/panel.svelte';

	export let data;

	$breadcrumbStore = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Espace client', href: '/dashboard' },
		{ name: 'Organisations' }
	];
</script>

<h1 class="h1">Organisations</h1>
<h2 class="h2">Que je gère</h2>
<Panel>
	<div class="table-container">
		<table class="table table-compact table-interactive">
			<thead>
				<tr>
					<th>Nom</th>
				</tr>
			</thead>
			<tbody>
				{#if data.organizations}
					{#each data.organizations as org}
						{#if org.owners.includes(data.user.id)}
							<tr>
								<a href={`./organizations/edit/${org.id}`} class="block">
									<td>{org.name}</td>
								</a>
							</tr>
						{/if}
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
	<a class="anchor" href="/dashboard/settings/organizations/create">Créer une organisation</a>
</Panel>
<h2 class="h2">Que je suis un membre</h2>
<Panel>
	<div class="table-container">
		<table class="table table-compact">
			<thead>
				<tr>
					<th>Nom</th>
				</tr>
			</thead>
			<tbody>
				{#if data.organizations}
					{#each data.organizations as org}
						{#if org.members.includes(data.user.id)}
							<tr>
								<td>{org.name}</td>
							</tr>
						{/if}
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</Panel>
