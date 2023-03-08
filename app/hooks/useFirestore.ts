import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { useState } from "react"
import { REQUEST, USERS } from "../utils"
import { delay } from "../utils/delay"

const useFirestore = () => {
  const [data, setData] = useState<FirebaseFirestoreTypes.DocumentData[]>([])
  const [document, setDocument] = useState<FirebaseFirestoreTypes.DocumentData>()
  const [isLoading, setLoading] = useState<boolean>(false)

  const getCollection = async (collectionPath: string) => {
    setLoading(true)
    const collection = await firestore().collection(collectionPath).get()

    const newData = collection.docs.map((doc) => ({ ...doc.data() }))
    setData(newData)
    if (data) {
      setLoading(false)
    }
  }
  const getDocument = async (collectionPath: string, docPath: string) => {
    setLoading(true)
    const collection = await firestore().collection(collectionPath).doc(docPath).get()
    setDocument(collection.data())
    if (collection) {
      setLoading(false)
    }
  }
  const queryDocument = async (collectionPath: string, path: string, value: string) => {
    setLoading(true)
    const collection = await firestore().collection(collectionPath).where(path, "==", value).get()
    const newData = collection.docs.map((doc) => ({ ...doc.data() }))
    setData(newData)
    if (data) {
      setLoading(false)
    }
  }

  function onResult(QuerySnapshot) {
    const newData = QuerySnapshot.docs.map((doc) => ({ ...doc.data() }))
    setData(newData)
    if (data) {
      setLoading(false)
    }
  }

  function onError(error) {
    console.error(error)
  }

  const tenantRequest = async (path: string, value: string) => {
    setLoading(true)
    await firestore()
      .collection(REQUEST)
      .where(path, "==", value)
      .where("status", "==", "pending")
      .onSnapshot(onResult, onError)
  }

  const updateInfo = async (
    uid: string,
    profession: string,
    dob: Date,
    language: string,
    gender: string,
  ) => {
    setLoading(true)
    const userCollection = await firestore().collection(USERS).doc(uid)
    userCollection
      .update({
        profession,
        dob,
        language,
        isVerify: true,
        gender,
      })
      .then((res) => {
        console.log(res)
        delay(4000).then(() => {
          setLoading(false)
        })
      })
  }

  return {
    tenantRequest,
    getCollection,
    data,
    isLoading,
    updateInfo,
    document,
    getDocument,
    queryDocument,
  }
}

export default useFirestore
