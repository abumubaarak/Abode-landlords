import { useIsFocused } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Empty, Loader } from "../components"
import MessageItem from "../components/MessageItem"
import useApi from "../hooks/useApi"
import { useUtils } from "../hooks/useUtils"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const InboxScreen: FC<StackScreenProps<AppStackScreenProps, "Inbox">> = observer(
  function InboxScreen() {
    const isFocused = useIsFocused()
    const { refreshing, onRefresh } = useUtils()
    const { getMessageList, messages, isLoading } = useApi()

    useEffect(() => {
      getMessageList()
    }, [isFocused])

    useEffect(() => {
      if (!refreshing) return
      getMessageList()
    }, [refreshing])

    if (isLoading) return <Loader />
    if (messages?.data?.length === 0 || !messages) return <Empty message="Nothing in Inbox." />

    return (
      <View style={$root}>
        <FlashList
          data={messages?.data}
          contentContainerStyle={$listRoot}
          ItemSeparatorComponent={() => <View style={$separator} />}
          renderItem={({ item }) => <MessageItem data={item} />}
          estimatedItemSize={200}
        />
      </View>
    )
  },
)

const $root: ViewStyle = {
  backgroundColor: colors.white,
  flex: 1,
}

const $listRoot: ContentStyle = {
  paddingTop: spacing.small,
}
const $separator: ViewStyle = {
  height: spacing.medium,
}
