import type PocketBase from "pocketbase"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global{
	namespace App {
		interface Locals {
			pocketbase: PocketBase;
			user: PocketBase.authStore.model
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}

	}
}
