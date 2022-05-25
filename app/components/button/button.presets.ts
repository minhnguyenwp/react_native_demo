import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[3],
  paddingHorizontal: spacing[6],
  borderRadius: 100,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  fontSize: 16,
  lineHeight: 18,
  textAlign: "center",
  fontFamily: 'ProximaNovaA-Bold'
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.white } as ViewStyle,
  green: { ...BASE_VIEW, backgroundColor: color.palette.aquaGreen } as ViewStyle,
  greyOutline: { ...BASE_VIEW, borderWidth: 1, borderColor: color.palette.white4 } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as ViewStyle,
}

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: {
    ...BASE_TEXT,
    color: color.palette.greyishBrown,
  } as TextStyle,
  green: {
    ...BASE_TEXT,
    color: color.text,
    letterSpacing: 1,
  } as TextStyle,
  greyOutline: {
    ...BASE_TEXT,
    fontSize: 13,
    lineHeight: 14,
    letterSpacing: 0.5,
    color: color.palette.greyishBrown,
  } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
