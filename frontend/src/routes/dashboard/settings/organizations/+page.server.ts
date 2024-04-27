import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	try {
		const organizations = await locals.pocketbase.collection('organizations').getFullList({
			filter: `owners.id?="${locals.user.id}" || administrators.id?="${locals.user.id}" || members.id?="${locals.user.id}"`
		});
		return {
			organizations
		};
	} catch (err: any) {
		throw error(err.response.code, err.response.message);
	}
};
