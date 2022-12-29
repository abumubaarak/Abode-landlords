import storage from "@react-native-firebase/storage"
import { useState } from "react"
import { useStores } from "../models"

const useUpload = () => {
  const [imageUploaded, setImageUploaded] = useState<boolean>(false)

  const {
    propertyStoreModel: { localImages, addRemoteImages, remoteImages },
  } = useStores()

  const upload = (filePath: string) => {
    const reference = storage().ref(`${Math.floor(Math.random() * Date.now()).toString(16)}.png`)
    const task = reference.putFile(filePath)
    task.on("state_changed", (taskSnapshot) => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`)
    })

    task
      .then(async () => {
        const imageRemoteUrl: string = await reference.getDownloadURL()
        if (imageRemoteUrl) {
          addRemoteImages(imageRemoteUrl)

          if (localImages.length > 0 && localImages.length - 1 === remoteImages.length) {
            setImageUploaded(true)
          }
        }
      })
      .catch((e) => console.log(e))
  }

  return { upload, imageUploaded }
}

export default useUpload
