import { lucia } from "$lib/server/auth.js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const load = ({ locals }) => {
	if (!locals.session) {
		redirect(303, "/login");
	}

	return {
		user: locals.user,
	};
};

export const actions: Actions = {
	cerrarSesion: async ({ locals, cookies }) => {
		if (!locals.session) {
			return;
		}

		if (!locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
		});
		redirect(302, "/login");
	},
};
