/* eslint-disable react/style-prop-object */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import AllExpenses from '@screens/AllExpenses';
import ManageExpense from '@screens/ManageExpense';
import RecentExpenses from '@screens/RecentExpenses';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

import ExpensesContextProvider from '@store/expenses-context';

import { GlobalStyles } from '@constants/styles';

//import IconButton from '@components/UI/IconButton';
import IconButton from '@components/UI/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const queryClient = new QueryClient();

const ExpensesOverview = () => {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				headerTintColor: 'white',
				tabBarStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon="add"
						size={24}
						color={tintColor}
						onPress={() => {
							navigation.navigate('ManageExpense');
						}}
					/>
				),
			})}
		>
			<BottomTabs.Screen
				name="RecentExpenses"
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="hourglass" size={size} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name="AllExpenses"
				component={AllExpenses}
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All Expenses',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" size={size} color={color} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	);
};

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<StatusBar style="light" />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: {
								backgroundColor: GlobalStyles.colors.primary500,
							},
							headerTintColor: 'white',
						}}
					>
						<Stack.Screen
							name="ExpensesOverview"
							component={ExpensesOverview}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="ManageExpense"
							component={ManageExpense}
							options={{
								presentation: 'modal',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</QueryClientProvider>
	);
};

export default App;
