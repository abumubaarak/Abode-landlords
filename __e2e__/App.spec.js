const { async } = require("regenerator-runtime")
const { reloadApp } = require("./reload")

describe("Main", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should render listing screen", async () => {
    await expect(element(by.id("listings"))).toBeVisible()
  })

  it("should render add listing screen", async () => {
    await element(by.id("add-icon")).tap()
    await expect(element(by.id("step"))).toBeVisible()
    await expect(element(by.id("listing-name"))).toBeVisible()
    await element(by.id("close")).tap()
  })

  it("should render listing details screen", async () => {
    await element(by.id("listing-card")).atIndex(0).tap()
    await element(by.id('swipe')).atIndex(0).swipe('left');
    await element(by.id('swipe')).atIndex(1).swipe('left');
    await expect(element(by.id("listing-title"))).toBeVisible()
  })
})
