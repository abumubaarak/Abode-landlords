import { observer } from "mobx-react-lite"
import { MotiView } from "moti"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, View, ViewStyle } from "react-native"
import { PropertyField, Screen, SmallLabel, Text } from "../components"
import { useStores } from "../models"
import { navigate } from "../navigators"
import { colors, spacing } from "../theme"

export interface ILocation {
  name: string
  city: string
  address: string
}

export const LocationScreen = observer(function LocationScreen() {
  const {
    propertyStoreModel: {
      setPropertyLocation,
      address,
      city,
      name,
      cityLocation,
      addresssLocation,
    },
  } = useStores()
  const { control, watch, getValues } = useForm<ILocation>({
    defaultValues: {
      name,
      city,
      address,
    },
  })
  console.log(addresssLocation, cityLocation)
  useEffect(() => {
    const { address, city, name } = getValues()
    setPropertyLocation(name, city, address)
  }, [watch("name"), watch("address"), watch("city")])

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      delay={100}
      style={$root}
      transition={{ type: "timing", duration: 300 }}
    >
      <Screen style={$root} preset="scroll">
        <SmallLabel />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <PropertyField label="Give your listing a title*" value={value} onChange={onChange} />
          )}
          name="name"
        />

        <Pressable
          onPress={() => navigate("AutoComplete", { type: "city" })}
          style={$pressableContainer}
        >
          <Text text="City*" preset="formLabel" size="lg" />
          <View style={$pressableItem}>
            <Text text={city} />
          </View>
        </Pressable>

        <Pressable
          onPress={() => navigate("AutoComplete", { type: "address" })}
          style={$pressableContainer}
        >
          <Text text="Street Address*" preset="formLabel" size="lg" />
          <View style={$pressableItem}>
            <Text text={address} />
          </View>
        </Pressable>

        {/* <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <PropertyField label="City*" value={value} onChange={onChange} />
          )}
          name="city"
        /> */}

        {/* <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <PropertyField label="Street Address*" value={value} onChange={onChange} />
          )}
          name="address"
        /> */}

        <SmallLabel
          text="Add all the details to easily find the apartment."
          paddingTop={spacing.medium}
          paddingBottom={spacing.extraLarge}
        />
      </Screen>
    </MotiView>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingTop: 10,
  backgroundColor: colors.white,
}
const $pressableContainer: ViewStyle = {
  marginTop: 30,
}
const $pressableItem: ViewStyle = {
  borderColor: colors.transparent,
  borderBottomColor: colors.palette.neutral400,
  borderBottomWidth: 1,
  paddingBottom: 10,
  height: 45,
  justifyContent: "flex-end",
}
