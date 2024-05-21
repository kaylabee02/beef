import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import HomeScreen from '../screens/pages/HomeScreen';
import SettingsScreen from '../screens/pages/CollectionsScreen';
import Login from '../screens/pages/Login';
import AccountScreen from '../screens/pages/AccountScreen';
import CartScreen from '../screens/pages/CartScreen';
import CollectionScreen from '../screens/pages/CollectionScreen';
import FaqScreen from '../screens/pages/FaqScreen';
import ProductScreen from '../screens/pages/ProductScreen';
import OrderDetail from '../screens/pages/OrderDetail'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomHeaderBackButton = ({ destination }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate(destination);
  };

  return (
    <TouchableOpacity onPress={handleBackPress}>
      <FontAwesome5 name="chevron-left"  size={22} style={{ marginLeft:10 }} />
    </TouchableOpacity>
  );
};

function AuthStackNavigator({ userId }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} initialParams={{ userId }} />
      <Stack.Screen name="HomeScreen"  component={MainDrawerNavigator} initialParams={{ userId }} options={{ headerShown: false }} />
      <Stack.Screen name="Collection" component={CollectionScreen} initialParams={{ userId }} options={{ headerLeft: () => <CustomHeaderBackButton destination="HomeScreen" /> }} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} initialParams={{ userId }} options={{ headerLeft: () => <CustomHeaderBackButton destination="HomeScreen" /> }} />
      {/* Add more screens for sign up, forgot password, etc. */}
    </Stack.Navigator>
  );
}

function MainDrawerNavigator({ userId }) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} initialParams={{ userId }} />
      <Drawer.Screen name="Collection" component={SettingsScreen} initialParams={{ userId }} />
      <Drawer.Screen name="Product" component={ProductScreen} initialParams={{ userId }} />
      
      <Drawer.Screen name="Cart" component={CartScreen} initialParams={{ userId }} />
      <Drawer.Screen name="Account" component={AccountScreen} initialParams={{ userId }} />
      <Drawer.Screen name="FAQ" component={FaqScreen} initialParams={{ userId }} />
    
    </Drawer.Navigator>
  );
}

export default function DrawerNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming initial state is not logged in
  const [userId, setUserId] = useState(null); // State to hold the user ID

  useEffect(() => {
    // Check if user is logged in (e.g., by checking authentication state)
    // Update isLoggedIn state accordingly
    // If logged in, set the user ID
    if (isLoggedIn) {
      const userId = getUserId(); // Function to get the user ID, replace with actual implementation
      
      setUserId(userId);
    }
  }, [isLoggedIn]);
console.log(userId);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainDrawerNavigator userId={userId} /> : <AuthStackNavigator userId={userId} />}
    </NavigationContainer>
  );
}
