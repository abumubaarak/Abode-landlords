import { StackScreenProps } from "@react-navigation/stack"
import { FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { RefreshControl, View, ViewStyle } from "react-native"
import { Empty, Loader } from "../components"
import { ListingCard } from "../components/ListingCard"
import useFirestore from "../hooks/useFirestore"
import useUser from "../hooks/useUser"
import { useUtils } from "../hooks/useUtils"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { PROPERTY } from "../utils"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ListingsScreen: FC<StackScreenProps<AppStackScreenProps, "Listings">> = observer(
  function ListingsScreen() {
    const { queryDocument, data: listings, isLoading } = useFirestore()
    const { uid } = useUser()
    const { refreshing, onRefresh } = useUtils()

    useEffect(() => {
      queryDocument(PROPERTY, "uid", uid)
    }, [])

    useEffect(() => {
      if (!refreshing) return
      queryDocument(PROPERTY, "uid", uid)
    }, [refreshing])

    if (isLoading) return <Loader />
    if (listings.length === 0) return <Empty message="Nothing in Listings." />

    return (
      <FlashList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.black}
          />
        }
        data={listings}
        testID="listings"
        contentContainerStyle={$root}
        ItemSeparatorComponent={() => <View style={$separator} />}
        renderItem={({ item }) => <ListingCard key={item.id} item={item} />}
        estimatedItemSize={200}
      />
    )
  },
)

const $root: ViewStyle = {
  paddingVertical: spacing.small,
  paddingHorizontal: spacing.medium,
}
const $separator: ViewStyle = {
  height: spacing.medium,
}
