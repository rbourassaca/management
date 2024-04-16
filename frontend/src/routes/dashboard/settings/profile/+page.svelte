<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let firstName: string = form?.values?.firstName?.toString() || '';
	let lastName: string = form?.values?.lastName?.toString() || '';
	let email: string = form?.values?.email?.toString() || '';
	let oldPassword: string = '';
	let password: string = '';
	let passwordConfirm: string = '';
	let formElement: HTMLFormElement;
</script>

<h1 class="h1">Paramètres du profile</h1>
<div class="card p-4">
	<form
		action="?/updateProfile"
		method="post"
		use:enhance
		bind:this={formElement}
		class="flex flex-col gap-4"
	>
		<label class="label">
			<span>Prénom</span>
			{#if form !== null && form.error?.firstName}
				<span class="badge variant-filled-error">{form.error?.firstName.code}</span>
			{/if}
			<input
				class={form !== null && form.error?.firstName ? 'input input-error' : 'input'}
				title="Prénom"
				type="text"
				placeholder={data.user.firstName}
				name="firstName"
				bind:value={firstName}
			/>
		</label>
		<label class="label">
			<span>Nom de famille</span>
			{#if form !== null && form.error?.lastName}
				<span class="badge variant-filled-error">{form.error?.lastName.code}</span>
			{/if}
			<input
				class={form !== null && form.error?.lastName ? 'input input-error' : 'input'}
				title="Nom de famille"
				type="text"
				placeholder={data.user.lastName}
				name="lastName"
				bind:value={lastName}
			/>
		</label>
		<label class="label">
			<span>Courriel</span>
			{#if form !== null && form.error?.email}
				<span class="badge variant-filled-error">{form.error?.email.code}</span>
			{/if}
			<input
				class={form !== null && form.error?.email ? 'input input-error' : 'input'}
				title="Email"
				type="email"
				placeholder={data.user.email}
				autocomplete="email"
				name="email"
				bind:value={email}
			/>
		</label>
		<div class="alert variant-ghost-warning">
			<div>⚠</div>
			<div class="alert-message">
				<h3 class="h3">Attention</h3>
				<ul>
					<li>Si vous changez votre adresse courriel, vous allez devoir la vérifier.</li>
				</ul>
			</div>
		</div>
		<label class="label">
			<span>Mot de passe actuel</span>
			{#if form !== null && form.error?.oldPassword}
				<span class="badge variant-filled-error">{form.error?.oldPassword.code}</span>
			{/if}
			<input
				class={form !== null && form.error?.oldPassword ? 'input input-error' : 'input'}
				title="Mot de passe actuel"
				type="password"
				placeholder="●●●●●●●●●●"
				name="oldPassword"
				bind:value={oldPassword}
			/>
		</label>
		<label class="label">
			<span>Nouveau mot de passe</span>
			{#if form !== null && form.error?.password}
				<span class="badge variant-filled-error">{form.error?.password.code}</span>
			{/if}
			<input
				class={form !== null && form.error?.password ? 'input input-error' : 'input'}
				title="Nouveau mot de passe"
				type="password"
				placeholder="●●●●●●●●●●"
				name="password"
				bind:value={password}
			/>
		</label>
		<label class="label">
			<span>Confirmer le nouveau mot de passe</span>
			{#if form !== null && form.error?.passwordConfirm}
				<span class="badge variant-filled-error">{form.error?.passwordConfirm.code}</span>
			{/if}
			<input
				class={form !== null && form.error?.passwordConfirm ? 'input input-error' : 'input'}
				title="Confirmer le nouveau mot de passe"
				type="password"
				placeholder="●●●●●●●●●●"
				name="passwordConfirm"
				bind:value={passwordConfirm}
			/>
		</label>
		<div class="alert variant-ghost-warning">
			<div>⚠</div>
			<div class="alert-message">
				<h3 class="h3">Attention</h3>
				<ul>
					<li>Le mot de passe doit comprendre 8 caractères ou plus.</li>
					<li>
						Si vous changez votre mot de passe, vous devez remplir votre mot de passe actuel, votre
						nouveau mot de passe et le confirmer.
					</li>
				</ul>
			</div>
		</div>
		<button
			type="button"
			class="btn variant-filled-primary"
			disabled={!(
				firstName.length > 0 ||
				lastName.length > 0 ||
				email.length > 0 ||
				(oldPassword.length > 8 && password.length > 8 && passwordConfirm === password)
			)}
			on:click={() => {
				formElement.submit();
			}}
		>
			<span>Enregistrer</span>
		</button>
	</form>
</div>
