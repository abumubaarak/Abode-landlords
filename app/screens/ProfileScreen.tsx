import { MaterialIcons, Octicons } from "@expo/vector-icons"
import auth from "@react-native-firebase/auth"
import { useIsFocused } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { differenceInYears } from "date-fns"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import useFirestore from "../hooks/useFirestore"
import useUser from "../hooks/useUser"
import { AppStackScreenProps, navigate, resetRoot } from "../navigators"
import { colors, spacing, typography } from "../theme"
import { avatarName } from "../utils"
import { USERS } from "../utils/firebase"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ProfileScreen: FC<StackScreenProps<AppStackScreenProps, "Profile">> = observer(
  function ProfileScreen() {
    const { displayName, email, uid } = useUser()
    const { getDocument, document, isLoading } = useFirestore()
    const isFocused = useIsFocused()

    useEffect(() => {
      getDocument(USERS, uid)
    }, [isFocused])

    const handleLogout = () => {
      auth().signOut().then(() => {
        const params = { index: 0, routes: [{ name: 'GetStarted' }] }
        resetRoot(params)
      })
    }

    const dob = document?.dob?.toDate()

    const age = differenceInYears(new Date(), dob)

    return (
      <Screen style={$root} preset="scroll">
        <View style={[$card, {
          alignItems: "center", marginTop: 20
        }]}>
          <View style={$avatarContainer}>
            <Text text={avatarName(displayName)} style={$avatarLabel} />
          </View>
          <View style={$userInfo}>
            <View style={$nameConatiner}>
              <Text text={displayName} style={$label} />
              {document?.isVerify ? (
                <MaterialIcons name="verified" size={24} color={colors.palette.primary100} />
              ) : (
                <Octicons name="unverified" size={24} color="black" style={$icon} />
              )}
            </View>
            <Text text="Landlord" style={$subLabel} />
          </View>
        </View>

        <View style={[$card, { paddingLeft: 15 }]}>
          <Text text="Email" style={$label} />
          <Text text={email} style={$subLabel} />
        </View>
        {document?.isVerify ? (
          <View style={[$card, { paddingLeft: 15 }]}>
            <Text text="Profession" style={$label} />
            <Text text={document?.profession} style={$subLabel} />

            <Text text="Age" style={[$label, $infoLabel]} />
            <Text text={String(age)} style={$subLabel} />

            <Text text="Gender" style={[$label, $infoLabel]} />
            <Text text={document?.gender} style={$subLabel} />

            <Text text="Language" style={[$label, $infoLabel]} />
            <Text text={document?.language} style={$subLabel} />
          </View>
        ) : (
          <Pressable
            onPress={() => navigate("Verify")}
            style={[$card, { paddingLeft: 15, paddingHorizontal: 15 }]}
          >
            <View style={{ flexDirection: "row" }}>
              <Text text="Verify your account" style={$label} />
              <Octicons name="unverified" size={24} color="black" style={$icon} />
            </View>
            <Text
              text="Add more personal details to start applying for rent."
              style={[$subLabel, { paddingTop: 5 }]}
            />
          </Pressable>
        )}
        <Pressable
          onPress={() => navigate("DeleteAccount")}
          style={[$card, { paddingLeft: 15, paddingHorizontal: 15 }]}
        >
          <Text text="Delete Account" style={$delete} />
        </Pressable>
        <Pressable onPress={handleLogout}>
          <View style={$logoutContainer}>
            <Text text="Log out" style={$logout} />
          </View>
        </Pressable>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
}

const $card: ViewStyle = {
  backgroundColor: colors.white,
  paddingVertical: 15,
  marginHorizontal: spacing.small,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  paddingLeft: 5,
  borderRadius: 10,
  shadowRadius: 35,

  elevation: 5,
  marginBottom: 20,
}
const $avatarContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.palette.primary100,
  width: 70,
  height: 70,
  borderRadius: 100,
}
const $avatarLabel: TextStyle = {
  fontSize: 30,
  paddingTop: 19,
  fontFamily: typography.primary.semiBold,
  color: colors.white,
}
const $userInfo: ViewStyle = {
  alignItems: "center",
  paddingLeft: 10,
  paddingVertical: 8,
}
const $nameConatiner: ViewStyle = {
  flexDirection: "row",
}
const $label: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 17,
}
const $infoLabel: TextStyle = {
  paddingTop: 10,
}
const $subLabel: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 15,
  opacity: 0.8,
}
const $icon: ImageStyle = {
  marginLeft: 5,
}
const $logout: TextStyle = {
  fontSize: 18,
  color: colors.error,
  fontFamily: typography.primary.bold,
}
const $logoutContainer: ViewStyle = {
  alignItems: "center",
}
const $delete: TextStyle = {
  fontSize: 15,
  color: colors.black,
  fontFamily: typography.primary.normal,
}