//https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
import axios from 'axios';

import { API_KEY } from '@constants/variables';

export async function createUser(email, password) {
	try {
		const response = await axios.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
			{
				email,
				password,
				returnSecureToken: true,
			}
		);
		console.log(response);
	} catch (err) {
		console.log(err);
	}
}
