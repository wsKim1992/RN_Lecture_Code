import IconButton from "@components/UI/IconButton";
import { GlobalStyles } from "@constant/styles";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllExpenses from "@screens/AllExpenses";
import ManageExpense from "@screens/ManageExpense";
import RecentExpenses from "@screens/RecentExpenses";
import ExpensesContextProvider from "@store/expense-context";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
	return (
		<BottomTabs.Navigator
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: GlobalStyles.colors.primary500,
				},
				headerTintColor: "#fff",
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
							navigation.navigate("ManageExpense");
						}}
					/>
				),
			})}
		>
			<BottomTabs.Screen
				name="RecentExpenses"
				component={RecentExpenses}
				options={{
					title: "Recent Expenses",
					tabBarLabel: "Recent",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="hourglass" size={size} color={color} />
					),
				}}
			/>
			<BottomTabs.Screen
				name="AllExpenses"
				component={AllExpenses}
				options={{
					title: "All Expenses",
					tabBarLabel: "All Expenses",
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
		<>
			<ExpensesContextProvider>
				<StatusBar style="auto" />
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerMode: "screen",
							headerStyle: {
								backgroundColor: GlobalStyles.colors.primary500,
							},
							headerTintColor: "#fff",
						}}
						initialRouteName="ExpensesOverview"
					>
						<Stack.Screen
							name="ExpensesOverview"
							options={{ headerShown: false }}
							component={ExpensesOverview}
						/>
						<Stack.Screen
							name="ManageExpense"
							component={ManageExpense}
							options={{ presentation: "modal" }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
};

export default App;
