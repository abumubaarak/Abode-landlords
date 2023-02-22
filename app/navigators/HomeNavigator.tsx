import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons"
import auth from "@react-native-firebase/auth"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useToast } from "react-native-toast-notifications"
import useFirestore from "../hooks/useFirestore"
import useUser from "../hooks/useUser"
import {
  InboxScreen,
  ListingsScreen,
  PaymentScreen,
  ProfileScreen,
  RequestScreen
} from "../screens"
import { colors, spacing, typography } from "../theme"
import { USERS } from "../utils/firebase"
import { navigate, resetRoot } from "./navigationUtilities"

export type HomeNavigatorParamList = {
  Home: undefined
}
const Tab = createBottomTabNavigator()
// const Tab = createMaterialBottomTabNavigator()

const Stack = createStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  const { bottom } = useSafeAreaInsets()
  const { uid } = useUser()
  const { getDocument: getProfile, document: profile, isLoading: profileIsLoading } = useFirestore()
  const toast = useToast();

  useEffect(() => {
    getProfile(USERS, uid)
    if (auth()?.currentUser?.uid == null) {
      const params = { index: 0, routes: [{ name: 'GetStarted' }] }
      resetRoot(params)
    }
  }, [uid])

  const handleAddListing = () => {
    if (profile.isVerify) {
      navigate("AddListing", { screen: "AddListing" })
    } else {
      toast.show("You need to verify your account before you can create listing", {
        type: "danger",
        placement: "top",
      })
    }
  }

  return (
    <Tab.Navigator
      initialRouteName="Listings"
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarIconStyle: $tabIcon,
        tabBarStyle: {
          ...$tabBar,
          height: bottom + 64,
        },
        headerShown: true,
        headerTitleStyle: {
          fontFamily: typography.primary.medium,
        },
      }}
    >
      <Tab.Screen
        name="Listings"
        component={ListingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="list-unordered"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
          headerRight: () => (
            <Pressable testID="add-icon" onPress={handleAddListing}>
              <View style={{ marginRight: spacing.tiny }}>
                <Ionicons name="add-circle-outline" size={27} color={colors.palette.primary100} />
              </View>
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Request"
        component={RequestScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="message1"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-receipt-outline"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.white,
  elevation: 0,
  borderTopColor: colors.lightgrey,
  borderTopWidth: 1,
}

const $tabBarItem: ViewStyle = {
  paddingTop: 10,
}

const $tabBarLabel: TextStyle = {
  fontSize: 9.8,
  fontFamily: typography.primary.normal,
  flex: 1,
  paddingTop: 8,
}
const $tabIcon: TextStyle = {
  color: colors.lightgrey,
}
