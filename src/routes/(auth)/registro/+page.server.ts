import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { lucia } from '$lib/server/auth';
import { prisma } from '$lib/server/db';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirm = formData.get('passwordConfirm') as string;
		const nombres = formData.get('nombres') as string;
		const apellidoPaterno = formData.get('apellidoPaterno') as string;
		const apellidoMaterno = formData.get('apellidoMaterno') as string;
		console.log({
			email,
			password,
			passwordConfirm,
			nombres,
			apellidoPaterno,
			apellidoMaterno
		});

		if (password !== passwordConfirm) {
			return fail(400, {
				message: 'Las contraseñas no coinciden'
			});
		}

		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const validateEmail = (email: string) => emailRegex.test(email);

		if (!validateEmail(email)) {
			console.log('Invalid email');
			return fail(400, {
				message: 'Invalid email'
			});
		}

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		// TODO: check if username is already used
		await prisma.user.create({
			data: {
				id: userId,
				email: email,
				passwordHash: passwordHash,
				apellidoMaterno: apellidoMaterno,
				apellidoPaterno: apellidoPaterno,
				nombres: nombres
			}
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
