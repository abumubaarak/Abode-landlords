import { observer } from "mobx-react-lite"
import { MotiView } from "moti"
import * as React from "react"
import { ReactNode } from "react"
import { StyleProp, ViewStyle } from "react-native"

export interface SlideInProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children: ReactNode
}

/**
 * Describe your component here
 */
export const SlideIn = observer(function SideIn(props: SlideInProps) {
  const { children } = props

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      delay={100}
      style={$root}
      transition={{ type: "timing", duration: 300 }}
    >
      {children}
    </MotiView>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
