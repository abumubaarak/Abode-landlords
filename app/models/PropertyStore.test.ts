import { PropertyStoreModel } from "./PropertyStore"

test("can be created", () => {
  const instance = PropertyStoreModel.create({})

  expect(instance).toBeTruthy()
})
