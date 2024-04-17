export const load = async ({ locals }) => {
	try {
		const organizations = await locals.pocketbase.collection('organizations').getFullList({
			filter: `owners.id?="${locals.user.id}" || members.id?="${locals.user.id}"`,
			expand: 'members, owners'
		});
		return {
			organizations
		}
	} catch (err: any) {
		// TODO: Handle error
		console.log(err.data)
	}
}