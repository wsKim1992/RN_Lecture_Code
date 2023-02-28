import axios from 'axios';

import { errorType } from '@constants/errorType';
import { authFormName } from '@constants/variables';

const authAxiosInstance = axios.create({
	baseURL: `https://identitytoolkit.googleapis.com/v1/`,
	withCredentials: false,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 5000,
});

authAxiosInstance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		console.log('in axios interceptor request');
		console.log('적절하지 않은 요청');
		console.error(error);
		return Promise.reject(new Error('적절하지 않은 요청'));
	}
);

authAxiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		const { message } = error.response.data.error;
		console.log(message);
		switch (message) {
			case errorType.INVALID_PASSWORD: {
				return Promise.reject(authFormName.password);
			}
			case errorType.EMAIL_NOT_FOUND: {
				return Promise.reject(authFormName.email);
			}
			default: {
				return Promise.reject(errorType.INVALID_REQUEST);
			}
		}
	}
);

export default authAxiosInstance;
