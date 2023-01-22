import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import React from "react"

const ICON_SIZE = 30
export const houseRules = [
  {
    name: "Family allowed",
    tag: "family",
    icon: <MaterialIcons name="family-restroom" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Noise free",
    tag: "noise",
    icon: <MaterialIcons name="speaker-phone" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Pet friendly",
    tag: "pet",
    icon: <MaterialIcons name="pets" size={ICON_SIZE} color="black" />,
  },
]
export const amenitiesGroupOne = [
  {
    name: "Wifi",
    tag: "wifi",
    icon: <AntDesign name="wifi" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Elevator",
    tag: "elevator",
    icon: <MaterialCommunityIcons name="elevator" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Dryer",
    tag: "dryer",
    icon: <MaterialCommunityIcons name="tumble-dryer" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Furnished",
    tag: "furnished",
    icon: <MaterialCommunityIcons name="chair-school" size={ICON_SIZE} color="black" />,
  },
]
export const amenitiesGroupTwo = [
  {
    name: "Storage",
    tag: "storage",
    icon: <MaterialIcons name="storage" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Gym",
    tag: "gym",
    icon: <MaterialCommunityIcons name="weight-lifter" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Garden",
    tag: "garden",
    icon: <MaterialCommunityIcons name="tree-outline" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Fireplace",
    tag: "fireplace",
    icon: <MaterialCommunityIcons name="fireplace" size={ICON_SIZE} color="black" />,
  },
]
export const amenitiesGroupThree = [
  {
    name: "CCTV",
    tag: "CCTV",
    icon: <MaterialCommunityIcons name="cctv" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Parking",
    tag: "parking",
    icon: <MaterialCommunityIcons name="car-parking-lights" size={ICON_SIZE} color="black" />,
  },
  {
    name: "Pool",
    tag: "pool",
    icon: <MaterialCommunityIcons name="pool" size={ICON_SIZE} color="black" />,
  },
  {
    name: "A.C",
    tag: "A.C",
    icon: <MaterialCommunityIcons name="air-conditioner" size={ICON_SIZE} color="black" />,
  },
]

export const AMENITIES = [
  ...amenitiesGroupOne,
  ...amenitiesGroupTwo,
  ...amenitiesGroupThree,

]
export const propertyTypeOptions = [
  { label: "Room", value: "room" },
  { label: "Apartment", value: "apartment" },
  { label: "Duplex", value: "duplex" },
  { label: "Loft", value: "loft" },
]
