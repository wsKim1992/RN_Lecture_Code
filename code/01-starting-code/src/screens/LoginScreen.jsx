//import AuthContent from "../components/Auth/AuthContent";
import React from 'react';
import { Alert } from 'react-native';

import { AuthContext } from '@store/auth-context';

import { login } from '@util/auth';

import AuthContent from '@components/Auth/AuthContent';
import LoadingOverlay from '@components/ui/LoadingOverlay';

const LoginScreen = () => {
	const [isAuthenticating, setIsAuthenticating] = React.useState(false);

	const authCtx = React.useContext(AuthContext);

	async function loginHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			const token = await login(email, password);
			authCtx.authenticate(token);
			console.log('sucksex!!');
		} catch (err) {
			console.log('error');
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
