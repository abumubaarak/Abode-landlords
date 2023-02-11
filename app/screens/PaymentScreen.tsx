import { StackScreenProps } from "@react-navigation/stack"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { RefreshControl, View, ViewStyle } from "react-native"
import { Empty, Loader } from "../components"
import { PaymentItem } from "../components/PaymentItem"
import useFirestore from "../hooks/useFirestore"
import useUser from "../hooks/useUser"
import { useUtils } from "../hooks/useUtils"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const PaymentScreen: FC<StackScreenProps<AppStackScreenProps, "Payment">> = observer(
  function PaymentScreen() {
    const { uid } = useUser()
    const { queryDocument, data, isLoading } = useFirestore()
    const { refreshing, onRefresh } = useUtils()

    useEffect(() => {
      queryDocument("Payments", "landlord_id", uid)
    }, [])
    useEffect(() => {
      if (!refreshing) return
      queryDocument("Payments", "landlord_id", uid)
    }, [refreshing])

    if (isLoading) return <Loader />
    if (data.length === 0) return <Empty message="Nothing in Payment." />

    return (
      <FlashList
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.black}
        />}
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
