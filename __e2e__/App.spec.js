const { async } = require("regenerator-runtime")
const { reloadApp } = require("./reload")

describe("Main", () => {
  beforeEach(async () => {
    await reloadApp()
  })



  it("should have get started screen", async () => {
    await expect(element(by.id("getStarted-header"))).toHaveText("Rent out your property\nthe easy way")
    await expect(element(by.id("getStarted-subHeader"))).toBeVisible()
  })
  it("should tap on the get started button", async () => {
    await expect(element(by.id("getStarted-button"))).toBeVisible()
  })
})
