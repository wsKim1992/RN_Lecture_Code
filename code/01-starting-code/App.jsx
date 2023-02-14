import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@screens/LoginScreen';
import SignupScreen from '@screens/SignupScreen';
import WelcomeScreen from '@screens/WelcomeScreen';
import { StatusBar } from 'expo-status-bar';

import { Colors } from '@constants/styles';

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
	return (
		<NavigationContainer>
			<AuthStack />
		</NavigationContainer>
	);
};

const App = () => {
	return (
		<>
			<StatusBar style="light" />

			<Navigation />
		</>
	);
};

export default App;