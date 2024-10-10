import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { AuthContext } from "../context/AuthContext";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithGoogle, error } = useContext(AuthContext);

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      // La navigation devrait être gérée automatiquement par le changement d'état dans AuthContext
    } catch (error) {
      Alert.alert("Erreur de connexion", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // La navigation devrait être gérée automatiquement par le changement d'état dans AuthContext
    } catch (error) {
      Alert.alert("Erreur de connexion Google", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleSignIn} />
      <GoogleSigninButton
        style={{ width: 192, height: 48, marginTop: 10 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />
      <Button
        title="S'inscrire"
        onPress={() => navigation.navigate("SignUp")}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  }
});

export default SignInScreen;
