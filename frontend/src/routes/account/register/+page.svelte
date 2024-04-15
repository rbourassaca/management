<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	export let form;

	let acceptedTerms: boolean = form?.error || false;
	let firstName: string = form?.values?.firstName.toString() || '';
	let lastName: string = form?.values?.lastName.toString() || '';
	let email: string = form?.values?.email.toString() || '';
	let password: string = '';
	let passwordConfirm: string = '';
	let formElement: HTMLFormElement;
</script>

<div class="container h-full mx-auto flex flex-col gap-4 justify-center items-center">
	<h2 class="h2">Créer un compte</h2>
	<div class="card p-4 w-screen max-w-lg">
		{#if form?.success}
			<h3 class="h3">Le compte à été créé!</h3>
			<p>Avant de vous connecter, vous devez vérifier votre adresse courriel.</p>
		{:else}
			<Stepper
				stepTerm="Étape"
				buttonBackLabel="← Précédent"
				buttonNextLabel="Suivant →"
				buttonCompleteLabel="Créer mon compte"
				start={form?.error ? 1 : 0}
				on:complete={() => {
					formElement.submit();
				}}
			>
				<Step locked={!acceptedTerms}>
					<svelte:fragment slot="header">Introduction</svelte:fragment>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, voluptatem facilis eos
						quo ad a ducimus autem nam, saepe eligendi molestias. Minima dolorum, similique quo cum
						ducimus repudiandae obcaecati saepe.
					</p>
					<p>
						In tellus integer feugiat scelerisque. Id volutpat lacus laoreet non curabitur gravida
						arcu. Venenatis cras sed felis eget. Volutpat lacus laoreet non curabitur gravida arcu
						ac tortor. Quisque egestas diam in arcu cursus euismod quis. Massa tincidunt dui ut
						ornare lectus sit. Dui sapien eget mi proin sed libero. Auctor augue mauris augue neque
						gravida in fermentum. Enim diam vulputate ut pharetra sit. Faucibus purus in massa
						tempor nec. Nec nam aliquam sem et tortor consequat id porta nibh. Vitae auctor eu augue
						ut. Ut lectus arcu bibendum at.
					</p>
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" bind:checked={acceptedTerms} />
						<p>J'accepte</p>
					</label>
				</Step>
				<Step
					locked={!(
						firstName.length > 0 &&
						lastName.length > 0 &&
						email.length > 0 &&
						password.length > 8 &&
						password === passwordConfirm
					)}
				>
					<svelte:fragment slot="header">Informations de base</svelte:fragment>
					<form
						method="POST"
						action="?/register"
						use:enhance
						bind:this={formElement}
						class="flex flex-col gap-4"
					>
						<label class="label">
							<span>Prénom</span>
							{#if form !== null && form.error.firstName}
								<span class="badge variant-filled-error">{form.error.firstName.code}</span>
							{/if}
							<input
								class={form !== null && form.error.firstName ? 'input input-error' : 'input'}
								title="Prénom"
								type="text"
								placeholder="John"
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
								placeholder="Walter"
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
								placeholder="john@example.com"
								autocomplete="email"
								name="email"
								bind:value={email}
							/>
						</label>
						<label class="label">
							<span>Mot de passe</span>
							{#if form !== null && form.error.password}
								<span class="badge variant-filled-error">{form.error.password.code}</span>
							{/if}
							<input
								class={form !== null && form.error.password ? 'input input-error' : 'input'}
								title="Mot de passe"
								type="password"
								placeholder="●●●●●●●●●●"
								name="password"
								bind:value={password}
							/>
						</label>
						<label class="label">
							<span>Confirmer le mot de passe</span>
							{#if form !== null && form.error.passwordConfirm}
								<span class="badge variant-filled-error">{form.error.passwordConfirm.code}</span>
							{/if}
							<input
								class={form !== null && form.error.passwordConfirm ? 'input input-error' : 'input'}
								title="Confirmer le mot de passe"
								type="password"
								placeholder="●●●●●●●●●●"
								name="passwordConfirm"
								bind:value={passwordConfirm}
							/>
						</label>
					</form>
				</Step>
			</Stepper>
		{/if}
	</div>
</div>
