import { observer } from "mobx-react-lite"
import React, { memo } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { AMENITIES, houseRules } from "../data"
import { typography } from "../theme"
import { Text } from "./Text"

export interface ListingAmentiesTagProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: string[]
  type: "amenities" | "rules"
}

/**
 * Describe your component here
 */
const LisitingFeaturesTag = observer(function ListingAmentiesTag(props: ListingAmentiesTagProps) {
  const { item, type } = props

  const data = type === "amenities" ? AMENITIES : houseRules

  return (
    <>
      <View style={$container}>
        {item?.map((tag, index) => (
          <View
            key={tag}
            style={[$tagContainer, { paddingBottom: index !== item.length - 1 ? 22 : 8 }]}
          >
            {data?.filter((item) => item.tag === tag)[0].icon}
            <Text text={data?.filter((item) => item.tag === tag)[0].name} style={$tagLabel} />
          </View>
        ))}
      </View>
    </>
  )
})

export default memo(LisitingFeaturesTag)

const $container: ViewStyle = {
  alignItems: "flex-start",
  justifyContent: "flex-start",
  marginTop: 8,
}
const $tagContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginRight: 15,
}

const $tagLabel: TextStyle = {
  fontFamily: typography.primary.light,
  paddingLeft: 10,
}
