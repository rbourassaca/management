<script lang="ts">
	import type { TableSource } from '@skeletonlabs/skeleton';

	import { goto } from '$app/navigation';

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
			head: ['id', 'Nom'],
			body: tableMapperValues(orgOwner, ['id', 'name']),
			foot: [`Totale: <code class="code">${orgOwner.length}</code>`]
		};
	}
	if (orgMember && orgMember.length > 0) {
		orgMemberTable = {
			head: ['Nom'],
			body: tableMapperValues(orgMember, ['name']),
			foot: [`Totale: <code class="code">${orgMember.length}</code>`]
		};
	}

	$breadcrumbStore = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Espace client', href: '/dashboard' },
		{ name: 'Organisations' }
	];

	const handleSelected = (target: any) => {
		goto(`./organizations/edit/${target.detail[0]}`);
	};
</script>

<h1 class="h1">Organisations</h1>

{#if orgOwnerTable}
	<h2 class="h2">Que je gère</h2>
	<Panel>
		<Table source={orgOwnerTable} interactive={true} on:selected={handleSelected} />
		<a class="anchor" href="/dashboard/settings/organizations/create">Créer une organisation</a>
	</Panel>
{/if}
{#if orgMemberTable}
	<h2 class="h2">Que je suis un membre</h2>
	<Panel>
		<Table source={orgMemberTable} />
	</Panel>
{/if}
