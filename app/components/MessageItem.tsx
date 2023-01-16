import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import moment from "moment"
import React, { memo, useEffect } from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import useFirestore from "../hooks/useFirestore"
import { Messages } from "../services/api"
import { colors, spacing, typography } from "../theme"
import { avatarName } from "../utils"
import { USERS } from "../utils/firebase"
import { Text } from "./Text"

export interface ChatItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data: Messages
}

const MessageItem = observer(function ChatItem(props: ChatItemProps) {
  const { data } = props
  const { getDocument, document } = useFirestore()
  const navigation = useNavigation()

  useEffect(() => {
    getDocument(USERS, data?.tenant_id)
  }, [])
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Conversation", {
          message_id: data?._id,
          tenant_id: data?.tenant_id,
          landlord_id: data?.landlord_id,
        })
      }
      style={$container}
    >
      <View style={$chatContainer}>
        <View style={$avatar}>
          <Text text={avatarName(document?.displayName)} style={$avatarLabel} />
        </View>
        <View style={$chatListContainer}>
          <View style={$chatListInfo}>
            <Text style={$userLabel} numberOfLines={1} text={document?.displayName} />
            <Text
              style={$chatTime}
              numberOfLines={1}
              text={moment(new Date(data?.sentAt)).fromNow()}
            />
          </View>
          <Text style={$message} numberOfLines={1} text={data?.message} />
        </View>
      </View>
    </Pressable>
  )
})
export default memo(MessageItem)

const $container: ViewStyle = {
  paddingVertical: 5,
}

const $chatContainer: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: 3,
  paddingHorizontal: spacing.medium,
  paddingBottom: 10,
}

const $avatar: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.primary100,
  height: 53,
  width: 53,
  borderRadius: 100,
}

const $userLabel: TextStyle = {
  fontFamily: typography.primary.semiBold,
  paddingRight: 5,
  fontSize: 15,
}
const $chatTime: TextStyle = {
  fontFamily: typography.primary.light,
  fontSize: 12,
  flexShrink: 1,
  color: colors.gray,
}
const $message: TextStyle = {
  paddingTop: 2,
  fontFamily: typography.primary.normal,
  color: colors.gray,
  fontSize: 14,
}
const $chatListContainer: ViewStyle = {
  paddingLeft: 12,
  flexShrink: 1,
}

const $chatListInfo: ViewStyle = {
  flexShrink: 1,
  flexDirection: "row",
  justifyContent: "space-between",
}

const $avatarLabel: TextStyle = {
  color: colors.white,
  fontSize: 25,
  paddingTop: 15,
  fontFamily: typography.primary.medium,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
