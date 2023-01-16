import { SimpleLineIcons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "../theme"
import { Text } from "./Text"
export interface EmptyProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  message: string
}

/**
 * Describe your component here
 */
export const Empty = observer(function Empty(props: EmptyProps) {
  const { style, message } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <SimpleLineIcons name="social-dropbox" size={40} color={colors.black} />
      <Text style={$text}>{message}</Text>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 16,
  paddingTop: 10,
  letterSpacing: 1,
  color: colors.gray,
}
