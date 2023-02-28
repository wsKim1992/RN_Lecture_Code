//https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
import authAxiosInstance from '@util/authAxiosInstance';

import { API_KEY } from '@constants/variables';

async function authenticate(mode, email, password) {
	try {
		const url = `accounts:${mode}?key=${API_KEY}`;

		const response = await authAxiosInstance.post(url, {
			email: email,
			password: password,
			returnSecureToken: true,
		});
		return response;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export function createUser(email, password) {
	return authenticate('signUp', email, password);
}

export function login({ email, password }) {
	return authenticate('signInWithPassword', email, password);
}
