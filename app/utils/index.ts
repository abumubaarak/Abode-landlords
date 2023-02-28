export const avatarName = (displayName: string) => {
  const splitDisplayName = displayName?.split(" ")
  return splitDisplayName ? splitDisplayName[0][0] + splitDisplayName[1][0] : ""
}
export const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export const currencyFormat = (value: string) => {
  const amount: number = +value
  return "$" + amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
export const capitalizeFirstLetter = (value: string) => {
  return value?.charAt(0)?.toUpperCase() + value?.slice(1);
}