<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let firstName: string = data.user.firstName.toString() || '';
	let lastName: string = data.user.lastName.toString() || '';
	let email: string = data.user.email.toString() || '';
	let currentPassword: string = '';
	let newPassword: string = '';
	let newPasswordConfirm: string = '';
	let formElement: HTMLFormElement;
</script>

<h1 class="h1">Paramètres du profile</h1>
<div class="card p-4">
	<form action="#" method="post" use:enhance bind:this={formElement} class="flex flex-col gap-4">
		<label class="label">
			<span>Prénom</span>
			{#if form !== null && form.error.firstName}
				<span class="badge variant-filled-error">{form.error.firstName.code}</span>
			{/if}
			<input
				class={form !== null && form.error.firstName ? 'input input-error' : 'input'}
				title="Prénom"
				type="text"
				placeholder={data.user.firstName}
				name="firstName"
				bind:value={firstName}
			/>
		</label>
		<label class="label">
			<span>Nom de famille</span>
			{#if form !== null && form.error.lastName}
				<span class="badge variant-filled-error">{form.error.lastName.code}</span>
			{/if}
			<input
				class={form !== null && form.error.lastName ? 'input input-error' : 'input'}
				title="Nom de famille"
				type="text"
				placeholder={data.user.lastName}
				name="lastName"
				bind:value={lastName}
			/>
		</label>
		<label class="label">
			<span>Courriel</span>
			{#if form !== null && form.error.email}
				<span class="badge variant-filled-error">{form.error.email.code}</span>
			{/if}
			<input
				class={form !== null && form.error.email ? 'input input-error' : 'input'}
				title="Email"
				type="email"
				placeholder={data.user.email}
				autocomplete="email"
				name="email"
				bind:value={email}
			/>
		</label>
		<label class="label">
			<span>Mot de passe actuel</span>
			{#if form !== null && form.error.password}
				<span class="badge variant-filled-error">{form.error.password.code}</span>
			{/if}
			<input
				class={form !== null && form.error.password ? 'input input-error' : 'input'}
				title="Mot de passe actuel"
				type="password"
				placeholder="●●●●●●●●●●"
				name="currentPassword"
				bind:value={currentPassword}
			/>
		</label>
		<label class="label">
			<span>Nouveau mot de passe</span>
			{#if form !== null && form.error.password}
				<span class="badge variant-filled-error">{form.error.password.code}</span>
			{/if}
			<input
				class={form !== null && form.error.password ? 'input input-error' : 'input'}
				title="Nouveau mot de passe"
				type="password"
				placeholder="●●●●●●●●●●"
				name="newPassword"
				bind:value={newPassword}
			/>
		</label>
		<label class="label">
			<span>Confirmer le nouveau mot de passe</span>
			{#if form !== null && form.error.passwordConfirm}
				<span class="badge variant-filled-error">{form.error.passwordConfirm.code}</span>
			{/if}
			<input
				class={form !== null && form.error.passwordConfirm ? 'input input-error' : 'input'}
				title="Confirmer le nouveau mot de passe"
				type="password"
				placeholder="●●●●●●●●●●"
				name="newPasswordConfirm"
				bind:value={newPasswordConfirm}
			/>
		</label>
		<button
			type="button"
			class="btn variant-filled-primary"
			disabled={!(
				firstName.length > 0 ||
				lastName.length > 0 ||
				email.length > 0 ||
				(currentPassword.length > 8 && newPassword.length > 8 && newPasswordConfirm === newPassword)
			)}
			on:click={() => {
				formElement.submit();
			}}
		>
			<span>Enregistrer</span>
		</button>
	</form>
</div>
