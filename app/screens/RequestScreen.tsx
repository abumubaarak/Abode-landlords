import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { Dimensions, Image, View, ViewStyle } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { Text } from "../components";
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
    const [a, s] = useState(true)
    const gallery = require("../../assets/images/01.jpg")
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
          data={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
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
              <Text text="APPLIED FOR" style={{ color: colors.black, opacity: 0.4, fontSize: 12, fontFamily: typography.primary.medium }} />
              <View style={{ marginTop: 3, flexDirection: "row", alignItems: "center" }}>
                <Image resizeMode="center" source={gallery} style={{ width: 65, height: 45, borderRadius: 5 }} />
                <View style={{ flexDirection: "column", flexShrink: 1, paddingHorizontal: 7 }}>
                  <Text text="Apartment" style={{ fontSize: 13, color: colors.palette.primary100, fontFamily: typography.primary.medium }} />
                  <Text style={{ fontSize: 13 }} text="Modern Apartment With A Lot Of Space And Direct View Of The Naschmarkt" numberOfLines={1} />
                </View>
              </View>
              <View style={{ height: 1, backgroundColor: colors.lightgrey, opacity: 0.3, marginTop: 5 }} />
              <View style={{ marginVertical: spacing.large, alignItems: "center" }}>
                <View style={{ alignItems: "center", justifyContent: "center", borderRadius: 100, backgroundColor: colors.palette.primary100, width: 100, height: 100 }}>
                  <Text style={{ fontSize: 40, lineHeight: 50, color: colors.white, paddingTop: 5 }} text="AI" />
                </View>
                <Text text="Abdulquadri Adedayo Ismail" style={{ fontFamily: typography.primary.semiBold, paddingTop: spacing.medium }} />
                <Text text="Tenant" style={{ fontFamily: typography.primary.normal, opacity: 0.4, fontSize: 14 }} />
              </View>
              <View style={{}}>
                <Text text="Message" style={{ opacity: 0.4, fontSize: 13, fontFamily: typography.primary.normal }} />
                <Text style={{ fontFamily: typography.primary.normal, fontSize: 13, lineHeight: 25 }} text="I am interested in Modern Apartment With A Lot Of Space And Direct View Of The Naschmarkt , Rechte Wienzeile 5, 1040 Vienna, Austria." />


              </View>
              <View style={{ marginTop: 8 }}>
                <Text text="Sent at" style={{ opacity: 0.4, fontSize: 13, fontFamily: typography.primary.normal }} />
                <Text style={{ fontFamily: typography.primary.normal, fontSize: 13, }} text="Yesterday, 9:01 PM" />


              </View>
            </View>
          )}
        />
        <View style={{ flexGrow: 1.5, justifyContent: "center", flexDirection: "row" }}>
          <View style={{ alignItems: "center" }}>
            <View style={{
              justifyContent: "center", alignItems: "center", borderRadius: 100,
              width: 52, height: 52, backgroundColor: colors.black,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 2,
            }}>
              <MaterialCommunityIcons name="close" size={28} color="white" />

            </View>
          </View>

          <View style={{ width: 50 }} />
          <View style={{ alignItems: "center" }}>
            <View style={{
              justifyContent: "center", alignItems: "center", borderRadius: 100,
              width: 52, height: 52, backgroundColor: colors.white,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 2,
            }}>
              <MaterialCommunityIcons name="heart" size={28} color="red" />
            </View>
          </View>



        </View>
        {/* <View style={{ flexGrow: 1.3, justifyContent: "center", flexDirection: "row" }}>
          <View style={{
            justifyContent: "center", alignItems: "center", borderRadius: 100,
            width: 65, height: 65, backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }}>
            <MaterialCommunityIcons name="close" size={40} color="#F7090E" />

          </View>
          <View style={{ width: 90 }} />
          <View style={{
            justifyContent: "center", alignItems: "center", borderRadius: 100,
            width: 65, height: 65, backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }}>
            <MaterialCommunityIcons name="check" size={39} color="#27CF6A" />
          </View>
        </View> */}
        {/* <Swiper
          cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
          renderCard={(card) => {
            return (
              <View style={{
                backgroundColor: colors.white,
                borderRadius: 6,
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
                <Text text="APPLIED FOR" style={{ color: colors.black, opacity: 0.4, fontSize: 12, fontFamily: typography.primary.medium }} />
                <View style={{ marginTop: 3, flexDirection: "row", alignItems: "center" }}>
                  <Image resizeMode="center" source={gallery} style={{ width: 65, height: 45, borderRadius: 5 }} />
                  <View style={{ flexDirection: "column", flexShrink: 1, paddingHorizontal: 7 }}>
                    <Text text="Apartment" style={{ fontSize: 13, color: colors.palette.primary100, fontFamily: typography.primary.medium }} />
                    <Text style={{ fontSize: 13 }} text="Modern Apartment With A Lot Of Space And Direct View Of The Naschmarkt" numberOfLines={1} />
                  </View>
                </View>
                <View style={{ height: 1, backgroundColor: colors.lightgrey, opacity: 0.3, marginTop: 5 }} />
                <View style={{ marginVertical: spacing.large, alignItems: "center" }}>
                  <View style={{ alignItems: "center", justifyContent: "center", borderRadius: 100, backgroundColor: colors.palette.primary100, width: 100, height: 100 }}>
                    <Text style={{ fontSize: 40, lineHeight: 50, color: colors.white, paddingTop: 5 }} text="AI" />
                  </View>
                  <Text text="Abdulquadri Adedayo Ismail" style={{ fontFamily: typography.primary.semiBold, paddingTop: spacing.small }} />
                  <Text text="Tenant" style={{ fontFamily: typography.primary.normal, opacity: 0.4, fontSize: 14 }} />
                </View>
                <View style={{}}>
                  <Text text="MESSAGE" style={{ opacity: 0.4, fontSize: 14, fontFamily: typography.primary.normal, paddingBottom: 4 }} />
                  <Text style={{ fontFamily: typography.primary.normal, fontSize: 14, lineHeight: 25 }} text="I am interested in Modern Apartment With A Lot Of Space And Direct View Of The Naschmarkt , Rechte Wienzeile 5, 1040 Vienna, Austria." />


                </View>
              </View>
            )
          }}

          onSwiped={(cardIndex) => { console.log(cardIndex) }}
          onSwipedAll={() => { console.log('onSwipedAll') }}
          cardIndex={0}
          backgroundColor={colors.white}
          stackSize={3}>

          <View style={{ position: "absolute", bottom: 40, left: 0, right: 0, justifyContent: "center", flexDirection: "row" }}>
            <View style={{ alignItems: "center" }}>
              <View style={{
                justifyContent: "center", alignItems: "center", borderRadius: 100,
                width: 60, height: 60, backgroundColor: colors.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 2,
              }}>
                <MaterialCommunityIcons name="close" size={37} color="#F7090E" />

              </View>
              <Text text='REJECT' style={{ fontFamily: typography.primary.medium, fontSize: 14, paddingTop: 6 }} />
            </View>

            <View style={{ width: 90 }} />
            <View style={{ alignItems: "center" }}>
              <View style={{
                justifyContent: "center", alignItems: "center", borderRadius: 100,
                width: 60, height: 60, backgroundColor: colors.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 2,
              }}>
                <MaterialCommunityIcons name="check" size={37} color="#27CF6A" />
              </View>
              <Text text='ACCEPT' style={{ fontFamily: typography.primary.medium, fontSize: 14, paddingTop: 6 }} />
            </View>



          </View>
        </Swiper> */}

        {/* <View style={{
          backgroundColor: colors.white,
          borderRadius: 6,
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
          <Text text="APPLIED FOR" style={{ color: colors.black, opacity: 0.4, fontSize: 12, fontFamily: typography.primary.medium }} />
          <View style={{ marginTop: 3, flexDirection: "row", alignItems: "center" }}>
            <Image resizeMode="center" source={gallery} style={{ width: 65, height: 45, borderRadius: 5 }} />
            <View style={{ flexDirection: "column", flexShrink: 1, paddingHorizontal: 7 }}>
              <Text text="Apartment" style={{ fontSize: 13, color: colors.palette.primary100, fontFamily: typography.primary.medium }} />
              <Text style={{ fontSize: 13 }} text="Modern Apartment With A Lot Of Space And Direct View Of The Naschmarkt" numberOfLines={1} />
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: colors.lightgrey, opacity: 0.3, marginTop: 5 }} />
          <View style={{ marginVertical: spacing.large, alignItems: "center" }}>
            <View style={{ alignItems: "center", justifyContent: "center", borderRadius: 100, backgroundColor: colors.palette.primary100, width: 100, height: 100 }}>
              <Text style={{ fontSize: 40, lineHeight: 50, color: colors.white }} text="AI" />
            </View>
            <Text text="Abdulquadri Adedayo Ismail" style={{ fontFamily: typography.primary.semiBold, paddingTop: spacing.small }} />
            <Text text="Tenant" style={{ fontFamily: typography.primary.normal, opacity: 0.4, fontSize: 14 }} />
          </View>
          <View style={{}}>
            <Text text="MESSAGE" style={{ opacity: 0.4, fontSize: 14, fontFamily: typography.primary.normal, paddingBottom: 4 }} />
            <Text style={{ fontFamily: typography.primary.normal, fontSize: 14, lineHeight: 25 }} text="I am interested in Modern Apartment With A Lot Of Space And Direct View Of The Naschmarkt , Rechte Wienzeile 5, 1040 Vienna, Austria." />


          </View>
        </View>

        <View style={{ marginTop: 32, justifyContent: "center", flexDirection: "row" }}>
          <View style={{
            justifyContent: "center", alignItems: "center", borderRadius: 100,
            width: 60, height: 60, backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }}>
            <MaterialCommunityIcons name="close" size={37} color="#F7090E" />

          </View>
          <View style={{ width: 90 }} />
          <View style={{
            justifyContent: "center", alignItems: "center", borderRadius: 100,
            width: 60, height: 60, backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }}>
            <MaterialCommunityIcons name="check" size={37} color="#27CF6A" />
          </View>
        </View> */}
      </View>
    )
  },
)

const $root: ViewStyle = {
  paddingTop: 50,
  flex: 1
}

