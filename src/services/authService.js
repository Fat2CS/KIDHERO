import { auth, GoogleSignin } from "../config/firebase";

// ... autres fonctions existantes ...

export const signInWithGoogle = async () => {
  try {
    // Vérifier si les services Google Play sont disponibles
    await GoogleSignin.hasPlayServices();
    // Effectuer la connexion Google
    const { idToken } = await GoogleSignin.signIn();
    // Créer un credential Firebase avec le token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Connecter l'utilisateur à Firebase avec le credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error("Erreur lors de la connexion Google:", error);
    throw error;
  }
};

// Mise à jour de la fonction de déconnexion
export const signOut = async () => {
  try {
    await auth().signOut();
    // Déconnexion de Google si l'utilisateur était connecté via Google
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    throw error;
  }
};
