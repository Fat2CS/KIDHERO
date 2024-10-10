import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    {/* Ajoutez d'autres écrans ici */}
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, loading, forceLogout } = useContext(AuthContext);

  useEffect(() => {
    console.log("Auth state changed:", { user, loading });

    // Déconnexion forcée en mode développement
    if (__DEV__) {
      const performLogout = async () => {
        try {
          await forceLogout();
        } catch (error) {
          console.log("Erreur lors de la déconnexion forcée:", error);
          // Ne pas traiter cela comme une erreur critique
        }
      };
      performLogout();
    }
  }, [forceLogout]);

  if (loading) {
    // Vous pouvez ajouter un écran de chargement ici
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </AuthProvider>
  );
}
