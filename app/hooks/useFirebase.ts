import { appleAuth } from '@invertase/react-native-apple-authentication'
import firestore from "@react-native-firebase/firestore"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useStores } from "../models"
import { USERS } from "../utils"

import auth from "@react-native-firebase/auth"
const useFirebase = () => {
    const { authenticationStoreModel: { setdisplayName } } = useStores()

    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn()

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)

        // Sign-in the user with the credential
        return auth()
            .signInWithCredential(googleCredential)
            .then(() => createUser("google"))
    }
    const onAppleButtonPress = async () => {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw new Error('Apple Sign-In failed - no identify token returned');
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        console.log(appleCredential, appleAuthRequestResponse)
        // Sign the user in with the credential
        const displayName = `${appleAuthRequestResponse.fullName.givenName} ${appleAuthRequestResponse.fullName.familyName}`
        console.log(displayName)
        return auth().signInWithCredential(appleCredential).then(() => createUser("apple", displayName));
    }
    const createUser = async (type: string, name: string = auth().currentUser.displayName) => {
        const document = firestore().collection(USERS).doc(auth().currentUser.uid)
        const authType = type === "google"
        console.log(!authType)
        !authType && setdisplayName(name)
        const user = await document.get();
        if (!user.exists) {
            document.set({
                displayName: type === "google" ? auth().currentUser.displayName : name,
                email: auth().currentUser.email,
                uid: auth().currentUser.uid,
                userType: "landlord",
                profession: "",
                dob: new Date(),
                language: "",
                isVerify: false,
                gender: "",
            })
        } else {
            const userInfo = user.data()
            setdisplayName(userInfo.displayName)
        }

    }

    return { onAppleButtonPress, onGoogleButtonPress, createUser }
}
export default useFirebase

