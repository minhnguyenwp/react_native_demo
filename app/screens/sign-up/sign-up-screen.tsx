import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { useLazyQuery, useMutation } from "@apollo/client"
import { TextInput, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { QUERY_IS_EXISTING_EMAIL, SIGNUP_MUTATION } from "../../graphql/user"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { validateEmail } from "../../utils/validateEmail"
import { FormState, SignUpResponse } from "../../types"
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

export const SignUpScreen: FC<NativeStackScreenProps<NavigatorParamList, "signup">> = ({
  navigation,
}) => {
  const nameInputRef = useRef<TextInput>(null)
  const { setIsSignedIn } = useSignedIn()
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  })
  const [isEmailExist, setIsEmailExist] = useState<boolean>(false)
  const { name, email, password } = formState
  const invalidPassword = password.trim() && password.length < 6
  const invalidEmail = email.trim() ? !validateEmail(email) : false
  const isDisabledSignUp =
    !name.trim() || !email.trim() || !password.trim() || invalidPassword || invalidEmail
  const errorMsg = invalidPassword
    ? "Invalid password"
    : invalidEmail
    ? "Invalid email"
    : isEmailExist
    ? "Email is existing!"
    : ""

  const [checkExistingEmail] = useLazyQuery(QUERY_IS_EXISTING_EMAIL)
  const [signUpWithEmail, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: async (res: SignUpResponse) => {
      const {
        signUpWithEmail: { accessToken, refreshToken, user },
      } = res

      await cacheToStorage(accessToken, refreshToken, user)
      setIsSignedIn(true)
      navigation.navigate("profile")
    },
  })

  useEffect(() => {
    nameInputRef.current.focus()
  }, [])

  const onSignUp = useCallback(async () => {
    const res = await checkExistingEmail({ variables: { email }, fetchPolicy: "no-cache" })

    if (res.data?.isExistingUserByEmail) {
      setIsEmailExist(true)
    } else {
      signUpWithEmail({ variables: { name, email, password } })
    }
  }, [name, email, password, isEmailExist])

  const onHeaderLeftPress = useCallback(() => {
    navigation.navigate("welcome")
  }, [])

  return (
    <View style={FULL}>
      <GradientBackground colors={[color.secondary, color.primary, color.primary]} />
      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <Header headerText="Sign up with Email" onLeftPress={onHeaderLeftPress} />
        <View style={FORM_CONTENT}>
          <TextField
            value={name}
            forwardedRef={nameInputRef}
            label="Your name"
            onChangeText={(text: string) => {
              setFormState({
                ...formState,
                name: text,
              })
            }}
          />
          <TextField
            value={email}
            label="Email"
            onChangeText={(text: string) => {
              isEmailExist && setIsEmailExist(false)
              setFormState({
                ...formState,
                email: text,
              })
            }}
          />
          <TextField
            secureTextEntry
            value={password}
            label="Password (min 6 characters)"
            onChangeText={(text: string) => {
              setFormState({
                ...formState,
                password: text,
              })
            }}
          />

          {(invalidPassword || invalidEmail || isEmailExist) && (
            <View style={ERROR_WRAP}>
              <ErrorMessage msg={errorMsg} />
            </View>
          )}

          <View style={BUTTON_WRAP}>
            <Button
              loading={loading}
              disabled={isDisabledSignUp}
              style={BUTTON}
              preset="green"
              text="SIGN UP"
              onPress={onSignUp}
            />
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

const BUTTON: ViewStyle = {
  width: 150,
  marginTop: spacing[5],
}
