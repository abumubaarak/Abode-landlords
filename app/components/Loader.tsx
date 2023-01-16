import Lottie from "lottie-react-native"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"

export interface LoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Loader = observer(function Loader(_: LoaderProps) {
  return (
    <View style={$container}>
      <Lottie
        style={$lottie}
        source={require("../../assets/lottie/loader.json")}
        autoSize
        autoPlay
        loop
      />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $lottie: ViewStyle = {
  width: 120,
  height: 120,
}
