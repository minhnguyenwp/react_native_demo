import React, { FC, useCallback, useEffect, useState } from "react"
import { SafeAreaView, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ApolloError, useMutation } from "@apollo/client"

import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import {
  clearAllCache,
  getUser,
  setUserToStorage,
  useSignedIn,
  useUser,
} from "../../state/user/hooks"
import { UPDATE_USER_MUTATION } from "../../graphql/user"
import { FormState, UpdateResponse } from "../../types"
import { validateEmail } from "../../utils/validateEmail"

// Components
import { Button, ErrorMessage, Header, Screen, Text, TextField } from "../../components"

export const ProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "profile">> = ({
  navigation,
}) => {
  const { loading } = getUser()
  const { name, email } = useUser()
  const { setIsSignedIn } = useSignedIn()
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
  })
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")

  const invalidEmail = formState.email.trim() ? !validateEmail(formState.email) : false
  const isDisabledUpdate = !formState.name.trim() || !formState.email.trim()

  useEffect(() => {
    if (name && email) {
      setFormState({
        name,
        email,
      })
    }
  }, [name, email])

  useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
    }
  }, [updateSuccess])

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: async ({ updateUser }: UpdateResponse) => {
      await setUserToStorage(updateUser)
      setUpdateSuccess(true)
    },
    onError: (error: ApolloError) => {
      setErrorMsg(error.message)
    },
  })

  const onLogout = useCallback(async () => {
    await clearAllCache()
    setIsSignedIn(false)
    navigation.navigate("signin")
  }, [])

  if (loading) return null

  return (
    <View style={FULL}>
      <Screen style={CONTAINER} backgroundColor={color.palette.white2}>
        <Header
          titleStyle={HEADER_TITLE}
          style={HEADER_STYLE}
          headerText="PROFILE"
          leftIcon={null}
        />
        <View style={FORM_CONTENT}>
          <TextField
            value={formState.name}
            labelStyle={LABEL_STYLE}
            inputStyle={INPUT_STYLE}
            label="Name shown on your shared cards"
            onChangeText={(text: string) => {
              errorMsg && setErrorMsg("")
              setFormState({
                ...formState,
                name: text,
              })
            }}
          />
          <TextField
            value={formState.email}
            labelStyle={LABEL_STYLE}
            inputStyle={INPUT_STYLE}
            label="Email"
            onChangeText={(text: string) => {
              errorMsg && setErrorMsg("")
              setFormState({
                ...formState,
                email: text,
              })
            }}
          />

          {invalidEmail || errorMsg ? (
            <View style={ERROR_WRAP}>
              <ErrorMessage msg={errorMsg || "Invalid email"} />
            </View>
          ) : null}

          {updateSuccess && (
            <View style={ERROR_WRAP}>
              <Text style={SUCCESS_STYLE} text="Update Success" />
            </View>
          )}
        </View>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={BUTTON_WRAP}>
          <Button
            loading={updateLoading}
            disabled={isDisabledUpdate}
            style={BUTTON}
            preset="green"
            text="UPDATE"
            onPress={() =>
              updateUser({
                variables: { name: formState.name.trim(), email: formState.email.trim() },
              })
            }
          />
          <Button style={BUTTON} preset="greyOutline" text="LOG OUT" onPress={onLogout} />
        </View>
      </SafeAreaView>
    </View>
  )
}

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  alignItems: "center",
}
const HEADER_STYLE: ViewStyle = {
  justifyContent: "flex-start",
}
const HEADER_TITLE: TextStyle = {
  fontSize: 15,
  color: color.palette.greyishBrown,
  letterSpacing: 0.75,
  opacity: 90,
  textAlign: "left",
}
const FORM_CONTENT: ViewStyle = {
  paddingHorizontal: 18,
  marginTop: spacing[3],
  flex: 1,
  width: "100%",
}
const LABEL_STYLE: TextStyle = {
  fontSize: 14,
  color: color.palette.greyishBrown,
  letterSpacing: 0,
}
const ERROR_WRAP: ViewStyle = {
  marginTop: spacing[4],
  alignItems: "center",
  justifyContent: "center",
}
const SUCCESS_STYLE: TextStyle = {
  color: color.palette.aquaGreen,
}
const FOOTER: ViewStyle = {
  backgroundColor: color.palette.white2,
}
const INPUT_STYLE: TextStyle = {
  backgroundColor: color.palette.white3,
}
const BUTTON_WRAP: ViewStyle = {
  alignItems: "center",
}
const BUTTON: ViewStyle = {
  width: 150,
  marginTop: 26,
}
