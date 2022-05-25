import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { color, spacing } from "../../theme"

interface Props {
  msg: string
}

export const ErrorMessage: FC<Props> = ({ msg }) => {
  return (
    <View style={CONTAINER}>
      <Text text={msg} />
    </View>
  )
}

const CONTAINER: ViewStyle = {
  paddingHorizontal: 9,
  paddingVertical: spacing[2],
  borderRadius: 4,
  backgroundColor: color.palette.tomato,
}
