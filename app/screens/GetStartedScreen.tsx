import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { ActivityIndicator, ImageBackground, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import useFirebase from "../hooks/useFirebase"
//import useFirebase from "../hooks/useFirebase"
import { AppStackScreenProps, resetRoot } from "../navigators"
import { colors, spacing, typography } from "../theme"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const GetStartedScreen: FC<StackScreenProps<AppStackScreenProps, "GetStarted">> = observer(
  function GetStartedScreen() {
    const { onAppleButtonPress, onGoogleButtonPress } = useFirebase()
    const [isLoading, setLoading] = useState<boolean>(false)

    const getStarted = require("../../assets/images/get-started.jpg")

    const continueWithGoogle = () => {
      setLoading(true)
      onGoogleButtonPress()
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    }
    const continueWithApple = () => {
      setLoading(true)
      onAppleButtonPress()
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    }
    useEffect(() => {
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        webClientId: "980427352092-vaihpt46rgqge0vns0ctne7ql9qoajmt.apps.googleusercontent.com",
      })
    }, [])
    useEffect(() => {
      if (auth().currentUser?.uid != null) {
        const params = { index: 0, routes: [{ name: 'Home' }] }
        resetRoot(params)
      }
    }, [auth().currentUser?.uid])

    return (
      <Screen statusBarStyle="light" style={$root}>
        <View style={$topContainer}>
          <ImageBackground resizeMode="cover" source={getStarted} style={$root} />
        </View>
        <View style={$bottomContainer}>
          <Text tx="getStarted.main" preset="heading" style={$labelHeading} />
          <Text tx="getStarted.sub" preset="default" style={$labelSubHeading} />
          <Text onPress={continueWithApple} text="Apple" preset="default" style={$labelSubHeading} />

          <Button
            LeftAccessory={(_) =>
              isLoading && (
                <ActivityIndicator
                  animating={isLoading}
                  size="small"
                  color={colors?.palette.primary300}
                />
              )
            }
            text={!isLoading && "Get Started"}
            preset="filled"
            onPress={continueWithGoogle}
            textStyle={$buttonLabel}
            style={$button}
          />
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
