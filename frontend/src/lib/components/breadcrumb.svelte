<script lang="ts">
	const separator = '›';
	export let trail: {
		name: string;
		href?: undefined | string;
	}[];
</script>

<ol class="breadcrumb card bg-surface-50-900-token p-2 ps-4 drop-shadow">
	{#each trail as item, i}
		<li class="crumb">
			{#if item.href}
				<a class="anchor" href={item.href}>{item.name}</a>
			{:else}
				{item.name}
			{/if}
		</li>
		{#if i + 1 !== trail.length}
			<li class="crumb-separator" aria-hidden>{separator}</li>
		{/if}
	{/each}
</ol>
