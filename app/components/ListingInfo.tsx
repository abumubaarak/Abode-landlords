import { observer } from "mobx-react-lite"
import React, { memo, useEffect } from "react"
import { Image, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import useFirestore from "../hooks/useFirestore"
import { colors, typography } from "../theme"
import { PROPERTY } from "../utils/firebase"
import { Text } from "./Text"

export interface ListingInfoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,
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
      <Text text="APPLIED FOR" style={{ color: colors.black, opacity: 0.4, fontSize: 12, fontFamily: typography.primary.medium }} />
      <View style={{ marginTop: 3, flexDirection: "row", alignItems: "center" }}>
        <Image resizeMode="center" source={{ uri: document?.remoteImages[0] }} style={{ width: 65, height: 45, borderRadius: 5 }} />
        <View style={{ flexDirection: "column", flexShrink: 1, paddingHorizontal: 7 }}>
          <Text text={document?.propertyType} style={{ fontSize: 13, color: colors.palette.primary100, fontFamily: typography.primary.medium }} />
          <Text style={{ fontSize: 13 }} text={document?.name} numberOfLines={1} />
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: colors.lightgrey, opacity: 0.3, marginTop: 5 }} />
    </View>
  )
})

export default memo(ListingInfo)
const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
