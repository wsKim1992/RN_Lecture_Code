import axios from 'axios';

import { API_KEY } from '@constants/variables';

const refreshTokenInstance = axios.create({
	baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[${API_KEY}]`,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 5000,
	withCredentials: true,
	responseEncoding: 'utf-8',
});

export default refreshTokenInstance;
