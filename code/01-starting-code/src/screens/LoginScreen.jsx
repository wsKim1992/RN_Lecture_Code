import React from 'react';

import { observer } from 'mobx-react-lite';

import AuthMobXContext from '@store/AuthContext';

import AuthContent from '@components/Auth/AuthContent';

const LoginScreen = observer(() => {
	const { idToken } = AuthMobXContext;

	return <AuthContent isLogin={idToken ? true : false} />;
});

export default LoginScreen;
