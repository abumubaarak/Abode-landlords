import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { useState } from "react"
import { useStores } from "../models"

const useProperty = () => {
  const {
    propertyStoreModel: {
      name,
      city,
      address,
      propertySize,
      avaliableBedroom,
      roomSize,
      avaliableBathroom,
      propertyType,
      rules,
      reset,
      amenities,
      cost,
      description,
      remoteImages,
      cityLocation,
      addresssLocation,
    },
  } = useStores()

  const [uploaded, setUploaded] = useState<boolean>()
  const [error, setError] = useState<boolean>()

  const uploadPropertyData = () => {
    const collection = firestore().collection("Property").doc()
    collection
      .set({
        name,
        id: collection.id,
        city,
        address,
        propertySize,
        avaliableBedroom,
        roomSize,
        avaliableBathroom,
        propertyType,
        rules,
        amenities,
        cost,
        description,
        status: "vacant",
        remoteImages,
        cityLocation,
        addresssLocation,
        uid: auth().currentUser.uid,
        createdAt: Date.now()
      })
      .then(() => {
        setUploaded(true)

        reset()
      })
      .catch(() => setError(true))
  }

  return { uploadPropertyData, uploaded, error }
}

export default useProperty
