import auth from "@react-native-firebase/auth"
import { useState } from "react"
import { api, BaseResponse, Conversations, Messages } from "../services/api"

const useApi = () => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<BaseResponse<Messages>>()
  const [conversations, setConversations] = useState<BaseResponse<Conversations>>()

  const initConversation = async (messages: Omit<Messages, "_id" | "__v" | "sentAt">) => {
    setLoading(true)
    const response = await api.apisauce.post("messages", { ...messages })
    if (response.ok) {
      setLoading(false)
    }
  }

  const getMessageList = async () => {
    const response = await api.apisauce.get<BaseResponse<Messages>>("messages", {
      id: auth().currentUser.uid,
      user: "landlord",
    })
    if (response.ok) {
      setMessages(response.data)
      setLoading(false)
    } else if (response.problem) {
      setLoading(false)
    }
  }

  const getConversation = async (id: string) => {
    const response = await api.apisauce.get<BaseResponse<Conversations>>("conversations", { id })
    if (response.ok) {
      setConversations(response.data)
      setLoading(false)
    } else if (response.problem) {
      setLoading(false)
    }
  }

  return { initConversation, isLoading, getMessageList, messages, conversations, getConversation }
}

export default useApi
