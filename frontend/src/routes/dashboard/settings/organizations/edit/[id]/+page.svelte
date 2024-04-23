<script lang="ts">
	import Panel from '$lib/components/panel.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumb';

	export let data;

	$breadcrumbStore = [
		{ name: 'Accueil', href: '/' },
		{ name: 'Espace client', href: '/dashboard' },
		{ name: 'Organisations', href: '/dashboard/settings/organizations' },
		{ name: data.organization.name }
	];
</script>

<h1 class="h1">{data.organization.name}</h1>
