import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { WelcomeScreen, SignInScreen, SignUpScreen, ProfileScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { useSignedIn, useUserSlice } from "../state/user/hooks"
import { AUTH_TOKEN } from "../constants"

export type NavigatorParamList = {
  welcome: undefined
  signup: undefined
  signin: undefined
  profile: undefined
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { signedIn, setIsSignedIn } = useSignedIn()

  useEffect(() => {
    const getAuthToken = async () => {
      const accessToken = await AsyncStorage.getItem(AUTH_TOKEN)
      setIsSignedIn(!!accessToken)
      setLoading(false)
    }

    getAuthToken()
  }, [])

  if (loading) return null

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="welcome"
    >
      {signedIn ? (
        <Stack.Screen name="profile" component={ProfileScreen} />
      ) : (
        <>
          <Stack.Screen name="welcome" component={WelcomeScreen} />
          <Stack.Screen name="signup" component={SignUpScreen} />
          <Stack.Screen name="signin" component={SignInScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  useUserSlice()
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
