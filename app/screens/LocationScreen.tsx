import { observer } from "mobx-react-lite"
import { MotiView } from "moti"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { ViewStyle } from "react-native"
import { PropertyField, Screen, SmallLabel } from "../components"
import { useStores } from "../models"
import { colors, spacing } from "../theme"

export interface ILocation {
  name: string
  city: string
  address: string
}

export const LocationScreen = observer(function LocationScreen() {
  const {
    propertyStoreModel: { setPropertyLocation, address, city, name },
  } = useStores()

  const { control, watch, getValues } = useForm<ILocation>({
    defaultValues: {
      name,
      city,
      address,
    },
  })

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

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <PropertyField label="City*" value={value} onChange={onChange} />
          )}
          name="city"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <PropertyField label="Street Address*" value={value} onChange={onChange} />
          )}
          name="address"
        />

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
