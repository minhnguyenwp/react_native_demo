import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { TextInput, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ApolloError, useMutation } from "@apollo/client"

import { LOGIN_MUTATION } from "../../graphql/user"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { FormState, LogInResponse } from "../../types"
import { validateEmail } from "../../utils/validateEmail"
import { cacheToStorage, useSignedIn } from "../../state/user/hooks"

// Components
import {
  Button,
  ErrorMessage,
  GradientBackground,
  Header,
  Screen,
  TextField,
} from "../../components"

export const SignInScreen: FC<NativeStackScreenProps<NavigatorParamList, "signin">> = ({
  navigation,
}) => {
  const emailInputRef = useRef<TextInput>(null)
  const { setIsSignedIn } = useSignedIn()
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  })
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)
  const { email, password } = formState
  const invalidEmail = email.trim() ? !validateEmail(email) : false
  const isDisabledLogIn = !email.trim() || !password.trim() || invalidEmail
  const errorMsg = invalidEmail
    ? "Invalid email"
    : invalidCredentials
    ? "Email or password is not correct"
    : ""

  const [logInWithEmail, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (res: LogInResponse) => {
      const {
        loginWithEmail: { accessToken, refreshToken, user },
      } = res

      await cacheToStorage(accessToken, refreshToken, user)
      setIsSignedIn(true)
      navigation.navigate("profile")
    },
    onError: (error: ApolloError) => {
      if (error.message === "Invalid credentials") {
        setInvalidCredentials(true)
      }
    },
  })

  useEffect(() => {
    emailInputRef.current.focus()
  }, [])

  const onHeaderLeftPress = useCallback(() => {
    navigation.navigate("welcome")
  }, [])

  const onLogIn = useCallback(() => {
    logInWithEmail({ variables: { email, password } })
  }, [email, password])

  return (
    <View style={FULL}>
      <GradientBackground colors={[color.secondary, color.primary, color.primary]} />

      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <Header headerText="Log in" onLeftPress={onHeaderLeftPress} />
        <View style={FORM_CONTENT}>
          <TextField
            forwardedRef={emailInputRef}
            value={email}
            label="Email"
            onChangeText={(text: string) => {
              invalidCredentials && setInvalidCredentials(false)
              setFormState({
                ...formState,
                email: text,
              })
            }}
          />
          <TextField
            secureTextEntry
            value={password}
            label="Password"
            onChangeText={(text: string) => {
              invalidCredentials && setInvalidCredentials(false)
              setFormState({
                ...formState,
                password: text,
              })
            }}
          />

          {(invalidEmail || invalidCredentials) && (
            <View style={ERROR_WRAP}>
              <ErrorMessage msg={errorMsg} />
            </View>
          )}

          <View style={BUTTON_WRAP}>
            <Button
              loading={loading}
              disabled={isDisabledLogIn}
              style={BUTTON}
              preset="green"
              text="LOG IN"
              onPress={onLogIn}
            />

            <Button style={FORGOT_BUTTON} preset="link" text="Forgot my password" />
          </View>
        </View>
      </Screen>
    </View>
  )
}

const FULL: ViewStyle = { flex: 1 }

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  alignItems: "center",
}

const FORM_CONTENT: ViewStyle = {
  paddingHorizontal: 38,
  marginTop: spacing[4],
  flex: 1,
  width: "100%",
}

const ERROR_WRAP: ViewStyle = {
  marginTop: spacing[4],
  alignItems: "center",
  justifyContent: "center",
}

const BUTTON_WRAP: ViewStyle = {
  alignItems: "center",
}

const FORGOT_BUTTON: ViewStyle = {
  marginTop: spacing[5],
}

const BUTTON: ViewStyle = {
  width: 150,
  marginTop: spacing[5],
}
