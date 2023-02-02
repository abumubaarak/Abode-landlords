import { Ionicons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Dimensions, Pressable, View, ViewStyle } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { FlatGrid } from "react-native-super-grid"
import {
  GalleryCallout,
  GalleryImage,
  Icon,
  PropertyField,
  Screen,
  SlideIn,
  Text,
} from "../components"
import { useStores } from "../models"
import { colors, spacing } from "../theme"

export interface IMedias {
  cost: number | undefined
  description: string
  images: string[]
}
export const PropertyMediaScreen = observer(function PropertyMediaScreen() {
  const { control, watch, getValues } = useForm<IMedias>()

  const deviceWith = Dimensions.get("window").width

  const [fileUploaded, setFileUploaded] = useState<boolean>(false)

  const {
    propertyStoreModel: {
      setCost,
      addLocalImages,
      removeLocalImageAtPosition,
      setDescription,
      cost: pCost,
      description,
      localImages,
    },
  } = useStores()

  useEffect(() => {
    const { cost } = getValues()

    if (Number.isInteger(+cost)) setCost(+cost)
  }, [watch("cost")])

  useEffect(() => {
    if (!fileUploaded) return

    if (localImages.includes("select")) {
      removeLocalImageAtPosition("select")

      addLocalImages("select")
    } else {
      addLocalImages("select")
    }

    setFileUploaded(false)
  }, [fileUploaded])

  const lauchGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 5,
    })

    const assets = result.assets

    assets.map((i) => {
      addLocalImages(i.uri)
    })
    if (localImages.length > 0) setFileUploaded(true)
  }
  return (
    <SlideIn>
      <Screen style={$root} preset="scroll">
        <Text text="Add some photos" preset="formLabel" style={$somePhoto} />
        {localImages.length <= 1 ? (
          <Pressable onPress={lauchGallery}>
            <GalleryCallout />
          </Pressable>
        ) : (
          <FlatGrid
            itemDimension={deviceWith / 4}
            data={localImages}
            style={$gridStyle}
            renderItem={({ item }) =>
              item === "select" ? (
                <Pressable key={"select"} onPress={lauchGallery}>
                  <View style={[$addMoreContainer, { width: deviceWith / 3.8 }]}>
                    <View style={$iconContainer}>
                      <View style={$iconView}>
                        <Icon icon="add" style={$icon} />
                      </View>
                    </View>
                    <View style={$cameraContainer}>
                      <Ionicons name="camera-outline" size={37} color="black" />
                    </View>
                  </View>
                </Pressable>
              ) : (
                <GalleryImage url={item} />
              )
            }
          />
        )}

        <View style={$formContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <PropertyField
                keyboardType="numeric"
                label="What's the monthly rent?"
                value={String(pCost ?? "")}
                onChange={onChange}
              />
            )}
            name="cost"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={() => (
              <PropertyField
                placeholderTextColor={colors.lightgrey}
                placeholder={`How is the atmosphere in the flat? \nWhat do you value in a tenant? describe the flat and rent it out faster!`}
                multiline={true}
                label="Add a description"
                value={description}
                onChange={setDescription}
              />
            )}
            name="description"
          />
        </View>
      </Screen>
    </SlideIn>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
}

const $somePhoto = {
  marginTop: 20,
  fontSize: 20,
  paddingLeft: spacing.large,
}

const $gridStyle = {
  marginHorizontal: 19,
}
const $addMoreContainer: ViewStyle = {
  marginTop: 10,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 5,
  height: 96,
}
const $icon = {
  tintColor: colors.palette.primary100,
  width: 16,
  height: 16,
}

const $iconView: ViewStyle = {
  borderRadius: 100,
  height: 20,
  justifyContent: "center",
  alignItems: "center",
  width: 20,
  borderColor: colors.palette.primary100,
  borderWidth: 1,
}

const $cameraContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  marginTop: 5,
}

const $iconContainer: ViewStyle = {
  alignItems: "flex-end",
  paddingTop: 5,
  paddingRight: 5,
}

const $formContainer: ViewStyle = {
  paddingLeft: spacing.large,
  paddingRight: spacing.large,
  paddingBottom: 20,
}
