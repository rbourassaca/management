<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { AppBar, Avatar, popup } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let data: any;

	// Profile popup
	const profilePopup: PopupSettings = {
		event: 'click',
		target: 'profilePopup',
		placement: 'bottom'
	};
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<strong class="text-xl uppercase"><a href="/">Titre</a></strong>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		{#if data.user}
			<a class="btn btn-sm variant-ghost-surface" href="/dashboard">Espace client</a>
			<span use:popup={profilePopup}>
				<Avatar
					initials={`${data.user.firstName.slice(0, 1)}${data.user.lastName.slice(0, 1)}`}
					background="bg-primary-500"
					width="w-8"
					fontSize={225}
					cursor="cursor-pointer"
				/>
				<div class="card p-4 w-72 shadow-xl mt-4" data-popup="profilePopup">
					<div>
						<form method="post" action="/account/logout?/logout" use:enhance>
							<input
								type="submit"
								value="Se déconnecter"
								class="btn btn-sm variant-ghost-surface cursor-pointer w-full"
							/>
						</form>
					</div>
					<div class="arrow bg-surface-100-800-token" />
				</div>
			</span>
		{:else}
			<a class="btn btn-sm variant-ghost-surface" href="/account/register">Créer un compte</a>
			<a class="btn btn-sm variant-ghost-surface" href="/account/login">Se connecter</a>
		{/if}
	</svelte:fragment>
</AppBar>
