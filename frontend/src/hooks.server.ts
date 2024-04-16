import type { Handle } from '@sveltejs/kit';
import { updateUserObject } from '$lib/functions/updateUserObject';


import PocketBase from "pocketbase"


export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pocketbase = new PocketBase("http://127.0.0.1:8090")
	event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

	updateUserObject(event.locals)

	const response = await resolve(event)

	response.headers.set('set-cookie', event.locals.pocketbase.authStore.exportToCookie({secure: false}))

	return response
}