import React from 'react';
import { Alert } from 'react-native';

import { AuthContext } from '@store/auth-context';

import { createUser } from '@util/auth';

import AuthForSignUp from '@components/Auth/AuthForSignUp';
import LoadingOverlay from '@components/ui/LoadingOverlay';

const SignupScreen = () => {
	/* const [isAuthenticating, setIsAuthenticating] = React.useState(false); */

	/* const authCtx = React.useContext(AuthContext);

	async function signupHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			const token = await createUser(email, password);
			authCtx.authenticate(token);
		} catch (err) {
			Alert.alert(
				'Authentication failed',
				'Could not create user, please check your input and try again later.'
			);
		}
		setIsAuthenticating(false);
	} */

	/* if (isAuthenticating) {
		return <LoadingOverlay message="Creating user..." />;
	} */

	return <AuthForSignUp />;
};

export default SignupScreen;
