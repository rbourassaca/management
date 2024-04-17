<script lang="ts">
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
</script>

<aside class="h-full card bg-surface-50-900-token flex flex-col gap-1 w-48 drop-shadow">
	<TreeView open={true}>
		<TreeViewItem>
			Général
			<svelte:fragment slot="children">
				<a href="/dashboard">
					<TreeViewItem>Accueil</TreeViewItem>
				</a>
			</svelte:fragment>
		</TreeViewItem>
		<TreeViewItem>
			Paramètres
			<svelte:fragment slot="children">
				<a href="/dashboard/settings/organizations">
					<TreeViewItem>Organisations</TreeViewItem>
				</a>
				<a href="/dashboard/settings/profile">
					<TreeViewItem>Profile</TreeViewItem>
				</a>
			</svelte:fragment>
		</TreeViewItem>
	</TreeView>
</aside>
