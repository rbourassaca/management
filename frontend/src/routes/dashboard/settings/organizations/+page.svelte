<script lang="ts">
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import { breadcrumbStore } from '$lib/stores/breadcrumb';

	import Panel from '$lib/components/panel.svelte';

	export let data;

	let orgOwner: {}[] = [];
	let orgMember: {}[] = [];

	let orgOwnerTable: TableSource;
	let orgMemberTable: TableSource;

	data.organizations?.forEach((org) => {
		if (org.owners.includes(data.user.id)) {
			orgOwner.push(org);
		} else if (org.members.includes(data.user.id)) {
			orgMember.push(org);
		}
	});

	if (orgOwner && orgOwner.length > 0) {
		orgOwnerTable = {
			head: ['Logo', 'Nom'],
			body: tableMapperValues(orgOwner, ['logo', 'name']),
			foot: ['Totale', `<code class="code">${orgOwner.length}</code>`]
		};
	}
	if (orgMember && orgMember.length > 0) {
		orgMemberTable = {
			head: ['Logo', 'Nom'],
			body: tableMapperValues(orgMember, ['logo', 'name']),
			foot: ['Totale', `<code class="code">${orgMember.length}</code>`]
		};
	}

	$breadcrumbStore = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Espace client', href: '/dashboard' },
		{ name: 'Organisations' }
	];
</script>

<h1 class="h1">Organisations</h1>

{#if orgOwnerTable}
	<h2 class="h2">Que je gère</h2>
	<Panel>
		<Table source={orgOwnerTable} />
	</Panel>
{/if}
{#if orgMemberTable}
	<h2 class="h2">Que je suis un membre</h2>
	<Panel>
		<Table source={orgMemberTable} />
	</Panel>
{/if}
