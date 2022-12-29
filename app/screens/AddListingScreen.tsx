import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Loader, Screen, Text } from "../components"
import useProperty from "../hooks/useProperty"
import useUpload from "../hooks/useUpload"
import { useStores } from "../models"
import { colors, spacing, typography } from "../theme"

import { LocationScreen } from "./LocationScreen"
import { PropertyInfoScreen } from "./PropertyInfoScreen"
import { PropertyMediaScreen } from "./PropertyMediaScreen"

export interface FormProps {
  isFormValid: (state: boolean) => void
}

export const AddListingScreen = observer(function AddListingScreen() {
  const {
    propertyStoreModel: {
      isLocationFormValid,
      isMediaFormValid,
      isPropertyFormValid,
      localImages,
      remoteImages,
    },
  } = useStores()

  const { upload, imageUploaded } = useUpload()

  const { uploadPropertyData, error, uploaded } = useProperty()

  const navigation = useNavigation()

  const [type, setType] = useState<string>("Location")

  const [isValid, setIsValid] = useState<boolean>(false)

  const [isLoading, setLoading] = useState<boolean>(false)

  const [count, setCount] = useState<number>(1)

  const navigationStateBatch = (position: string, index: number) => {
    setType(position)
    setCount(index)
  }

  useEffect(() => {
    if (localImages.length > 0 && localImages.length - 1 === remoteImages.length) {
      uploadPropertyData()
    }
  }, [imageUploaded])

  useEffect(() => {
    if (uploaded) {
      setLoading(false)
      navigation.goBack()
    }
  }, [uploaded])

  useEffect(() => {
    if (count === 1) {
      setIsValid(isLocationFormValid)
    }
    if (count === 2) {
      setIsValid(isPropertyFormValid)
    }
    if (count === 3) {
      setIsValid(isMediaFormValid)
    }
  }, [isLocationFormValid, isPropertyFormValid, isMediaFormValid])

  const uploadImage = () => {
    setLoading(true)
    localImages.map((i) => i !== "select" && upload(i))
  }

  const handleBack = () => {
    if (count === 2) {
      navigationStateBatch("Location", 1)
    } else if (count === 3) {
      navigationStateBatch("Property", 2)
    }
  }

  const handleContinue = () => {
    if (type === "Location") {
      navigationStateBatch("Property", 2)
    } else if (type === "Property") {
      navigationStateBatch("Media", 3)
    } else if (type === "Media") {
      uploadImage()
    }
  }

  const renderFormType = () => {
    if (type === "Location") {
      return <LocationScreen />
    } else if (type === "Property") {
      return <PropertyInfoScreen />
    } else if (type === "Media") {
      return <PropertyMediaScreen />
    }
  }

  if (isLoading) return <Loader />

  return (
    <Screen
      contentContainerStyle={{ flex: 1 }}
      style={$root}
      preset="fixed"
      safeAreaEdges={["bottom"]}
    >

      <View style={$steperContainer}>
        <Text text={`Step ${count}: ${type}`} style={$steper} />
        <View>
          <View style={$closeView}>
            <Icon icon="x" style={$icon} onPress={() => navigation.goBack()} />
          </View>
        </View>
      </View>

      <View style={$progressContainer}>
        <View style={[$progress, { width: `${count * 33.33}%` }]} />
      </View>

      <View style={[$renderContainer, { paddingHorizontal: type != "Media" ? spacing.large : 0 }]}>
        {renderFormType()}
      </View>

      <View style={$buttonContainer}>
        {type !== "Location" && (
          <Button
            text="Back"
            style={[
              $button,
              {
                backgroundColor: colors.white,
                flexBasis: "47%",
                borderWidth: 1,
              },
            ]}
            onPress={handleBack}
          />
        )}

        <Button
          disabled={!isValid}
          text="Continue"
          style={[
            $button,
            {
              flexBasis: type === "Location" ? "100%" : "47%",
              borderWidth: 0,
              opacity: isValid ? 1 : 0.4,
            },
          ]}
          textStyle={$buttonLabel}
          onPress={handleContinue}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
}

const $closeView: ViewStyle = {
  height: 30,
  width: 30,
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
}
const $buttonLabel: TextStyle = {
  color: "white",
  fontFamily: typography.primary.semiBold,
}

const $button = {
  borderRadius: 30,
  backgroundColor: colors.palette.primary50,
  width: "100%",

  marginVertical: spacing.medium,
}

const $steperContainer: ViewStyle = {
  paddingHorizontal: spacing.medium,
  flexDirection: "row",
  flexGrow: 0,
  paddingTop: 50,
  paddingBottom: 12,
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: colors.palette.secondary100,
}

const $steper = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: colors.white,
}
const $icon = {
  tintColor: "white",
}
const $progressContainer: ViewStyle = {
  width: "100%",
  height: 4.3,
  backgroundColor: "#dadada",
}

const $progress = {
  height: 4.3,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  backgroundColor: colors.palette.primary50,
}
const $renderContainer: ViewStyle = {
  flexGrow: 1,
  paddingTop: spacing.small,
}

const $buttonContainer: ViewStyle = {
  flexBasis: "9.7%",
  flexGrow: 0,
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: 5,
  borderTopWidth: 1,
  borderTopColor: colors.lightgrey,
  paddingHorizontal: spacing.large,
}
