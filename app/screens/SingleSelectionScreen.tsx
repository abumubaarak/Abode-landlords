import { Ionicons } from "@expo/vector-icons"
import { RouteProp, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { Close, Screen, Text } from "../components"
import { GENDER, LANGUAGES } from "../data"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `SingleSelection: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="SingleSelection" component={SingleSelectionScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SingleSelectionScreen: FC<StackScreenProps<AppStackScreenProps, "SingleSelection">> =
  observer(function SingleSelectionScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const [activeItem, setActiveItem] = useState<string>()

    const route = useRoute<RouteProp<AppStackParamList, "SingleSelection">>()
    const params = route.params

    useEffect(() => {
      if (!activeItem) return
      params.data(activeItem)
    }, [activeItem])

    const handleActiveItem = (name: string) => {
      setActiveItem(name)
    }
    const ITEM = params.type === "gender" ? GENDER : LANGUAGES

    return (
      <Screen backgroundColor={colors.white} style={$root} preset="scroll">
        <Close />

        <View style={$listContainer}>
          {ITEM.map((item) => (
            <Pressable key={item.name} onPress={() => handleActiveItem(item.name)}>
              <View style={$labelContainer}>
                <Text text={item.name} />
                {item.name === activeItem && (
                  <Ionicons name="checkmark" size={24} color={colors.palette.primary100} />
                )}
              </View>
              <View style={$separator} />
            </Pressable>
          ))}
        </View>
      </Screen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}

const $labelContainer: ViewStyle = {
  paddingVertical: spacing.medium,
  flexDirection: "row",
  justifyContent: "space-between",
}
const $separator: ViewStyle = {
  height: 0.5,
  backgroundColor: colors.lightgrey,
}

const $listContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
}
