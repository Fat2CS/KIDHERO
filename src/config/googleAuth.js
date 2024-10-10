import * as Google from "expo-auth-session/providers/google";
import { maybeCompleteAuthSession } from "expo-web-browser";

maybeCompleteAuthSession();

const CLIENT_ID =
  "264754374286-rf86aj1u87qnrgklqo807ver4livj6fj.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "264754374286-rf86aj1u87qnrgklqo807ver4livj6fj.apps.googleusercontent.com";
const IOS_CLIENT_ID =
  "264754374286-rf86aj1u87qnrgklqo807ver4livj6fj.apps.googleusercontent.com";

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID
  });

  return { request, response, promptAsync };
};

export const getGoogleCredential = async (response) => {
  if (response?.type === "success") {
    const { id_token } = response.params;
    return id_token;
  }
  return null;
};
