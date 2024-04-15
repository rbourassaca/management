<script lang="ts">
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
</script>

<div class="h-full flex">
	<Sidebar />
	<div class="flex flex-col gap-4 w-full">
		<Breadcrumb trail={[{ name: 'Espace client' }]} />
		<div class="pl-4 pr-4 flex flex-col gap-4">
			<slot />
		</div>
	</div>
</div>
