import { Ionicons } from "@expo/vector-icons"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import DatePicker from "react-native-date-picker"
import { Button, PropertyField, Screen, Text } from "../components"
import { Loader } from "../components/Loader"
import { MONTH_NAMES } from "../data"
import useFirestore from "../hooks/useFirestore"
import useUser from "../hooks/useUser"

import { AppStackScreenProps, goBack, navigate } from "../navigators"
import { colors, typography } from "../theme"
import { delay } from "../utils/delay"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
type Verify = {
  profession: string
}
export const VerifyScreen: FC<StackScreenProps<AppStackScreenProps, "Verify">> = observer(
  function VerifyScreen() {
    const [language, setLanguage] = useState<string>()
    const [gender, setGender] = useState<string>()
    const { uid } = useUser()
    const { updateInfo, isLoading } = useFirestore()
    const { control, watch, getValues } = useForm<Verify>({ defaultValues: { profession: "" } })
    const [date, setDate] = useState<Date>()
    const [open, setOpen] = useState(false)
    const formatDate = !date
      ? " "
      : `${MONTH_NAMES[date?.getUTCMonth()]} ${date?.getDay()}, ${date?.getFullYear()}`
    const isDisable = watch("profession") && Boolean(date) && Boolean(language) && Boolean(gender)

    const maxDate = new Date("2004-01-01")

    const handleSave = () => {
      updateInfo(uid, getValues("profession"), date, language, gender).then(() => {
        delay(3000).then(() => goBack())
      })
    }
    console.log(maxDate)
    if (isLoading) return <Loader />
    return (
      <View style={$root}>
        <Screen backgroundColor={colors.white} preset="scroll">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <PropertyField
                marginTop={30}
                keyboardType="numeric"
                label="What's your profession"
                onChange={onChange}
              />
            )}
            name="profession"
          />

          <Pressable onPress={() => setOpen(true)} style={$pressableContainer}>
            <Text text="Date of birth" preset="formLabel" size="lg" />
            <View style={$pressableItem}>
              <Text text={formatDate} />
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigate("SingleSelection", { data: setLanguage, type: "language" })}
            style={$pressableContainer}
          >
            <Text text="What language do you speak?" preset="formLabel" size="lg" />
            <View style={$pressableItem}>
              <View style={$labelContainer}>
                <Text text={language} />
                <Ionicons name="chevron-forward" size={23} color={colors.palette.neutral400} />
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigate("SingleSelection", { data: setGender, type: "gender" })}
            style={$pressableContainer}
          >
            <Text text="Gender" preset="formLabel" size="lg" />
            <View style={$pressableItem}>
              <View style={$labelContainer}>
                <Text text={gender} />
                <Ionicons name="chevron-forward" size={23} color={colors.palette.neutral400} />
              </View>
            </View>
          </Pressable>

          <DatePicker
            modal
            maximumDate={maxDate}
            mode="date"
            open={open}
            date={!date ? maxDate : date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </Screen>

        <View style={$buttonContainer}>
          <Button
            onPress={handleSave}
            disabled={!isDisable}
            text="Save"
            style={[$button, { opacity: !isDisable ? 0.4 : 1 }]}
            textStyle={$buttonLabel}
          />
        </View>
      </View>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
  paddingHorizontal: 15,
}

const $pressableContainer: ViewStyle = {
  marginTop: 30,
}
const $pressableItem: ViewStyle = {
  borderColor: colors.transparent,
  borderBottomColor: colors.palette.neutral400,
  borderBottomWidth: 1,
  paddingBottom: 10,
  height: 50,
  justifyContent: "flex-end",
}
const $labelContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const $buttonContainer: ViewStyle = {
  flexBasis: "12%",
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
