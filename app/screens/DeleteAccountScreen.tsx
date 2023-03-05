import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ActivityIndicator, TextStyle, ViewStyle } from "react-native"

import { Button, Screen, Text } from "../components"
import useUser from "../hooks/useUser"
import { AppStackScreenProps, navigate } from "../navigators"
import { colors, spacing } from "../theme"
import { USERS } from "../utils/firebase"



// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DeleteAccountScreen: FC<StackScreenProps<AppStackScreenProps, "DeleteAccount">> = observer(function DeleteAccountScreen() {

  const [isLoading, setLoading] = useState<boolean>(false)
  const { uid } = useUser()
  const handleAccountDeletion = async () => {
    setLoading(true)
    await firestore().collection(USERS).doc(uid).delete()

    auth().currentUser
      .delete().then(() => {
        navigate("Listings")
      })
      .catch((error) => console.log(error));
  }
  return (
    <Screen style={$root} preset="scroll">
      <Text text="All your data will be removed from our server and you won't be able to access your account anymore." />
      <Button text="Confirm delete account" LeftAccessory={(props) =>
        isLoading && (
          <ActivityIndicator
            animating={isLoading}
            size="small"
            color={colors?.black}
          />
        )} disabled={isLoading} textStyle={$txt} style={$btn} onPress={handleAccountDeletion} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: spacing.large
}
const $txt: TextStyle = {
  color: colors.white
}
const $btn: ViewStyle = {
  marginTop: spacing.large,
  backgroundColor: colors.error
}
