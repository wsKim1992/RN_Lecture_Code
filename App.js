import { NavigationContainer } from "@react-navigation/native";
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

//const BottomTab = createBottomTabNavigator();

export default function App() {
  const defaultDrawOption = {
    headerStyle: { backgroundColor: "#3c0a6b", height: 100 },
    headerTintColor: "#fff",
    drawerActiveBackgroundColor: "#3c0a6b",
    drawerActiveTintColor: "#f0e1ff",
    drawerStyle: { backgroundColor: "#fff", size: 12 },
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="User"
        screenOptions={{
          ...defaultDrawOption,
        }}
      >
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            drawerLabel: "Welcome Screen",
            drawerIcon: ({ color, size }) => {
              console.log(`color : ${color}`);
              console.log(`size : ${size}`);
              return <Ionicons size={size} name="home" color={color} />;
            },
          }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            drawerLabel: "User",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
