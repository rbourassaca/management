import { redirect } from '@sveltejs/kit';

export const actions = {
	logout: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
			locals.pocketbase.authStore.clear();
			redirect(303, '/account/login')
	}
}