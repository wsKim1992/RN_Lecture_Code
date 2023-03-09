import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';

import AuthMobXContext from '@store/AuthContext';

import { Colors } from '@constants/styles';

import LoginScreen from '@screens/LoginScreen';
import SignupScreen from '@screens/SignupScreen';
import WelcomeScreen from '@screens/WelcomeScreen';

import IconButton from '@components/ui/IconButton';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
};

const AuthenticatedStack = observer(() => {
	const { logout } = AuthMobXContext;
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen
				name="Welcome"
				component={WelcomeScreen}
				options={{
					headerRight: ({ tintColor }) => (
						<IconButton
							color={tintColor}
							icon="exit"
							size={24}
							onPress={logout}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
});

const Navigation = observer(() => {
	const { idToken } = AuthMobXContext;
	return (
		<NavigationContainer>
			{!idToken && <AuthStack />}
			{idToken && <AuthenticatedStack />}
		</NavigationContainer>
	);
});

const Root = () => {
	const [isTryingLogin, setIsTryingLogin] = useState(true);
	const { setIdToken } = AuthMobXContext;
	useEffect(() => {
		async function getIdTokenFromAsyncStorage() {
			const idToken = await AsyncStorage.getItem('idToken');
			if (idToken) {
				setIdToken(idToken);
			}
			setIsTryingLogin(false);
		}
		getIdTokenFromAsyncStorage();
	}, []);
	if (isTryingLogin) {
		return <AppLoading />;
	}
	return <Navigation />;
};

const queryClient = new QueryClient();

const App = observer(() => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<StatusBar style="light" />
				<Root />
			</QueryClientProvider>
		</>
	);
});

export default App;
