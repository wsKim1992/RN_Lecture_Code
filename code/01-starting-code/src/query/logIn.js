import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { AuthContext } from '@store/auth-context';

import { login } from '@util/auth';

import { USER_KEY } from '@constants/variables';

const LogIn = () => {
	const { authenticate } = React.useContext(AuthContext);
	return useMutation({
		mutationKey: [USER_KEY],
		mutationFn: (data) => login(data),
		onSuccess: (data, variables) => {
			const { refreshToken, idToken } = data.data;
			authenticate(idToken);
		},
		useErrorBoundary: false,
	});
};

export default LogIn;
