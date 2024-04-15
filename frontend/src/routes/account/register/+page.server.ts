import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/dashboard')
	}
}

export const actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pocketbase.collection('users').create({ ...body });
			await locals.pocketbase.collection('users').requestVerification(body.email.toString());
			return{success: true}
		} catch (err: any) {
			return {success: false, error: err.data.data, values: {...body}}
		}
	}
}