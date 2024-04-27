import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	let org;
	try {
		org = await locals.pocketbase
			.collection('organizations')
			.getOne(params.id, { expand: 'members, owners, administrators' });
	} catch (err: any) {
		throw error(err.response.code, err.response.message);
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
	addMembers: async ({ locals, params, request }) => {
		const formData = Object.fromEntries(await request.formData());
		try {
			if (formData.owners) {
				// TODO: Add owners
			} else if (formData.administrators) {
				// TODO: Add admin
			} else {
				// TODO: Add members
			}
		} catch (err: any) {
			return { success: false, error: err.data.data, values: { ...formData } };
		}
	}
};
