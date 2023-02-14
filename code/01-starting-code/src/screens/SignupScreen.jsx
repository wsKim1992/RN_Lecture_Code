import React from 'react';
import { Alert } from 'react-native';

import { createUser } from '@util/auth';

import AuthContent from '@components/Auth/AuthContent';
import LoadingOverlay from '@components/ui/LoadingOverlay';

const SignupScreen = () => {
	const [isAuthenticating, setIsAuthenticating] = React.useState(false);

	async function signupHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			await createUser(email, password);
		} catch (err) {
			Alert.alert(
				'Authentication failed',
				'Could not create user, please check your input and try again later.'
			);
		}
		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="Creating user..." />;
	}

	return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
