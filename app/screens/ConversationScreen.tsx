import auth from "@react-native-firebase/auth"
import { RouteProp, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"

import { Feather } from "@expo/vector-icons"
import React, { FC, useCallback, useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Composer, Day, GiftedChat, Send } from "react-native-gifted-chat"
import io from "socket.io-client"
import { Loader } from "../components"
import { customChatBubble, customChatMessage, customInputToolbar } from "../components/Chat.custom"
import useApi from "../hooks/useApi"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { colors, typography } from "../theme"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ConversationScreen: FC<StackScreenProps<AppStackScreenProps, "Conversation">> =
  observer(function ConversationScreen() {
    const { getConversation, conversations, isLoading } = useApi()
    const route = useRoute<RouteProp<AppStackParamList, "Conversation">>()
    const params = route.params
    const [conversation, setConversation] = useState([])
    const socket = io("https://abode-backend.fly.dev:9000")
    const { message_id, landlord_id, tenant_id } = params
    const JOINED_USER = `${auth().currentUser.uid}${params.message_id}`
    console.log(socket.connected)
    socket.on("connect", () => {
      socket.emit("join_chat", JOINED_USER)
    })

    useEffect(() => {
      return () => {
        socket.emit("left", JOINED_USER)
        socket.disconnect()
        socket.removeAllListeners("conversation_chat")
      }
    }, [])
    useEffect(() => {
      getConversation(params.message_id)
    }, [])

    useEffect(() => {
      const giftedChatMessages = conversations?.data?.map((chatMessage) => {
        const gcm = {
          _id: chatMessage?._id,
          text: chatMessage?.message,
          createdAt: chatMessage?.sentAt,
          user: {
            _id: chatMessage?.sender,
          },
        }
        return gcm
      })
      if (giftedChatMessages?.length > 0) {
        setConversation(giftedChatMessages)
      }
    }, [conversations])

    useEffect(() => {
      socket.on("conversation_chat", (chatMessage) => {
        console.log(chatMessage)
        if (conversation.find((i) => i._id !== chatMessage?._id)) {
          setConversation((previousMessages) => GiftedChat.append(previousMessages, chatMessage))
        }
      })
    }, [socket])

    const sendUserMessage = (message: string) => {
      socket.emit("send_chat", {
        tenant_id,
        landlord_id,
        message,
        message_id,
        sender: auth().currentUser.uid,
      })
    }

    const onSend = useCallback((messages = []) => {
      sendUserMessage(messages[0]?.text)
    }, [])

    if (isLoading) return <Loader />

    return (
      <View style={$root}>
        <GiftedChat
          messagesContainerStyle={$messageContainer}
          messages={conversation}
          renderAvatar={() => null}
          showAvatarForEveryMessage={true}
          renderBubble={customChatBubble}
          renderMessageText={customChatMessage}
          alwaysShowSend={true}
          renderDay={(props) => <Day {...props} textStyle={$day} />}
          maxComposerHeight={100}
          renderInputToolbar={customInputToolbar}
          renderComposer={(props) => <Composer {...props} />}
          renderSend={(props) => (
            <Send {...props} containerStyle={$send}>
              <View>
                <Feather
                  name="send"
                  size={30}
                  color={colors.palette.primary100}
                  style={{ opacity: props.text.length > 0 ? 1 : 0.4 }}
                />
              </View>
            </Send>
          )}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: auth().currentUser.uid,
          }}
        />
      </View>
    )
  })

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
  marginHorizontal: 4,
}

const $messageContainer: ViewStyle = {
  backgroundColor: colors.white,
  paddingBottom: 10,
}

const $day: TextStyle = {
  fontFamily: typography.primary.light,
  fontSize: 13,
}

const $send: ViewStyle = {
  justifyContent: "center",
  marginRight: 6,
}
