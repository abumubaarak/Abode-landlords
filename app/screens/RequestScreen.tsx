import auth from "@react-native-firebase/auth"
import { StackScreenProps } from "@react-navigation/stack"
import { DocumentData } from "firebase/firestore"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import Carousel from "react-native-snap-carousel"
import { Empty, Loader, RequestItem } from "../components"
import RequestAction from "../components/RequestAction"
import useFirestore from "../hooks/useFirestore"
import { AppStackScreenProps } from "../navigators"
import { Messages } from "../services/api"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const RequestScreen: FC<StackScreenProps<AppStackScreenProps, "Request">> = observer(
  function RequestScreen() {
    const HORIZONTAL_MARGIN = 15

    const sliderWidth = Dimensions.get("window").width
    const itemWidth = sliderWidth - 100 + HORIZONTAL_MARGIN * 2
    const [activeItem, setActiveItem] = useState<DocumentData>()

    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const { tenantRequest, isLoading, data } = useFirestore()

    useEffect(() => {
      tenantRequest("lid", auth().currentUser.uid)
    }, [])

    useEffect(() => {
      if (data.length === 1) {
        setActiveItem(data[0])
      }
    }, [data])

    const handleOnSnapToItem = (positon: number) => {
      setActiveItem(data[positon])
    }

    const requestInfo = (): Omit<Messages, "_id" | "__v" | "sentAt"> => {
      return {
        tenant_id: activeItem?.tid,
        landlord_id: activeItem?.lid,
        message: activeItem?.message,
        property_id: activeItem?.pId,
        tenant_name: activeItem?.tName,
        landlord_name: auth()?.currentUser?.displayName,
      }
    }

    if (isLoading) return <Loader />
    if (data.length === 0) return <Empty message="No pending request." />
    return (
      <View style={$root}>
        <Carousel
          vertical={false}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={$carouselContainer}
          activeSlideAlignment="center"
          inactiveSlideScale={0.93}
          inactiveSlideOpacity={1}
          onSnapToItem={handleOnSnapToItem}
          data={data}
          renderItem={({ item }) => <RequestItem item={item} />}
        />

        {data.length > 0 && <RequestAction requestId={activeItem?.id} messages={requestInfo()} />}
      </View>
    )
  },
)

const $root: ViewStyle = {
  paddingTop: 30,
  flex: 1,
}

const $carouselContainer: ViewStyle = { flexGrow: 2 }
