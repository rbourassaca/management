<script lang="ts">
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { AppShell, Modal, initializeStores, storePopup } from '@skeletonlabs/skeleton';

	import Header from '$lib/components/header.svelte';
	import '../app.postcss';

	export let data;

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	// Dark mode
	import { autoModeWatcher } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<!-- Modal -->
<Modal />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<Header {data} />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
