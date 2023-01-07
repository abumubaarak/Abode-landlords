import { observer } from "mobx-react-lite"
import React, { memo, useEffect } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import useFirestore from "../hooks/useFirestore"
import { colors, spacing, typography } from "../theme"
import { avatarName } from "../utils"
import { USERS } from "../utils/firebase"
import { Text } from "./Text"

export interface RequestProfileProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,
  uid: string
}

/**
 * Describe your component here
 */
const RequestProfile = observer(function RequestProfile(props: RequestProfileProps) {
  const { style, uid } = props
  const { getDocument, document } = useFirestore()

  useEffect(() => {
    getDocument(USERS, uid)
  }, [])
  return (
    <View style={{ marginVertical: spacing.large, alignItems: "center" }}>
      <View style={{ alignItems: "center", justifyContent: "center", borderRadius: 100, backgroundColor: colors.palette.primary100, width: 100, height: 100 }}>
        <Text style={{ fontSize: 40, lineHeight: 50, color: colors.white, paddingTop: 5 }} text={avatarName(document?.displayName)} />
      </View>
      <Text text={document?.displayName} style={{ fontFamily: typography.primary.semiBold, paddingTop: spacing.medium }} />
      <Text text="Tenant" style={{ fontFamily: typography.primary.normal, opacity: 0.4, fontSize: 14 }} />
    </View>
  )
})

export default memo(RequestProfile)
const $container: ViewStyle = {
  justifyContent: "center",
}
const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
