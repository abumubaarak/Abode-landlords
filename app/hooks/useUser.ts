import auth from "@react-native-firebase/auth"
import { useStores } from "../models"


const useUser = () => {
  const { authenticationStoreModel: { displayName: name } } = useStores()

  const uid = auth()?.currentUser?.uid
  console.log(name)
  const displayName = auth()?.currentUser?.displayName ? auth()?.currentUser?.displayName : name
  const email = auth()?.currentUser?.email
  return { uid, email, displayName }
}

export default useUser
