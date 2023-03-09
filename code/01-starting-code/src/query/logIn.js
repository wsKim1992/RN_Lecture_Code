import { useMutation } from '@tanstack/react-query';

import AuthMobXContext from '@store/AuthContext';

import { login } from '@util/auth';

import { USER_KEY } from '@constants/variables';

const LogIn = () => {
	const { setAuthData } = AuthMobXContext;
	return useMutation({
		mutationKey: [USER_KEY],
		mutationFn: (data) => login(data),
		onSuccess: (data) => {
			console.log('success log in');
			setAuthData(data.data);
		},
		useErrorBoundary: false,
	});
};

export default LogIn;
