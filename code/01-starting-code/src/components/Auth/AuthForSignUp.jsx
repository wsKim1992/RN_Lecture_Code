import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Colors } from '@constants/styles';

import FlatButton from '@components/ui/FlatButton';

import AuthFormFormSignUp from './AuthFormForSignUp';

const AuthForSignUp = () => {
	const navigation = useNavigation();
	const navigateToLogIn = () => {
		navigation.replace('Login');
	};
	return (
		<View style={styles.authContent}>
			<AuthFormFormSignUp />
			<View style={styles.buttons}>
				<FlatButton onPress={navigateToLogIn.bind(this)}>
					Log In
				</FlatButton>
			</View>
		</View>
	);
};

export default AuthForSignUp;

const styles = StyleSheet.create({
	authContent: {
		marginTop: 64,
		marginHorizontal: 32,
		padding: 16,
		borderRadius: 8,
		backgroundColor: Colors.primary800,
		elevation: 2,
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.35,
		shadowRadius: 4,
	},
	buttons: {
		marginTop: 8,
	},
});
