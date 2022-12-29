import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextProps, TextStyle, ViewStyle } from "react-native"
import { Text } from "./Text"

export interface SmallLabelProps extends Omit<TextProps, "ref"> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  text?: string
  paddingTop?: number
  paddingBottom?: number
}

/**
 * Describe your component here
 */
export const SmallLabel = observer(function RequiredLabel(props: SmallLabelProps) {
  const { text, paddingTop, paddingBottom, ...TextProps } = props
  return (
    <Text
      text={`${text ?? "* Required fields"}`}
      preset="default"
      size="sm"
      style={[$text, { paddingTop, paddingBottom }]}
      {...TextProps}
    />
  )
})

const $text: TextStyle = {
  opacity: 0.5,
  fontSize: 13,
}
