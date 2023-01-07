import { MaterialCommunityIcons } from '@expo/vector-icons'
import { observer } from "mobx-react-lite"
import React, { memo } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "../theme"


export interface RequestActionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,

}

/**
 * Describe your component here
 */
const RequestAction = observer(function RequestAction(props: RequestActionProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={{ flexGrow: 1.5, justifyContent: "center", flexDirection: "row" }}>
      <View style={{ alignItems: "center" }}>
        <View style={{
          justifyContent: "center", alignItems: "center", borderRadius: 100,
          width: 52, height: 52, backgroundColor: colors.black,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 2,
        }}>
          <MaterialCommunityIcons name="close" size={28} color="white" />

        </View>
      </View>

      <View style={{ width: 50 }} />
      <View style={{ alignItems: "center" }}>
        <View style={{
          justifyContent: "center", alignItems: "center", borderRadius: 100,
          width: 52, height: 52, backgroundColor: colors.white,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 2,
        }}>
          <MaterialCommunityIcons name="heart" size={28} color="red" />
        </View>
      </View>



    </View>
  )
})

export default memo(RequestAction)

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}

