import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	let org;
	try {
		org = await locals.pocketbase.collection('organizations').getOne(params.id)
	} catch (err: any) {
		throw error(404, err.response.message)
	}
	return {
		organization: org
	}
}
