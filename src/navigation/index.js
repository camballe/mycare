import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PharmacyDetailsScreen from "../screens/PharmacyDetailsScreen";
import OrderScreen from "../screens/OrdersScreen";
import { Foundation, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import Basket from "../screens/Basket";
import OrderDetails from "../screens/OrderDetails";
import OrdersScreen from "../screens/OrdersScreen";
import Profile from "../screens/ProfileScreen";
import { useAuthContext } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { dbUser } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbUser ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Profile" component={Profile} />
      )}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Pharmacies" component={HomeScreen} />
      <HomeStack.Screen
        name="Pharmacy"
        component={PharmacyDetailsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Product" component={ProductDetailsScreen} />
      <HomeStack.Screen name="Basket" component={Basket} />
    </HomeStack.Navigator>
  );
};
const OrderStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="Orders" component={OrdersScreen} />
      <OrderStack.Screen name="Order" component={OrderDetails} />
    </OrderStack.Navigator>
  );
};

export default RootNavigator;
