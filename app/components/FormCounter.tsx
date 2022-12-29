import { AntDesign, Ionicons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import React, { memo, useEffect, useState } from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../components"
import { colors, spacing, typography } from "../theme"

export interface FormCounterProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  label: string
  onChange: (c: number) => void
  value: number
}

/**
 * Describe your component here
 */
const FormCounter = observer(function FormCounter(props: FormCounterProps) {
  const { label, onChange, value } = props
  const [counter, setCounter] = useState<number>(value)
  const inc = () => setCounter(counter + 1)
  const dec = () => setCounter(counter - 1)

  const opacityLevel = counter === 0 ? 0.4 : 1

  useEffect(() => {
    onChange(counter)
  }, [counter])
  return (
    <View style={$container}>
      <Text text={label} preset="default" />
      <View style={$counterContainer}>
        <Pressable
          disabled={counter === 0}
          onPress={dec}
          style={[$icon, { opacity: opacityLevel }]}
        >
          <AntDesign name="minus" size={24} color={colors.palette.primary400} />
        </Pressable>

        <Text text={String(value ?? "0")} style={$label} preset="default" />
        <Pressable onPress={inc} style={$icon}>
          <Ionicons name="add-outline" size={24} color={colors.palette.primary400} />
        </Pressable>
      </View>
    </View>
  )
})

export default memo(FormCounter)

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  marginTop: 17,
  justifyContent: "space-between",
  alignContent: "center",
}

const $counterContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $icon: ViewStyle = {
  padding: 3,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.primary20,
  borderRadius: 100,
}
const $label: TextStyle = {
  paddingHorizontal: spacing.large,
  fontFamily: typography.primary.semiBold,
}
