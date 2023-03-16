import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddPlace from "@screens/AddPlace";
import AllPlaces from "@screens/AllPlaces";

import { Colors } from "@constants/colors";

import IconButton from "@components/UI/IconButton";

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: Colors.primary500 },
					headerTintColor: Colors.gray700,
					contentStyle: { backgroundColor: Colors.gray700 },
				}}
				initialRouteName="AllPlaces"
			>
				<Stack.Screen
					name="AllPlaces"
					component={AllPlaces}
					options={({ navigation }) => ({
						title: "Your Favorite Places",
						headerRight: ({ tintColor }) => (
							<IconButton
								icon="add"
								size={24}
								color={tintColor}
								onPress={() => navigation.navigate("AddPlace")}
							/>
						),
					})}
				/>
				<Stack.Screen
					name="AddPlace"
					component={AddPlace}
					options={{
						title: "Add a new Place",
						headerShown: true,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
