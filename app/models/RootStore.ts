import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PropertyStoreModel } from "./PropertyStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  propertyStoreModel: types.optional(PropertyStoreModel, {}), // @demo remove-current-line
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
