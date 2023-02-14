//import AuthContent from "../components/Auth/AuthContent";
import React from 'react';
import { Alert } from 'react-native';

import { login } from '@util/auth';

import AuthContent from '@components/Auth/AuthContent';
import LoadingOverlay from '@components/ui/LoadingOverlay';

const LoginScreen = () => {
	const [isAuthenticating, setIsAuthenticating] = React.useState(false);

	async function loginHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			await login(email, password);
		} catch (err) {
			Alert.alert(
				'Authentication failed',
				'Could not log you in. Please check your credentials or try again later!'
			);
		}

		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="logging you in..." />;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;