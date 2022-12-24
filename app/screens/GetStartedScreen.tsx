import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, Screen, Text } from "../components"
import { colors, spacing, typography } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `GetStarted: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="GetStarted" component={GetStartedScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const GetStartedScreen: FC<StackScreenProps<AppStackScreenProps, "GetStarted">> = observer(
  function GetStartedScreen() {
    const getStarted = require("../../assets/images/get-started.jpg")

    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen statusBarStyle="light" style={$root}>
        <View style={$topContainer}>
          <ImageBackground resizeMode="cover" source={getStarted} style={$root} />
        </View>
        <View style={$bottomContainer}>
          <Text tx="getStarted.main" preset="heading" style={$labelHeading} />
          <Text tx="getStarted.sub" preset="default" style={$labelSubHeading} />
          <Button text="Get Started" preset="filled" textStyle={$buttonLabel} style={$button} />
        </View>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
const $topContainer: ViewStyle = {
  flexBasis: "68%",
  justifyContent: "center",
}
const $bottomContainer: ViewStyle = {
  flexBasis: "47%",
  backgroundColor: "white",
  paddingTop: 25,
  marginTop: -65,
  paddingBottom: spacing.medium,
  paddingHorizontal: spacing.medium,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
}
const $labelHeading: TextStyle = {
  fontSize: 25,
  lineHeight: 38,
  fontFamily: typography.primary.semiBold,
}
const $labelSubHeading: TextStyle = {
  paddingVertical: spacing.medium,
  lineHeight: 29,
}
const $buttonLabel: TextStyle = {
  color: "white",
  fontFamily: typography.primary.semiBold,
}

const $button = {
  borderRadius: 30,
  backgroundColor: colors.palette.primary50,
  width: "100%",
  marginVertical: spacing.medium,
}
