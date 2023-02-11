import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export interface IProperty {
  propertySize: number | undefined
  avaliableBedroom: number | undefined
  roomSize: number | undefined
  avaliableBathroom: number | undefined
  propertyType: string
  rules: string[]
  amenities: string[]
}
export const PropertyStoreModel = types
  .model("PropertyStore")
  .props({
    name: "",
    city: "",
    short_code: "",
    address: "",
    propertySize: types.maybe(types.number),
    avaliableBedroom: 0,
    roomSize: types.maybe(types.number),
    avaliableBathroom: 0,
    propertyType: "",
    rules: types.array(types.string),
    cityLocation: types.array(types.number),
    addresssLocation: types.array(types.number),
    amenities: types.array(types.string),
    cost: types.maybe(types.number),
    description: "",
    localImages: types.array(types.string),
    remoteImages: types.array(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get isLocationFormValid() {
      const isSet: boolean = !!self.name && !!self.city && !!self.address
      return isSet
    },
    get isPropertyFormValid() {
      // console.log(self.roomSize)
      const isSet: boolean =
        self.propertySize !== 0 &&
        self.propertySize !== undefined &&
        self.avaliableBedroom !== 0 &&
        self.roomSize !== undefined &&
        self.roomSize !== 0 &&
        self.avaliableBathroom !== 0 &&
        self.propertyType !== "" &&
        self.rules.length > 0 &&
        self.amenities.length > 0
      return isSet
    },
    get isMediaFormValid() {
      const isSet: boolean =
        self.localImages.length > 1 &&
        self.cost !== undefined &&
        self.cost > 0 &&
        self.description !== ""
      return isSet
    },
    get propertyData() {
      return [
        self.name,
        self.city,
        self.address,
        self.propertySize,
        self.avaliableBathroom,
        self.roomSize,
        self.avaliableBedroom,
        self.propertyType,
        self.cost,
        self.description,
      ]
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    reset() {
      ; (self.name = ""),
        (self.city = ""),
        (self.short_code = ""),
        (self.address = ""),
        (self.propertySize = undefined),
        (self.avaliableBedroom = 0),
        (self.roomSize = undefined),
        (self.avaliableBathroom = 0),
        (self.propertyType = ""),
        (self.rules = undefined),
        (self.cityLocation = undefined),
        (self.addresssLocation = undefined),
        (self.amenities = undefined),
        (self.cost = undefined),
        (self.description = ""),
        (self.localImages = undefined),
        (self.remoteImages = undefined)
    },
    setCity(city: string, location: string, shortCode: string) {
      self.city = city
      const lat = +location.split(",")[0]
      const lon = +location.split(",")[1]
      self.cityLocation.clear()
      self.cityLocation.push(lat, lon)
      self.short_code = shortCode
    },

    setAddresss(address: string, location: string) {
      self.address = address
      const lat = +location.split(",")[0]
      const lon = +location.split(",")[1]
      self.addresssLocation.clear()
      self.addresssLocation.push(lat, lon)
    },

    setPropertyName(name: string) {
      self.name = name
    },
    setPropertySize(size: number) {
      self.propertySize = size
    },
    setAvaliableBedroom(avaliableBedroom: number) {
      self.avaliableBedroom = avaliableBedroom
    },
    setRoomSize(size: number) {
      self.roomSize = size
    },
    setAvaliableBathroom(avaliableBathroom: number) {
      self.avaliableBathroom = avaliableBathroom
    },
    setPropertyType(propertyType: string) {
      self.propertyType = propertyType
    },
    addRules(rules: string) {
      self.rules.push(rules)
    },
    removeRules(rules: string) {
      self.rules.remove(rules)
    },
    addAmenities(amenities: string) {
      self.amenities.push(amenities)
    },
    removeAmenities(amenities: string) {
      self.amenities.remove(amenities)
    },
    setCost(cost: number) {
      self.cost = cost
    },
    setDescription(description: string) {
      self.description = description
    },
    addLocalImages(localImages: string) {
      self.localImages.push(localImages)
    },
    removeLocalImageAtPosition(position: string) {
      const index = self.localImages.indexOf(position)
      self.localImages.splice(index, 1)
    },
    addRemoteImages(remoteImages: string) {
      self.remoteImages.push(remoteImages)
    },
    removeRemoteImages() {
      self.remoteImages.clear()
      // self.localImages.push(localImages)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PropertyStore extends Instance<typeof PropertyStoreModel> { }
export interface PropertyStoreSnapshotOut extends SnapshotOut<typeof PropertyStoreModel> { }
export interface PropertyStoreSnapshotIn extends SnapshotIn<typeof PropertyStoreModel> { }
export const createPropertyStoreDefaultModel = () => types.optional(PropertyStoreModel, {})
