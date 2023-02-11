import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { observer } from "mobx-react-lite"
import React, { useMemo, useRef } from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { navigate } from "../navigators"
import { colors, typography } from "../theme"
import { currencyFormat } from "../utils"
import { Button } from "./Button"
import { Text } from "./Text"
import { UserLabel } from "./UserLabel"

export interface PaymentItemProps {
  style?: StyleProp<ViewStyle>
  item: FirebaseFirestoreTypes.DocumentData
}

export const PaymentItem = observer(function PaymentItem(props: PaymentItemProps) {
  const { item } = props

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ["10%", "60%"], [])

  const paidOn: Date = item?.created.toDate()

  const date = `${paidOn.getFullYear()}-${paidOn.getMonth() + 1}-${paidOn.getDate()}`

  const handleCard = (payment: FirebaseFirestoreTypes.DocumentData) => {
    bottomSheetModalRef.current?.present()
  }

  const handleView = (property_id: string) => {
    navigate("ListingDetails", { id: property_id })
    bottomSheetModalRef.current?.close()
  }
  return (
    <>
      <Pressable onPress={() => handleCard(item)}>
        <View style={$container}>
          <FastImage
            style={$image}
            source={{
              uri: item?.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={$infoContainer}>
            <Text style={$infoHeading} numberOfLines={2} text={item?.description} />
            <View style={$infoTag}>
              <Text style={$tag} numberOfLines={1} text={item?.status} />
            </View>
            <Text style={$infoAmount} numberOfLines={1} text={currencyFormat(item?.amount)} />
          </View>
        </View>
      </Pressable>

      <BottomSheetModal
        backdropComponent={BottomSheetBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <View style={$modalContainer}>
          <View>
            <Text text="Description" style={$label} />
            <Text style={$message} text={item?.description} />
            <Text text="Amount" style={$label} />
            <Text style={$message} text={currencyFormat(item?.amount)} />
            <Text text="Tenant" style={$label} />
            <UserLabel tenant_id={item?.tenant_id} />
            <Text text="Date" style={$label} />
            <Text style={$message} text={date} />
            <Text text="Status" style={$label} />
            <Text style={$message} text={item?.status} />
          </View>
          <View>
            <Button
              onPress={() => handleView(item?.property_id)}
              textStyle={$buttonLabel}
              style={$button}
              text="View Property"
            />
          </View>
        </View>
      </BottomSheetModal>
    </>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: 4,
  paddingVertical: 3,
  flexDirection: "row",
  alignItems: "center",
  borderRadius: 5,
  backgroundColor: colors.white,
  marginVertical: 5,
}

const $image: ImageStyle = {
  borderRadius: 5,
  width: 85,
  height: 90,
}
const $infoContainer: ViewStyle = {
  flexDirection: "column",
  justifyContent: "center",
  flexShrink: 1,
  paddingLeft: 10,
}
const $infoHeading: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  lineHeight: 20,
}
const $infoTag: ViewStyle = {
  width: 40,
  marginVertical: 5,
  borderRadius: 7,
  backgroundColor: colors.palette.secondary100,
}
const $tag: TextStyle = {
  textAlign: "center",
  color: colors.white,
  fontSize: 12,
  fontFamily: typography.primary.normal,
}
const $infoAmount: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: colors.palette.primary100,
}

const $modalContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: 10,
}
const $message: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 15,
  lineHeight: 25,
}

const $button: ViewStyle = {
  borderWidth: 0,
  borderRadius: 30,
  marginTop: 18,
  backgroundColor: colors.palette.primary50,
}
const $buttonLabel: TextStyle = {
  color: "white",
  fontFamily: typography.primary.semiBold,
}
const $label: TextStyle = {
  fontSize: 14,
  opacity: 0.5,
  marginTop: 10,
  fontFamily: typography.primary.normal,
}
