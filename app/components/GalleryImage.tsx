import { observer } from "mobx-react-lite"
import * as React from "react"
import {
  Dimensions,
  ImageBackground,
  ImageStyle,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native"
import { useStores } from "../models"
import { colors, spacing } from "../theme"
import { Icon } from "./Icon"

export interface GalleryImageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  url: string
}

/**
 * Describe your component here
 */
export const GalleryImage = observer(function GalleryImage(props: GalleryImageProps) {
  const { url } = props
  const deviceWith = Dimensions.get("window").width / 3.8
  const {
    propertyStoreModel: { removeLocalImageAtPosition },
  } = useStores()

  return (
    <ImageBackground
      key={url}
      imageStyle={$imageBackground}
      style={[$imageBackgroundStyle, { width: deviceWith }]}
      source={{ uri: url }}
    >
      <Pressable onPress={() => removeLocalImageAtPosition(url)}>
        <View style={$iconParent}>
          <View style={$iconContainer}>
            <Icon icon="x" style={$icon} />
          </View>
        </View>
      </Pressable>
    </ImageBackground>
  )
})

const $imageBackground: ImageStyle = {
  borderRadius: 6,
}

const $imageBackgroundStyle: ViewStyle = {
  marginTop: 10,
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 20,
  height: 96,
}
const $iconParent: ViewStyle = {
  alignItems: "flex-end",
  padding: spacing.micro,
}
const $iconContainer: ViewStyle = {
  borderRadius: 100,
  height: 20,
  justifyContent: "center",
  alignItems: "center",
  width: 20,
  backgroundColor: colors.palette.primary100,
}
const $icon: ImageStyle = {
  tintColor: colors.white,
  width: 16,
  height: 16,
}
