import React, { createContext, useState, useEffect, useCallback } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "264754374286-rf86aj1u87qnrgklqo807ver4livj6fj.apps.googleusercontent.com" // Remplacez par votre Web Client ID
    });
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email, password) => {
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      await auth().signOut();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // const signInWithGoogle = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     await GoogleSignin.hasPlayServices();
  //     const { idToken } = await GoogleSignin.signIn();
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     return auth().signInWithCredential(googleCredential);
  //   } catch (error) {
  //     console.error("Error signing in with Google:", error);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Checking Google Play Services...");
      await GoogleSignin.hasPlayServices();
      console.log("Google Play Services OK, signing in...");
      const { idToken } = await GoogleSignin.signIn();
      console.log("Google Sign-In successful, creating credential...");
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log("Credential created, signing in with Firebase...");
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      console.log("Firebase sign-in successful");
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      if (error.code) {
        console.error("Error code:", error.code);
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const forceLogout = useCallback(async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth().signOut();
      }
      if (await GoogleSignin.isSignedIn()) {
        await GoogleSignin.signOut();
      }
      setUser(null);
    } catch (error) {
      console.log("Erreur lors de la déconnexion forcée:", error);
      // Ne pas traiter cela comme une erreur critique
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  // Ajoutez forceLogout à la valeur du contexte

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    clearError,
    forceLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
