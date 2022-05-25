import React from "react"
import { View, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[4],
  alignItems: "center",
  justifyContent: "flex-start",
  position: "relative",
}
const TITLE: TextStyle = {
  fontSize: 20,
  lineHeight: 22,
  fontFamily: "ProximaNovaA-Bold",
  textAlign: "center",
}
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT_BUTTON: ViewStyle = { position: "absolute", left: spacing[4], zIndex: 1 }
const LEFT_ICON: ImageStyle = { width: 41, height: 41 }
const LEFT: ViewStyle = {}
const RIGHT: ViewStyle = {}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon = "back",
    headerText,
    style,
    titleStyle,
  } = props

  return (
    <View style={[ROOT, style]}>
      {leftIcon ? (
        <View style={LEFT_BUTTON}>
          <Button preset="link" onPress={onLeftPress}>
            <Icon icon={leftIcon} style={LEFT_ICON} />
          </Button>
        </View>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={[TITLE, titleStyle]} text={headerText} />
      </View>
      {rightIcon ? (
        <Button preset="link" onPress={onRightPress}>
          <Icon icon={rightIcon} />
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
