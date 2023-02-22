const { async } = require("regenerator-runtime")
const { reloadApp } = require("./reload")

describe("Main", () => {
  beforeEach(async () => {
    await reloadApp()
  })

  it("should render listing screen", async () => {
    await expect(element(by.id("listings"))).toBeVisible()
  })
})
