import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

import AuthContextProvider, { AuthContext } from '@store/auth-context';

import { Colors } from '@constants/styles';

import LoginScreen from '@screens/LoginScreen';
import SignupScreen from '@screens/SignupScreen';
import WelcomeScreen from '@screens/WelcomeScreen';

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

const AuthenticatedStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen name="Welcome" component={WelcomeScreen} />
		</Stack.Navigator>
	);
};

const Navigation = () => {
	const authCtx = React.useContext(AuthContext);

	return (
		<NavigationContainer>
			{!authCtx.isAuthenticated && <AuthStack />}
			{authCtx.isAuthenticated && <AuthenticatedStack />}
		</NavigationContainer>
	);
};

const queryClient = new QueryClient();

const App = () => {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<StatusBar style="light" />
				<AuthContextProvider>
					<Navigation />
				</AuthContextProvider>
			</QueryClientProvider>
		</>
	);
};

export default App;
