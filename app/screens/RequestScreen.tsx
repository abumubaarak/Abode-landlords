import auth from "@react-native-firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { Dimensions, View, ViewStyle } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { Loader, Text } from "../components";
import ListingInfo from "../components/ListingInfo";
import RequestAction from "../components/RequestAction";
import RequestProfile from '../components/RequestProfile';
import useFirestore from '../hooks/useFirestore';
import { AppStackScreenProps } from "../navigators";
import { colors, spacing, typography } from "../theme";

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Request: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Request" component={RequestScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const RequestScreen: FC<StackScreenProps<AppStackScreenProps, "Request">> = observer(
  function RequestScreen() {
    const HORIZONTAL_MARGIN = 15

    const sliderWidth = Dimensions.get("window").width
    const itemWidth = sliderWidth - 100 + HORIZONTAL_MARGIN * 2

    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const { query: queryPendingRequest, isLoading, data } = useFirestore()

    useEffect(() => {
      queryPendingRequest("lid", auth().currentUser.uid)
    }, [])
    const gallery = require("../../assets/images/01.jpg")

    console.log(data)
    if (isLoading) return <Loader />
    return (
      <View style={$root} >
        <Carousel
          vertical={false}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={{ flexGrow: 2 }}
          activeSlideAlignment="center"
          inactiveSlideScale={0.93}
          inactiveSlideOpacity={1}
          data={data}
          renderItem={({ item }) => (
            <View style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              paddingBottom: spacing.medium,
              paddingVertical: 6,
              paddingHorizontal: 10,
              width: "100%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 2,
            }}>
              <ListingInfo id={item.pId} />

              <RequestProfile uid={item.uid} />
              <View style={{}}>
                <Text text="Message" style={{ opacity: 0.4, fontSize: 13, fontFamily: typography.primary.normal }} />
                <Text numberOfLines={5} style={{ fontFamily: typography.primary.normal, fontSize: 13, lineHeight: 25 }} text="I am interested in Modern Apartment With A Lot Of Space And Direct View Of The Naschmarkt , Rechte Wienzeile 5, 1040 Vienna, Austria." />


              </View>
              <View style={{ marginTop: 8 }}>
                <Text text="Sent at" style={{ opacity: 0.4, fontSize: 13, fontFamily: typography.primary.normal }} />
                <Text style={{ fontFamily: typography.primary.normal, fontSize: 13, }} text="Yesterday, 9:01 PM" />


              </View>
            </View>
          )}
        />
        <RequestAction />

      </View>
    )
  },
)

const $root: ViewStyle = {
  paddingTop: 30,
  flex: 1
}

