import React from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../text/text"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: 6,
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.palette.greyishBrown,
  minHeight: 35,
  fontSize: 16,
  letterSpacing: 0,
  backgroundColor: color.palette.white,
  width: "100%",
  marginTop: 7,
  borderRadius: 4,
  paddingLeft: 11,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The Placeholder text
   */
  placeholder?: string

  /**
   * The label text
   */
  label?: string

  /**
   * The label text if no labelTx is provided.
   */
  labelStyle?: StyleProp<TextStyle>

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholder,
    label,
    labelStyle,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const inputStyles = [INPUT, inputStyleOverride]

  return (
    <View style={containerStyles}>
      <Text preset="fieldLabel" text={label} style={labelStyle} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={color.palette.lighterGrey}
        underlineColorAndroid={color.transparent}
        autoCapitalize="none"
        {...rest}
        style={inputStyles}
        ref={forwardedRef}
      />
    </View>
  )
}
