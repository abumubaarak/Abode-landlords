import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationModel = types
  .model("AuthenticationStore")
  .props({
    displayName: ""
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setdisplayName(name: string) {
      self.displayName = name
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Authentication extends Instance<typeof AuthenticationModel> { }
export interface AuthenticationSnapshotOut extends SnapshotOut<typeof AuthenticationModel> { }
export interface AuthenticationSnapshotIn extends SnapshotIn<typeof AuthenticationModel> { }
export const createAuthenticationDefaultModel = () => types.optional(AuthenticationModel, {})
