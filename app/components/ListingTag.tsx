import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { typography } from "../theme"
import { Text } from "./Text"

import { ReactNode } from "react"

export interface ListingAmentiesTagProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  label: string
  icon: ReactNode
}

/**
 * Describe your component here
 */
export const ListingTag = observer(function ListingAmentiesTag(props: ListingAmentiesTagProps) {
  const { label, icon } = props

  return (
    <View style={$container}>
      <View style={$iconContainer}>{icon}</View>
      <Text text={label} style={$text} />
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const $iconContainer: ViewStyle = {
  width: 22,
  height: 22,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F4F3F4",
  borderRadius: 100,
}

const $text: TextStyle = {
  fontSize: 12,
  paddingLeft: 5,
  fontFamily: typography.primary.normal,
  color: "#636167",
}
