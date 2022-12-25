import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ImageBackground, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, Screen, Text } from "../components"
import { colors, spacing, typography } from "../theme"
import { onGoogleButtonPress } from "../utils/firebase"
import { useNavigation } from "@react-navigation/native"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
    const [isLoading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation()

    const getStarted = require("../../assets/images/get-started.jpg")

    const continueWithGoogle = () => {
      setLoading(true)
      onGoogleButtonPress().then(() => setLoading(false)).catch(() => setLoading(false))
    }
    useEffect(() => {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '980427352092-vaihpt46rgqge0vns0ctne7ql9qoajmt.apps.googleusercontent.com',
      });
    }, [])

    return (
      <Screen statusBarStyle="light" style={$root}>
        <View style={$topContainer}>
          <ImageBackground resizeMode="cover" source={getStarted} style={$root} />
        </View>
        <View style={$bottomContainer}>
          <Text tx="getStarted.main" preset="heading" style={$labelHeading} />
          <Text tx="getStarted.sub" preset="default" style={$labelSubHeading} />
          <Button LeftAccessory={(props) =>
            isLoading && <ActivityIndicator animating={isLoading} size="small"
              color={colors?.palette.primary300} />} text={!isLoading && "Get Started"} preset="filled" onPress={continueWithGoogle} textStyle={$buttonLabel} style={$button} />
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
