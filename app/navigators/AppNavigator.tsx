/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import auth from "@react-native-firebase/auth"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import {
  AddListingScreen,
  AutoCompleteScreen,
  ConversationScreen,
  GetStartedScreen,
} from "../screens"
import { ListingDetailsScreen } from "../screens/ListingDetailsScreen"
import { SingleSelectionScreen } from "../screens/SingleSelectionScreen"
import { VerifyScreen } from "../screens/VerifyScreen"
import { colors } from "../theme"
import { HomeNavigator } from "./HomeNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  GetStarted: undefined
  Home: undefined
  AddListing: undefined
  AutoComplete: { type: string }
  ListingDetails: { id: string }
  Conversation: { message_id: string; tenant_id: string; landlord_id: string }
  SingleSelection: {
    data: React.Dispatch<React.SetStateAction<string>>
    type: "gender" | "language"
  }
  Verify: undefined
  // 🔥 Your screens go here
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const [initializing, setInitializing] = useState(true)

  function onAuthStateChanged() {
    if (initializing) {
      setInitializing(false)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={auth().currentUser?.uid ? "Home" : "GetStarted"} // @demo remove-current-line
    >
      {auth().currentUser?.uid ? (
        <>
          <Stack.Screen name="Home" component={HomeNavigator} />
          <Stack.Screen name="AddListing" component={AddListingScreen} />
          <Stack.Screen
            name="Conversation"
            component={ConversationScreen}
            options={{ headerShown: true, animation: "slide_from_right" }}
          />
          <Stack.Group
            screenOptions={{
              presentation: "fullScreenModal",
              animation: "slide_from_bottom",
            }}
          >
            <Stack.Screen name="SingleSelection" component={SingleSelectionScreen} />
            <Stack.Screen name="AutoComplete" component={AutoCompleteScreen} />
          </Stack.Group>
          <Stack.Screen
            name="Verify"
            component={VerifyScreen}
            options={{ headerShown: true, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="ListingDetails"
            options={{
              headerShown: true,
              animation: "slide_from_right",
              headerTransparent: true,
              headerTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: colors.black,
            }}
            component={ListingDetailsScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
