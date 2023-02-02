import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { goBack } from "../navigators"
import { colors, spacing } from "../theme"
import { Icon } from "./Icon"

export interface CloseProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Close = observer(function Close(props: CloseProps) {
  const { style } = props

  return (
    <View style={$closeIcon}>
      <View style={$closeView}>
        <Icon icon="x" onPress={() => goBack()} />
      </View>
    </View>
  )
})

const $closeIcon: ViewStyle = {
  paddingHorizontal: spacing.medium,
  marginTop: spacing.huge,
  alignItems: "flex-end",
}
const $closeView: ViewStyle = {
  height: 45,
  width: 45,
  backgroundColor: colors?.lightgrey,
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center",
}
