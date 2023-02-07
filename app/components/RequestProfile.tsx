import { MaterialIcons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import React, { memo } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing, typography } from "../theme"
import { avatarName } from "../utils"
import { Text } from "./Text"

export interface RequestProfileProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  name: string
}

/**
 * Describe your component here
 */
const RequestProfile = observer(function RequestProfile(props: RequestProfileProps) {
  const { style, name } = props

  return (
    <View style={{ marginVertical: spacing.large, alignItems: "center" }}>
      <View style={$container}>
        <Text style={$avatarLabel} text={avatarName(name)} />
      </View>
      <View style={$labelContainer}>
        <Text text={name} style={$label} />
        <MaterialIcons name="verified" size={24} color={colors.palette.primary100} />
      </View>
      <Text text="Tenant" style={$tenant} />
    </View>
  )
})

export default memo(RequestProfile)
const $container: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 100,
  backgroundColor: colors.palette.primary100,
  width: 100,
  height: 100,
}
const $labelContainer: ViewStyle = {
  flexDirection: "row",
  paddingTop: spacing.medium,
  alignItems: "center"
}
const $avatarLabel: TextStyle = {
  fontSize: 40,
  lineHeight: 50,
  color: colors.white,
  paddingTop: 5,
}
const $label: TextStyle = {
  fontFamily: typography.primary.semiBold,
}

const $tenant: TextStyle = {
  fontFamily: typography.primary.normal,
  opacity: 0.4,
  fontSize: 14,
}
