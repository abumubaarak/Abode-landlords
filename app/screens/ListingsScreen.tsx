import { StackScreenProps } from "@react-navigation/stack"
import { FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Loader } from "../components"
import { ListingCard } from "../components/ListingCard"
import useFirestore from "../hooks/useFirestore"
import useUser from "../hooks/useUser"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"
import { PROPERTY } from "../utils/firebase"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ListingsScreen: FC<StackScreenProps<AppStackScreenProps, "Listings">> = observer(
  function ListingsScreen() {
    const { queryDocument, data: userWishList, isLoading } = useFirestore()
    const { displayName, uid, email } = useUser()

    useEffect(() => {
      if (uid) {
        queryDocument(PROPERTY, "uid", uid)
      }
    }, [])

    if (isLoading) return <Loader />

    return (
      <FlashList
        data={userWishList}
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
