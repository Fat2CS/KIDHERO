import Constants from 'expo-constants';

// Utilisation de expoConfig au lieu de manifest
const appScheme = Constants.expoConfig?.scheme;
console.log('Mon app scheme est:', appScheme);

// Vérification supplémentaire au cas où le scheme n'est pas défini
if (!appScheme) {
  console.warn('App scheme non défini dans app.json ou app.config.js');
}

const appConfig = {
  scheme: appScheme,
  // Vous pouvez ajouter d'autres configurations ici
  // Par exemple :
  name: Constants.expoConfig?.name,
  version: Constants.expoConfig?.version,
};

export default appConfig;