import { MaterialCommunityIcons } from "@expo/vector-icons"
import firestore from "@react-native-firebase/firestore"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { memo, useState } from "react"
import { ActivityIndicator, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import useApi from "../hooks/useApi"
import { Messages } from "../services/api"
import { colors } from "../theme"
import { REQUEST } from "../utils/firebase"

export interface RequestActionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  messages: Omit<Messages, "_id" | "__v" | "sentAt">
  requestId: string
}

/**
 * Describe your component here
 */
const RequestAction = observer(function RequestAction(props: RequestActionProps) {
  const { messages, requestId } = props
  const { initConversation } = useApi()
  const navigation = useNavigation()
  const [disable, setDisable] = useState<"accept" | "decline" | undefined>(undefined)

  const handleAcceptRequest = async () => {
    setDisable("accept")
    await firestore()
      .collection(REQUEST)
      .doc(requestId)
      .update({
        status: "accepted",
      })
      .then(() => {
        initConversation(messages)
        setDisable(undefined)
        navigation.navigate("Inbox")
      })
  }
  const handleDeclineRequest = async () => {
    setDisable("decline")
    await firestore()
      .collection(REQUEST)
      .doc(requestId)
      .update({
        status: "decline",
      })
      .then(() => setDisable(undefined))
  }

  return (
    <View style={$container}>
      <Pressable disabled={disable !== undefined} style={$pressable} onPress={handleDeclineRequest}>
        <View
          style={[
            $iconContainer,
            { opacity: disable === "accept" ? 0.3 : 1, backgroundColor: colors.black },
          ]}
        >
          {disable === "decline" ? (
            <ActivityIndicator animating={true} size="small" color={colors?.white} />
          ) : (
            <MaterialCommunityIcons
              name="close"
              size={28}
              color="white"
              style={{ opacity: disable === "accept" ? 0.3 : 1 }}
            />
          )}
        </View>
      </Pressable>

      <View style={$spacer} />
      <Pressable disabled={disable !== undefined} style={$pressable} onPress={handleAcceptRequest}>
        <View
          style={[
            $iconContainer,
            { opacity: disable === "decline" ? 0.3 : 1, backgroundColor: colors.white },
          ]}
        >
          {disable === "accept" ? (
            <ActivityIndicator animating={true} size="small" color={colors?.white} />
          ) : (
            <MaterialCommunityIcons
              name="heart"
              size={28}
              color="red"
              style={{ opacity: disable === "decline" ? 0.3 : 1 }}
            />
          )}
        </View>
      </Pressable>
    </View>
  )
})

export default memo(RequestAction)

const $container: ViewStyle = {
  flexGrow: 1.5,
  justifyContent: "center",
  flexDirection: "row",
}

const $pressable: ViewStyle = {
  alignItems: "center",
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 100,
  width: 52,
  height: 52,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2,
}

const $spacer: TextStyle = { width: 50 }
