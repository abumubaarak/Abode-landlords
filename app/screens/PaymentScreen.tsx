import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Empty, Loader } from "../components"
import { PaymentItem } from "../components/PaymentItem"
import useFirestore from "../hooks/useFirestore"
import useUser from "../hooks/useUser"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const PaymentScreen: FC<StackScreenProps<AppStackScreenProps, "Payment">> = observer(
  function PaymentScreen() {
    const { isFocused } = useNavigation()
    const { uid } = useUser()
    const { queryDocument, data, isLoading } = useFirestore()

    useEffect(() => {
      queryDocument("Payments", "landlord_id", uid)
    }, [isFocused])

    if (isLoading) return <Loader />
    if (data.length === 0) return <Empty message="No Payment." />

    return (
      <FlashList
        data={data}
        contentContainerStyle={$root}
        ItemSeparatorComponent={() => <View style={$separator} />}
        renderItem={({ item }) => <PaymentItem item={item} />}
        estimatedItemSize={200}
      />
    )
  },
)

const $root: ContentStyle = {
  paddingTop: spacing.tiny,
  paddingHorizontal: spacing.small,
}
const $separator: ViewStyle = {
  height: spacing.medium,
}
