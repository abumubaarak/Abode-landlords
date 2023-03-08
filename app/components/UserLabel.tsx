import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { ActivityIndicator, StyleProp, TextStyle, ViewStyle } from "react-native"
import useFirestore from "../hooks/useFirestore"
import { colors, typography } from "../theme"
import { USERS } from "../utils"
import { Text } from "./Text"

export interface UserLabelProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  tenant_id: string
}

/**
 * Describe your component here
 */
export const UserLabel = observer(function UserLabel(props: UserLabelProps) {
  const { tenant_id } = props
  const { getDocument, document, isLoading } = useFirestore()

  useEffect(() => {
    getDocument(USERS, tenant_id)
  }, [tenant_id])

  if (isLoading) return <ActivityIndicator animating={true} size="small" color={colors?.white} />

  return <Text text={document?.displayName} style={$label} />
})

const $label: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  marginTop: -3,
}
