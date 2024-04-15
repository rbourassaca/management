import { redirect } from '@sveltejs/kit';

export const load = ({locals}) => {
	if (locals.user) {
		throw redirect(303, '/dashboard')
	}
}

export const actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pocketbase.collection('users').authWithPassword(body.email.toString(), body.password.toString())
		} catch (err: any) {
			return {success: false, error: err.data, values: {email: body.email.toString()}}
		}
		throw redirect(303, '/dashboard')
	}
}