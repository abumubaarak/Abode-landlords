import auth from "@react-native-firebase/auth"

const useUser = () => {
  const uid = auth()?.currentUser?.uid
  const displayName = auth()?.currentUser?.displayName
  const email = auth()?.currentUser?.email
  return { uid, email, displayName }
}

export default useUser
