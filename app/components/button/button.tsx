import * as React from "react"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import { color } from "../../theme"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    loading,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    disabled,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const viewStyles = [viewStyle, styleOverride, disabled ? { opacity: 0.5 } : {}]
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text text={text} style={textStyles} />

  return (
    <TouchableOpacity style={viewStyles} disabled={disabled} {...rest}>
      {loading ? <ActivityIndicator color={color.palette.white} /> : content}
    </TouchableOpacity>
  )
}
