export const avatarName = (displayName: string) => {
  const splitDisplayName = displayName?.split(" ")
  return splitDisplayName ? splitDisplayName[0][0] + splitDisplayName[1][0] : ""
}
export const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
