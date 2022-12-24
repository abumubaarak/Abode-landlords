// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"

import {
  Poppins_300Light as poppinsLight,
  Poppins_400Regular as poppinsRegular,
  Poppins_500Medium as poppinsMedium,
  Poppins_600SemiBold as poppinsSemiBold,
  Poppins_700Bold as poppinsBold,
} from "@expo-google-fonts/poppins"
export const customFontsToLoad = {
  poppinsLight,
  poppinsRegular,
  poppinsMedium,
  poppinsSemiBold,
  poppinsBold,
}

const fonts = {
  poppins: {
    // Cross-platform Google font.
    light: "poppinsLight",
    normal: "poppinsRegular",
    medium: "poppinsMedium",
    semiBold: "poppinsSemiBold",
    bold: "poppinsBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.poppins,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
