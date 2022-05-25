import React, { FC, useCallback } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Button, GradientBackground, Icon, Screen, Text } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

export const WelcomeScreen: FC<NativeStackScreenProps<NavigatorParamList, "welcome">> = ({
  navigation,
}) => {
  const onSignInEmail = useCallback(() => {
    navigation.navigate("signup")
  }, [])

  const onLogInEmail = useCallback(() => {
    navigation.navigate("signin")
  }, [])

  return (
    <View style={FULL}>
      <GradientBackground colors={[color.secondary, color.primary, color.primary]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Icon icon="logo" style={LOGO} />
        <Text
          style={TEXT_DESCRIPTION}
          text="Sign in to be able to save your preferences and settings."
        />
        <View>
          <Button style={BUTTON}>
            <Icon icon="apple" style={BUTTON_ICON} />
            <Text style={BUTTON_TITLE} text="Sign in with Apple" />
          </Button>
          <Button style={BUTTON}>
            <Icon icon="facebook" style={BUTTON_ICON} />
            <Text style={BUTTON_TITLE} text="Sign in with Facebook" />
          </Button>
          <Button style={BUTTON}>
            <Icon icon="google" style={BUTTON_ICON} />
            <Text style={BUTTON_TITLE} text="Sign in with Google" />
          </Button>
          <Button style={BUTTON} text="Sign in with Email" onPress={onSignInEmail} />
          <Button
            style={BUTTON_LINK}
            preset="link"
            text="Log in with Email"
            onPress={onLogInEmail}
          />
        </View>
      </Screen>
      <SafeAreaView>
        <View style={FOOTER_CONTENT}>
          <Text style={FOOTER_TEXT} text="By signing in you accept the" />
          <View style={TERMS_PRIVACY_WRAP}>
            <Text style={[FOOTER_TEXT, FOOTER_TEXT_LINK]} text="General Terms" />
            <Text style={[FOOTER_TEXT, { marginHorizontal: 4 }]} text="and" />
            <Text style={[FOOTER_TEXT, FOOTER_TEXT_LINK]} text="Privacy Policy" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: 38,
  justifyContent: "center",
  alignItems: "center",
}
const LOGO: ImageStyle = {
  width: 160,
  height: 160,
  marginVertical: spacing[5],
}
const TEXT_DESCRIPTION: TextStyle = {
  fontSize: 18,
  lineHeight: 22,
  textAlign: "center",
  marginBottom: spacing[6],
}
const BUTTON: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing[4],
}
const BUTTON_LINK: ViewStyle = {
  marginTop: spacing[1],
}
const BUTTON_ICON: ImageStyle = {
  width: 18,
  height: 18,
  marginRight: spacing[2],
}
const BUTTON_TITLE: TextStyle = {
  fontSize: 16,
  lineHeight: 18,
  textAlign: "center",
  color: color.palette.greyishBrown,
}
const FOOTER_CONTENT: ViewStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
const FOOTER_TEXT: TextStyle = {
  fontSize: 13,
  textAlign: "center",
}
const FOOTER_TEXT_LINK: TextStyle = {
  textDecorationLine: "underline",
}
const TERMS_PRIVACY_WRAP: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}
