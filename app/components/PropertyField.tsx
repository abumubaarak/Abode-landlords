import { observer } from "mobx-react-lite"
import * as React from "react"
import { useState } from "react"
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native"
import { colors } from "../theme"
import { Text } from "./Text"
import { TextField } from "./TextField"

export interface PropertyFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  value: string
  label: string
  onChange: (...event: any[]) => void
  floatingLabel?: boolean
  marginTop?: number
}

/**
 * Describe your component here
 */
export const PropertyField = observer(function PropertyField(props: PropertyFieldProps) {
  const [focus, setFocus] = useState<boolean>()

  const { value, label, marginTop, onChange, floatingLabel, ...TextInputProps } = props
  return (
    <TextField
      value={value}
      label={label}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      RightAccessory={() => floatingLabel && <Text text="ft²" style={$textField} />}
      LabelTextProps={{ style: { fontSize: 20 } }}
      inputWrapperStyle={[
        $inputWrapperStyle,
        {
          borderBottomColor: focus ? colors.palette.primary300 : colors.palette.neutral400,
        },
      ]}
      {...TextInputProps}
      containerStyle={{ marginTop: marginTop ?? 30 }}
      onChangeText={onChange}
    />
  )
})

const $inputWrapperStyle: TextStyle = {
  borderWidth: 1,
  borderRadius: 0,
  paddingLeft: -4,
  marginLeft: -10,
  backgroundColor: colors.white,
  marginTop: -5,
  borderColor: colors.transparent,
  borderBottomColor: colors.palette.neutral400,
  borderBottomWidth: 1,
}

const $textField: ViewStyle = {
  paddingTop: 10,
}
