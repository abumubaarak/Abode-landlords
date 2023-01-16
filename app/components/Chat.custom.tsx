import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Bubble, InputToolbar, MessageText } from "react-native-gifted-chat"
import { colors, typography } from "../theme"

export const customChatBubble = (props) => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: $customBubble,
    }}
  />
)

export const customChatMessage = (props) => (
  <MessageText {...props} textStyle={{ right: $customChatMessage }} />
)

export const customInputToolbar = (props) => (
  <InputToolbar {...props} containerStyle={$customInput} />
)

const $customInput: ViewStyle = {
  backgroundColor: colors.white,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 0,
  paddingTop: 6,
  marginHorizontal: 6,
  paddingHorizontal: 7,
  marginBottom: 5,
  borderRadius: 100,
  borderTopColor: colors.transparent,
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 20,
  elevation: 3,
}

const $customChatMessage: TextStyle = {
  fontFamily: typography.primary.normal,
}

const $customBubble: ViewStyle = {
  backgroundColor: colors.palette.primary50,
}
