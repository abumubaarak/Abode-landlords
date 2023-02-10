import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

export async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(googleCredential)
    .then(() => createUser())
}

export const createUser = () => {
  const document = firestore().collection(USERS).doc(auth().currentUser.uid)

  document.set({
    displayName: auth().currentUser.displayName,
    email: auth().currentUser.email,
    uid: auth().currentUser.uid,
    userType: "landlord",
    profession: "",
    dob: "",
    language: "",
    isVerify: false,
    gender: "",
  })
  console.log(document)
}

export const PROPERTY = "Property"
export const USERS = "Users"
export const REQUEST = "Request"
export const WISHLISTS = "Wishlists"
