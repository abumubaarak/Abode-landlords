import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { colors, typography } from "../theme"
import { Card } from "./Card"

import { ListingTag } from "./ListingTag"
import { Text } from "./Text"

export interface ListingCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: any
}

const RADIUS = 10

export const ListingCard = observer(function ListingCard(props: ListingCardProps) {
  const { item } = props
  const data = item
  const navigation = useNavigation()

  return (
    <Pressable onPress={() => navigation.navigate("ListingDetails", { id: item.id })}>
      <Card
        preset="default"
        style={$container}
        HeadingComponent={
          <FastImage
            style={$cardImage}
            source={{
              uri: data.remoteImages[0],
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        }
        ContentComponent={
          <View style={$contentContainer}>
            <Text style={$labelHeading} text={data.name} numberOfLines={1} />

            <Text style={$labelSubHeading} text={data.address} numberOfLines={1} />

            <View style={$tagContainer}>
              <ListingTag
                label={`${data.avaliableBedroom} Bed`}
                icon={<Ionicons name="ios-bed" size={16} color={colors.gray100} />}
              />

              <ListingTag
                label={`${data.avaliableBathroom} Bath`}
                icon={
                  <MaterialCommunityIcons name="bathtub-outline" size={16} color={colors.gray100} />
                }
              />

              <ListingTag
                label={`${data.propertySize} sqft`}
                icon={
                  <MaterialCommunityIcons name="vector-square" size={16} color={colors.gray100} />
                }
              />
            </View>

            <View style={$priceContainer}>
              <Text text={`$${data.cost}`} style={$priceLabel} />
              <Text style={$pricePer} text=" /year" />
            </View>
          </View>
        }
      />
    </Pressable>
  )
})

const $container: ViewStyle = {
  padding: 0,
  borderRadius: RADIUS,
  borderWidth: 0,
}

const $cardImage: ImageStyle = {
  height: 180,
  width: "100%",
  borderTopLeftRadius: RADIUS,
  borderTopRightRadius: RADIUS,
}

const $contentContainer: ViewStyle = {
  paddingHorizontal: 9,
  paddingTop: 10,
}

const $labelHeading: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
}

const $labelSubHeading: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  opacity: 0.5,
}

const $tagContainer: TextStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 2,
  paddingRight: 10,
}

const $priceContainer: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 3,
}

const $priceLabel: TextStyle = {
  color: colors.palette.primary200,
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
}

const $pricePer: TextStyle = {
  fontSize: 10,
  color: colors.gray,
  fontFamily: typography.primary.medium,
}
