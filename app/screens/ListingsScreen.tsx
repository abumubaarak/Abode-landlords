import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Listings: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Listings" component={ListingsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ListingsScreen: FC<StackScreenProps<AppStackScreenProps, "Listings">> = observer(
  function ListingsScreen() {
    // Pull in one of our MST stores
    const {
      propertyStoreModel: { reset },
    } = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()
    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
        <Text text="Listings" preset="subheading" />
        <Button
          text="Post listing"
          onPress={() => navigation.navigate("AddListing", { screen: "AddListing" })}
        />
        <Button text="clear" onPress={() => reset()} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
