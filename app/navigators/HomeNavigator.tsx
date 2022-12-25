import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, spacing, typography } from "../theme"
import { translate } from "../i18n"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {
  DashboardScreen,
  InboxScreen,
  ListingsScreen,
  PaymentScreen,
  RequestScreen,
} from "../screens"
import { ViewStyle, TextStyle } from "react-native";
import { Icon } from "../components";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


export type HomeNavigatorParamList = {
  Dashboard: undefined,
  Home: undefined
}
//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"

      activeColor={colors.palette.primary400}
      style={{

      }}
      barStyle={{
        backgroundColor: colors.transparent,
        borderTopColor: colors.separator,
        borderTopWidth: 0.3
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen}
        options={{
          tabBarColor: colors.palette.primary200,
          tabBarIcon: ({ color }) =>
            <Feather name="home" size={24} color={color} />
        }} />
      <Tab.Screen name="Inbox" component={InboxScreen} options={{
        tabBarIcon: ({ color }) => (
          <Icon icon="inbox" color={color} />),
      }} />
      <Tab.Screen name="Listings" component={ListingsScreen} options={{
        tabBarIcon: ({ color }) =>
          <AntDesign name="profile" size={24} color={color} />
      }} />
      <Tab.Screen name="Request" component={RequestScreen} options={{
        tabBarIcon: ({ color }) =>
          <AntDesign name="barschart" size={24} color={color} />
      }} />
      <Tab.Screen name="Payment" component={PaymentScreen} options={{
        tabBarIcon: ({ color }) =>
          <AntDesign name="wallet" size={24} color={color} />
      }} />
    </Tab.Navigator>
    // <Tab.Navigator
    //   screenOptions={{
    //     headerShown: false,

    //     tabBarHideOnKeyboard: true,
    //     tabBarStyle: [$tabBar, { height: bottom + 70, borderTopColor: colors.separator }],
    //     tabBarActiveTintColor: colors.text,
    //     tabBarInactiveTintColor: colors.text,
    //     tabBarLabelStyle: $tabBarLabel,
    //     tabBarItemStyle: $tabBarItem,

    //   }}
    // >
    //   <Tab.Screen name="Dashbord" component={DashboardScreen} options={{
    //     tabBarLabel: translate("tabNavigator.dashbordTab"),
    //     tabBarIcon: ({ focused }) => <Icon icon="inbox" color={focused && colors.tint} />,
    //   }} />
    //   <Tab.Screen name="Inbox" component={InboxScreen}
    //     options={{
    //       tabBarLabel: translate("tabNavigator.inboxTab"),
    //       tabBarIcon: ({ focused }) => <Icon icon="inbox" color={focused && colors.tint} />,
    //     }} />
    //   <Tab.Screen name="Listings" component={ListingsScreen} options={{
    //     tabBarLabel: translate("tabNavigator.listingTab"),
    //     tabBarIcon: ({ focused }) => <Icon icon="inbox" color={focused && colors.tint} />,
    //   }} />
    //   <Tab.Screen name="Request" component={RequestScreen} options={{
    //     tabBarLabel: translate("tabNavigator.tenantTab"),
    //     tabBarIcon: ({ focused }) => <Icon icon="inbox" color={focused && colors.tint} />,
    //   }} />
    //   <Tab.Screen name="Payment" component={PaymentScreen} options={{
    //     tabBarLabel: translate("tabNavigator.paymentTab"),
    //     tabBarIcon: ({ focused }) => <Icon icon="inbox" color={focused && colors.tint} />,
    //   }} />
    // </Tab.Navigator>
  )
}
const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}