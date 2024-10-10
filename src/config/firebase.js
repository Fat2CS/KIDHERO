import { initializeApp } from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const firebaseConfig = {
  apiKey: "AIzaSyDN6Kx6vUj-OXnuu_zJDLlbLNwKZvVKwH4",
  authDomain: "herokid-3e55b.firebaseapp.com",
  projectId: "herokid-3e55b",
  storageBucket: "herokid-3e55b.appspot.com",
  messagingSenderId: "1:264754374286:web:2ccd893e8d7b14eb430bdf",
  appId: "1:264754374286:web:2ccd893e8d7b14eb430bdf"
};

const app = initializeApp(firebaseConfig);

GoogleSignin.configure({
  webClientId:
    "264754374286-rf86aj1u87qnrgklqo807ver4livj6fj.apps.googleusercontent.com",
  offlineAccess: true,
  scopes: ["profile", "email"]
});
export { auth, GoogleSignin };
export default app;
