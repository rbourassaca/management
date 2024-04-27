import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	let org;
	try {
		org = await locals.pocketbase
			.collection('organizations')
			.getOne(params.id, { expand: 'owners' });
	} catch (err: any) {
		throw error(err.response.code, err.response.message);
	}
	return {
		organization: org
	};
};

export const actions = {
	delete: async ({ locals, params }) => {
		try {
			await locals.pocketbase.collection('organizations').delete(params.id);
		} catch (err: any) {
			return { success: false, error: err.data.data };
		}
		throw redirect(303, '../../');
	}
};
