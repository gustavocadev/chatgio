import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	const session = locals.session;
	if (session) {
		redirect(303, '/');
	}

	return {};
};
