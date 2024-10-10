import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";

import { AuthContext } from "../context/AuthContext";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <MainTab.Navigator>
    <MainTab.Screen name="Home" component={HomeScreen} />
    <MainTab.Screen name="Profile" component={ProfileScreen} />
  </MainTab.Navigator>
);

const RootNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <RootStack.Navigator>
      {user ? (
        <RootStack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
      <RootStack.Screen name="Chat" component={ChatScreen} />
    </RootStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
