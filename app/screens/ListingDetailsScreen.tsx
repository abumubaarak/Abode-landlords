import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { RouteProp, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { Carousel, Pagination } from "react-native-snap-carousel"
import { ListingTag, Occupied, Screen, Text } from "../components"
import LisitingFeaturesTag from "../components/LisitingFeaturesTag"
import { Loader } from "../components/Loader"
import useFirestore from "../hooks/useFirestore"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { colors, typography } from "../theme"
import { PROPERTY } from "../utils/firebase"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ListingDetailsScreen: FC<StackScreenProps<AppStackScreenProps, "ListingDetails">> =
  observer(function ListingDetailsScreen() {
    const sliderWidth = Dimensions.get("window").width
    const route = useRoute<RouteProp<AppStackParamList, "ListingDetails">>()
    const params = route.params
    const { getDocument, document, isLoading } = useFirestore()
    const [activeSlide, setActiveSlide] = useState<number>(0)

    useEffect(() => {
      getDocument(PROPERTY, params.id)
    }, [])

    if (isLoading) return <Loader />

    return (
      <View style={$root}>
        <Screen preset="auto" style={$contentContainer}>
          <Carousel
            vertical={false}
            sliderWidth={sliderWidth}
            itemWidth={sliderWidth}
            activeSlideAlignment="start"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            onSnapToItem={(index) => setActiveSlide(index)}
            data={document?.remoteImages}
            renderItem={({ item }) => (
              <FastImage
                style={$slidingImage}
                source={{
                  uri: item,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
          />
          <Pagination
            dotsLength={document?.remoteImages?.length}
            dotContainerStyle={{ height: 0 }}
            activeDotIndex={activeSlide}
            containerStyle={$paginationContainer}
            dotStyle={$paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />


          <View style={$propertyInfoContainer}>
            <View>
              <Text text={document?.name} preset="subheading" style={$propertyNameLabel} />
              <View style={$tagContainer}>
                <ListingTag
                  label={`${document?.avaliableBedroom} Bedroom`}
                  icon={<Ionicons name="ios-bed" size={16} color={colors.gray100} />}
                />

                <ListingTag
                  label={`${document?.avaliableBathroom} Bathroom`}
                  icon={
                    <MaterialCommunityIcons
                      name="bathtub-outline"
                      size={16}
                      color={colors.gray100}
                    />
                  }
                />

                <ListingTag
                  label={`${document?.propertySize} sqft`}
                  icon={
                    <MaterialCommunityIcons name="vector-square" size={16} color={colors.gray100} />
                  }
                />
              </View>
              <View style={$saContainer}>
                <View style={$priceContainer}>
                  <Text text={`$${document?.cost}`} style={$priceLabel} />
                  <Text style={$pricePer} text="/year" />
                </View>
                <View style={$statusTagContainer}>
                  <Text text={document?.status} style={$statusTag} />
                </View>
              </View>

              {document?.status === "paid" && <Occupied propertyId={document?.id} />}

            </View>

            <Text text="Description" style={$label} />
            <Text style={$propertyInfoLabel} text={document?.description} />

            <Text text="Amenities" style={$label} />
            <LisitingFeaturesTag item={document?.amenities} type="amenities" />

            <Text text="Property Type" style={$label} />
            <Text style={$propertyInfoLabel} text={document?.propertyType} />

            <Text text="Room Size" style={$label} />
            <Text style={$propertyInfoLabel} text={`${document?.roomSize} sqft`} />

            <Text text="Rules" style={$label} />
            <LisitingFeaturesTag item={document?.rules} type="rules" />

            <Text text="Location" style={$label} />
            <Text style={$propertyInfoLabel} text={document?.address} />
          </View>
        </Screen>

      </View>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}
const $contentContainer: ViewStyle = {
  flexBasis: "90%",
}
const $slidingImage: ImageStyle = {
  height: 320,
  width: "100%",
}

const $paginationContainer: ViewStyle = {
  paddingHorizontal: 0,
  marginTop: -47,
}
const $paginationDot: ViewStyle = {
  paddingHorizontal: 0,
  borderRadius: 5,
  height: 8,
  width: 8,
  backgroundColor: colors.white,
}
const $heartIcon: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2,
  height: 40,
  width: 40,
  backgroundColor: colors.white,
  borderRadius: 100,
  alignItems: "center",
  justifyContent: "center",
}

const $wishListContainer: ViewStyle = {
  alignItems: "flex-end",
  marginRight: 20,
  marginTop: -31,
}
const $propertyInfoContainer: ViewStyle = {
  paddingVertical: 20,
  paddingHorizontal: 20,
  marginTop: -17,
}
const $propertyNameLabel: TextStyle = {
  fontSize: 22,
  lineHeight: 27,
  fontFamily: typography.primary.semiBold,
}

const $propertyInfoLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.light,
  paddingTop: 6,
}
const $buttonContainer: ViewStyle = {
  paddingHorizontal: 15,
  justifyContent: "center",
  flexBasis: "12%",
  backgroundColor: colors.white,
}
const $label: TextStyle = {
  paddingTop: 15,
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
}
const $tagContainer: TextStyle = {
  flexDirection: "row",
  paddingRight: 30,
  justifyContent: "space-between",
  paddingVertical: 2,
}
const $priceContainer: ViewStyle = {
  flexDirection: "row"
}
const $saContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingTop: 10
}
const $priceLabel: TextStyle = {
  color: colors.palette.primary100,
  fontSize: 19,
  fontFamily: typography.primary.semiBold,
}
const $statusTagContainer: ViewStyle = {
  borderRadius: 5,
  backgroundColor: colors.palette.secondary100,
  marginLeft: 8
}
const $statusTag: TextStyle = {
  fontSize: 13,
  color: colors.white,
  paddingHorizontal: 5,
  fontFamily: typography.primary.normal
}
const $pricePer: TextStyle = {
  fontSize: 14,
  color: colors.gray,
  fontFamily: typography.primary.medium,
}

const $buttonLabel: TextStyle = {
  color: "white",
  fontFamily: typography.primary.semiBold,
}

const $button: ViewStyle = {
  borderWidth: 0,
  borderRadius: 30,
  backgroundColor: colors.palette.primary50,
}

