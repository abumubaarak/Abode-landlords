import { observer } from "mobx-react-lite"
import React, { memo, useEffect } from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import useFirestore from "../hooks/useFirestore"
import { colors, typography } from "../theme"
import { PROPERTY } from "../utils/firebase"
import { Text } from "./Text"

export interface ListingInfoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  id: string
}

/**
 * Describe your component here
 */
const ListingInfo = observer(function ListingInfo(props: ListingInfoProps) {
  const { id } = props
  const gallery = require("../../assets/images/01.jpg")

  const { getDocument, document } = useFirestore()

  useEffect(() => {
    getDocument(PROPERTY, id)
  }, [])

  return (
    <View>
      <Text
        text="APPLIED FOR"
        style={$applied}
      />
      <View style={$infoContainer}>
        <Image
          resizeMode="center"
          source={{ uri: document?.remoteImages[0] }}
          style={$image}
        />
        <View style={$infoDetailsContainer}>
          <Text
            text={document?.propertyType}
            style={$propertyName}
          />
          <Text style={{ fontSize: 13 }} text={document?.name} numberOfLines={1} />
        </View>
      </View>
      <View style={$line} />
    </View>
  )
})

export default memo(ListingInfo)

const $applied: TextStyle = {
  color: colors.black,
  opacity: 0.4,
  fontSize: 12,
  fontFamily: typography.primary.medium,
}

const $line = {
  height: 1,
  backgroundColor: colors.lightgrey,
  opacity: 0.3, marginTop: 5
}
const $infoContainer: ViewStyle = {
  marginTop: 3,
  flexDirection: "row",
  alignItems: "center"
}
const $image: ImageStyle = {
  width: 65,
  height: 45,
  borderRadius: 5
}

const $infoDetailsContainer: ViewStyle = {
  flexDirection: "column",
  flexShrink: 1,
  paddingHorizontal: 7
}
const $propertyName: TextStyle = {
  fontSize: 13,
  color: colors.palette.primary100,
  fontFamily: typography.primary.medium,
}