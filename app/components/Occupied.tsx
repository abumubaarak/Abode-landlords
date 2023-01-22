import { addYears } from "date-fns"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { useEffect } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import useFirestore from "../hooks/useFirestore"
import { colors, spacing, typography } from "../theme"
import { USERS } from "../utils/firebase"
import { Loader } from "./Loader"
import { Text } from "./Text"

export interface OccupiedProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,
  propertyId: string
}

/**
 * Describe your component here
 */
export const Occupied = observer(function Occupied(props: OccupiedProps) {
  const { style, propertyId } = props

  const { queryDocument, data, isLoading } = useFirestore()
  const { getDocument, document, isLoading: userIsLoading } = useFirestore()

  useEffect(() => {
    queryDocument("Payments", "property_id", propertyId)
  }, [])

  useEffect(() => {
    getDocument(USERS, data[0]?.tenant_id)
  }, [data[0]?.tenant_id])


  const paidOn: Date = data[0]?.created.toDate()

  const nextDue = addYears(paidOn, 1)

  const nextDueYear = `${nextDue.getFullYear()}-${nextDue.getMonth() + 1}-${nextDue.getDate()}`

  if (isLoading || userIsLoading) return <Loader />

  return (
    <View
      style={$container}
    >
      <Text text="Occupied By" style={$header} />
      <Text text={document?.displayName} style={$label} />
      <Text text="Next Payment On" style={$header} />
      <Text text={nextDueYear} style={$label} />


    </View>
  )
})

const $container: ViewStyle = {
  paddingVertical: 7,
  opacity: 0.9,
  flexDirection: "column",
  paddingLeft: spacing.small,
  marginTop: 15,
  backgroundColor: colors.lightgrey,
  borderRadius: 10,
}

const $header: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  opacity: 0.8
}
const $label: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  marginTop: -3
}

