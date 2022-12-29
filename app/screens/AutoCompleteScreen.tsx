import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { AppStackScreenProps } from "../navigators"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `AutoComplete: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="AutoComplete" component={AutoCompleteScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const AutoCompleteScreen: FC<StackScreenProps<AppStackScreenProps, "AutoComplete">> =
  observer(function AutoCompleteScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook

    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details)
        }}
        styles={{
          container: {
            marginTop: 40,
          },
        }}
        query={{
          key: "AIzaSyCWeXpiwmI6MUaM-mHsEnNrEmH23ibTnTM",
          language: "en",
        }}
      />
    )
  })
