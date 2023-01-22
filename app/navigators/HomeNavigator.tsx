import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  DashboardScreen,
  InboxScreen,
  ListingsScreen,
  PaymentScreen,
  RequestScreen
} from "../screens"
import { colors, spacing, typography } from "../theme"

export type HomeNavigatorParamList = {
  Dashboard: undefined
  Home: undefined
}
const Tab = createBottomTabNavigator()
// const Tab = createMaterialBottomTabNavigator()

const Stack = createStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  const { bottom } = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
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
            <Pressable onPress={() => navigation.navigate("AddListing", { screen: "AddListing" })}>
              <View style={{ marginRight: spacing.tiny }}>
                <Ionicons name="add-circle-outline" size={27} color={colors.palette.primary100} />
              </View>
            </Pressable>
          )
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
