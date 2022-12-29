import { Ionicons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing, typography } from "../theme"
import { Icon } from "./Icon"
import { Text } from "./Text"

export interface GalleryCalloutProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const GalleryCallout = observer(function GalleryCallout(_: GalleryCalloutProps) {
  return (
    <View style={$container}>
      <View style={$iconContainer}>
        <View style={$iconView}>
          <Icon icon="add" style={$icon} />
        </View>
      </View>
      <View style={$info}>
        <Ionicons name="camera-outline" size={50} color="black" />
        <Text text="Upload all your photos in one go!" preset="formLabel" style={$uploadLabel} />
        <Text text="Just tap here to browse your album" preset="default" style={$tapLabel} />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  backgroundColor: "#fff",
  borderRadius: 10,
  marginHorizontal: spacing.large,
  flex: 1,
  padding: 10,
  marginTop: 25,
  marginBottom: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2,
}

const $iconContainer: ViewStyle = {
  alignItems: "flex-end",
  paddingTop: 5,
  paddingRight: 5,
}

const $info: ViewStyle = {
  justifyContent: "center",
  marginTop: 10,
  alignItems: "center",
  paddingBottom: 15,
}

const $uploadLabel: TextStyle = {
  marginTop: 20,
  fontFamily: typography.primary.semiBold,
}
const $tapLabel = {
  fontFamily: typography.primary.light,
  fontSize: 15,
  opacity: 0.4,
}
const $icon = {
  tintColor: colors.palette.primary100,
  width: 16,
  height: 16,
}

const $iconView: ViewStyle = {
  borderRadius: 100,
  height: 20,
  justifyContent: "center",
  alignItems: "center",
  width: 20,
  borderColor: colors.palette.primary100,
  borderWidth: 1,
}
