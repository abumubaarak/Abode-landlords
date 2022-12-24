import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential).then((res) => createUser());
}


export const createUser = () => {
    firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .set({
            displayName: auth().currentUser.displayName,
            email: auth().currentUser.email,
            uid: auth().currentUser.uid,
            userType: "landlord"
        })
}