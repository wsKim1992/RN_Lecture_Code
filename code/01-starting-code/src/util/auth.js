//https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
import axios from 'axios';

import { API_KEY } from '@constants/variables';

async function authenticate(mode, email, password) {
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
	const response = await axios.post(url, {
		email: email,
		password: password,
		returnSecureToken: true,
	});
}

export async function createUser(email, password) {
	try {
		await authenticate('signUp', email, password);
	} catch (err) {
		console.log(err);
	}
}

export async function login(email, password) {
	await authenticate('signInWithPassword', email, password);
}
