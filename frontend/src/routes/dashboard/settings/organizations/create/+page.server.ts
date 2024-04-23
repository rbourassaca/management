import { redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pocketbase
				.collection('organizations')
				.create({ name: body.name, owners: locals.user.id });
		} catch (err: any) {
			return { success: false, error: err.data.data, values: { ...body } };
		}
		throw redirect(303, './');
	}
};
