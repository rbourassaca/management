import { redirect } from '@sveltejs/kit';
import { updateUserObject } from '$lib/functions/updateUserObject.js';

export const actions = {
	updateProfile: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData())
		for (let i in formData) {
			if (formData[i] == '') {
				delete formData[i]
			}
		}

		try {
			await locals.pocketbase.collection('users').update(locals.user.id, formData)
	
		} catch (err: any) {
			return { success: false, error: err.data.data, values: {...formData}}
		}

		if ('password' in formData) {
			locals.pocketbase.authStore.clear();
			redirect(303, '/account/login')
		}
		if ('email' in formData) {
			locals.pocketbase.collection('users').requestVerification(formData.email.toString())
		}

		updateUserObject(locals)
		
		return {success: true}
	}
}