<script lang="ts">
	import { goto } from '$app/navigation';
	import { breadcrumbStore } from '$lib/stores/breadcrumb';

	import Panel from '$lib/components/panel.svelte';
	import Table from '$lib/components/table.svelte';

	export let data;

	$breadcrumbStore = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Espace client', href: '/dashboard' },
		{ name: 'Organisations' }
	];

	let orgOwner: any[] = [];
	let orgAdministrator: any[] = [];
	let orgMember: any[] = [];

	data.organizations?.forEach((org) => {
		if (org.owners.includes(data.user.id)) {
			orgOwner.push(org);
		} else if (org.administrators.includes(data.user.id)) {
			orgAdministrator.push(org);
		} else {
			orgMember.push(org);
		}
	});
</script>

<h1 class="h1">Organisations</h1>
<h2 class="h2">Qui m'appartiennent</h2>
<Panel>
	<Table
		data={orgOwner}
		fields={[{ key: 'name', label: 'Nom' }]}
		actions={[
			{
				icon: 'clarity:edit-line',
				name: 'Modifier',
				action: (e, item) => {
					goto(`./organizations/edit/${item.id}`);
				}
			}
		]}
	/>
	<a class="anchor" href="/dashboard/settings/organizations/create">Créer une organisation</a>
</Panel>
<h2 class="h2">Que je gère</h2>
<Panel>
	<Table
		data={orgAdministrator}
		fields={[{ key: 'name', label: 'Nom' }]}
		actions={[
			{
				icon: 'clarity:edit-line',
				name: 'Modifier',
				action: (e, item) => {
					goto(`./organizations/edit/${item.id}`);
				}
			}
		]}
	/>
</Panel>
<h2 class="h2">Que je suis un membre</h2>
<Panel>
	<Table data={orgMember} fields={[{ key: 'name', label: 'Nom' }]} />
</Panel>
