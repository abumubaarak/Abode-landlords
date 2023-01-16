import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextStyle, View, ViewStyle } from "react-native"
import RadioForm from "react-native-simple-radio-button"
import { PropertyField, Screen, SlideIn, SmallLabel, Text } from "../components"
import CircleTag from "../components/CircleTag"
import FormCounter from "../components/FormCounter"
import {
  amenitiesGroupOne,
  amenitiesGroupThree,
  amenitiesGroupTwo,
  houseRules,
  propertyTypeOptions,
} from "../data"
import { useStores } from "../models"
import { colors } from "../theme"

export interface IProperty {
  propertySize: number | undefined
  avaliableBedroom: number | undefined
  roomSize: number | undefined
  avaliableBathroom: number | undefined
  propertyType: string
  rules: string[]
  amenities: string[]
}

export interface IOptions {
  label: string
}

export const PropertyInfoScreen = observer(function PropertyInfoScreen() {
  const {
    propertyStoreModel: {
      setPropertySize,
      setAvaliableBedroom,
      setRoomSize,
      setAvaliableBathroom,
      setPropertyType,
      addRules,
      removeRules,
      addAmenities,
      removeAmenities,
      propertySize: pSize,
      avaliableBedroom,
      roomSize,
      avaliableBathroom,
      propertyType,
      rules,
      amenities,
    },
  } = useStores()

  const { control, watch, getValues } = useForm<IProperty>()

  const handleRules = (tag: string, state: boolean) => {
    if (state) {
      addRules(tag)
    } else {
      removeRules(tag)
    }
  }

  const handleAmenites = (tag: string, state: boolean) => {
    if (state) {
      addAmenities(tag)
    } else {
      removeAmenities(tag)
    }
  }

  useEffect(() => {
    const { propertySize, roomSize } = getValues()
    if (Number.isInteger(+propertySize)) setPropertySize(+propertySize)
    if (Number.isInteger(+roomSize)) setRoomSize(+roomSize)
  }, [watch("propertySize"), watch("roomSize")])

  const onAvaliableBedroomChange = (c: number) => {
    setAvaliableBedroom(c)
  }
  const onAvaliableBathroomChange = (c: number) => {
    setAvaliableBathroom(c)
  }

  return (
    <SlideIn>
      <Screen style={$root} preset="scroll">
        <SmallLabel />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <PropertyField
              floatingLabel={true}
              maxLength={4}
              keyboardType="numeric"
              label="Property size*"
              value={String(pSize ?? "")}
              onChange={onChange}
            />
          )}
          name="propertySize"
        />

        <Text text="How many bedrooms?" preset="formLabel" style={$label} />

        <FormCounter
          label="Bedrooms"
          onChange={onAvaliableBedroomChange}
          value={avaliableBedroom}
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <PropertyField
              marginTop={40}
              floatingLabel={true}
              maxLength={4}
              keyboardType="numeric"
              label="What's the size of the room*"
              value={String(roomSize ?? "")}
              onChange={onChange}
            />
          )}
          name="roomSize"
        />

        <Text text="How many bathrooms?" preset="formLabel" style={[$label, { marginTop: 40 }]} />

        <FormCounter
          label="Bathrooms"
          onChange={onAvaliableBathroomChange}
          value={avaliableBathroom}
        />

        <Text text="Choose the place type" preset="formLabel" style={[$label, { marginTop: 30 }]} />

        <RadioForm
          radio_props={propertyTypeOptions}
          initial={propertyTypeOptions.findIndex((i) => i.value === propertyType)}
          formHorizontal={false}
          labelHorizontal={true}
          borderWidth={1}
          style={{ marginTop: 17 }}
          selectedButtonColor={colors.palette.primary200}
          buttonInnerColor={colors.palette.primary200}
          buttonColor={colors.palette.primary200}
          animation={false}
          onPress={(value) => setPropertyType(value)}
        />

        <Text text="Any there any house rules?" preset="formLabel" style={$label} />

        <View style={$rules}>
          {houseRules.map(({ name, tag, icon }, i) => (
            <CircleTag
              key={i}
              isActive={rules.includes(tag)}
              setTag={handleRules}
              tag={tag}
              label={name}
              icon={icon}
            />
          ))}
        </View>

        <Text text="Choose the amenities" preset="formLabel" style={[$label, { marginTop: 30 }]} />
        <View style={$amenities}>
          {amenitiesGroupOne.map(({ name, tag, icon }, i) => (
            <CircleTag
              key={i}
              isActive={amenities.includes(tag)}
              setTag={handleAmenites}
              tag={tag}
              label={name}
              icon={icon}
            />
          ))}
        </View>

        <View style={$amenities}>
          {amenitiesGroupTwo.map(({ name, tag, icon }, i) => (
            <CircleTag
              key={i}
              isActive={amenities.includes(tag)}
              setTag={handleAmenites}
              tag={tag}
              label={name}
              icon={icon}
            />
          ))}
        </View>

        <View style={[$amenities, { paddingBottom: 30 }]}>
          {amenitiesGroupThree.map(({ name, tag, icon }, i) => (
            <CircleTag
              key={i}
              isActive={amenities.includes(tag)}
              setTag={handleAmenites}
              tag={tag}
              label={name}
              icon={icon}
            />
          ))}
        </View>
      </Screen>
    </SlideIn>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingTop: 10,
  backgroundColor: colors.white,
}

const $label: TextStyle = {
  marginTop: 50,
  fontSize: 20,
}

const $rules: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
}
const $amenities: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginTop: 20,
}
