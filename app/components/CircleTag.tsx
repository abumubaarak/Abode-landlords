import { observer } from "mobx-react-lite"
import * as React from "react"
import { ReactNode, useState } from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface CircleTagProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  label: string
  icon: ReactNode
  tag?: any
  setTag: (tag: string, state: boolean) => void
  isActive?: boolean
}

const CircleTag = observer(function CircleTag(props: CircleTagProps) {
  const { icon, label, setTag, tag, isActive } = props
  const [active, setActive] = useState<boolean>(isActive)

  const opacityLevel = active ? 1 : 0.3
  const handleTag = () => {
    if (!active) {
      setTag(tag, true)
    } else {
      setTag(tag, false)
    }
    setActive(!active)
  }

  return (
    <Pressable style={[$container, { opacity: opacityLevel }]} onPress={handleTag}>
      <View style={$icon}>{icon}</View>
      <Text text={label} style={$label} />
    </Pressable>
  )
})

export default React.memo(CircleTag)

const $container: ViewStyle = {
  alignItems: "center",
}

const $icon: TextStyle = {
  padding: 8,
  borderColor: colors.textDim,
  borderWidth: 1,
  borderRadius: 100,
}

const $label = {
  paddingTop: 8,
  fontSize: 15,
  fontFamily: typography.primary.light,
}
