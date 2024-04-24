import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	let org;
	try {
		org = await locals.pocketbase
			.collection('organizations')
			.getOne(params.id, { expand: 'members, owners' });
	} catch (err: any) {
		throw error(404, err.response.message);
	}
	return {
		organization: org
	};
};

export const actions = {
	edit: async ({ locals, params, request }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			await locals.pocketbase.collection('organizations').update(params.id, { ...formData });
		} catch (err: any) {
			return { success: false, error: err.data.data, values: { ...formData } };
		}
	},
	remove: async ({ locals, params }) => {
		try {
			await locals.pocketbase.collection('organizations').delete(params.id);
		} catch (err: any) {
			return { success: false, error: err.data.data };
		}
		throw redirect(303, '../');
	}
};
