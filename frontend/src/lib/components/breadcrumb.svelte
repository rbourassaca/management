<script lang="ts">
	import { breadcrumbStore } from '$lib/stores/breadcrumb';
	const separator = '/';
</script>

<ol class="breadcrumb card bg-surface-50-900-token p-2 ps-4 drop-shadow">
	{#each $breadcrumbStore as item, i}
		<li class="crumb">
			{#if item.href}
				<a class="anchor" href={item.href}>{item.name}</a>
			{:else}
				{item.name}
			{/if}
		</li>
		{#if i + 1 !== $breadcrumbStore.length}
			<li class="crumb-separator" aria-hidden>{separator}</li>
		{/if}
	{/each}
</ol>
