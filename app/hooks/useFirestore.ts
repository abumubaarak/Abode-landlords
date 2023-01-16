import auth from "@react-native-firebase/auth"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { WhereFilterOp } from "firebase/firestore"
import { useState } from "react"
import { REQUEST } from "../utils/firebase"


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
  const queryDocument = async (
    collectionPath: string,
    query: string,
    opStr: WhereFilterOp,
    value: string,
  ) => {
    setLoading(true)
    const collection = await firestore()
      .collection(collectionPath)
      .where(query, opStr, value)
      .where("lid", "==", auth().currentUser.uid)
      .get()
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

  return {
    tenantRequest,
    getCollection,
    data,
    isLoading,
    document,
    getDocument,
    queryDocument,
  }
}

export default useFirestore
