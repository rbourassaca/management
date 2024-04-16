export const updateUserObject = (locals: App.Locals) => {
	if (locals.pocketbase.authStore.isValid) {
		locals.user = structuredClone(locals.pocketbase.authStore.model)
	} else {
		locals.user = null
	}
}