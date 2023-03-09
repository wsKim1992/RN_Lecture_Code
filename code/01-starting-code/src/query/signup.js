import { QueryClient } from 'react-query';

import { useMutation } from '@tanstack/react-query';

import AuthMobXContext from '@store/AuthContext';

import { createUser } from '@util/auth';

import { USER_KEY } from '@constants/variables';

const queryClient = new QueryClient();

const SignUpMutation = () => {
	const { setAuthData } = AuthMobXContext;
	return useMutation({
		mutationKey: [USER_KEY],
		mutationFn: (data) => createUser(data),
		cacheTime: 0,
		useErrorBoundary: false,
		onMutate: () => {
			queryClient.cancelQueries([USER_KEY]);
			return null;
		},
		onSuccess: (data) => {
			setAuthData(data.data);
		},
	});
};

export default SignUpMutation;
