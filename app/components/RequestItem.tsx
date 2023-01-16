import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { observer } from "mobx-react-lite"
import moment from "moment"
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing, typography } from "../theme"
import ListingInfo from "./ListingInfo"
import RequestProfile from "./RequestProfile"
import { Text } from "./Text"

export interface RequestItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: FirebaseFirestoreTypes.DocumentData
}

/**
 * Describe your component here
 */
export const RequestItem = observer(function RequestItem(props: RequestItemProps) {
  const { item } = props

  return (
    <View style={$item}>
      <ListingInfo id={item.pId} />
      <RequestProfile name={item.tName} />
      <View>
        <Text text="Message" style={$label} />
        <Text numberOfLines={5} style={$message} text={item.message} />
      </View>
      <View style={{ marginTop: 8 }}>
        <Text text="Sent at" style={$label} />
        <Text style={$message} text={moment(new Date(item?.timestamp)).fromNow()} />
      </View>
    </View>
  )
})

const $message: TextStyle = { fontFamily: typography.primary.normal, fontSize: 13, lineHeight: 25 }

const $label: TextStyle = {
  opacity: 0.4,
  fontSize: 13,
  fontFamily: typography.primary.normal,
}

const $item: ViewStyle = {
  backgroundColor: colors.white,
  borderRadius: 10,
  paddingBottom: spacing.medium,
  paddingVertical: 6,
  paddingHorizontal: 10,
  width: "100%",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2,
}
