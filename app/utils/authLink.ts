import { setContext } from "@apollo/client/link/context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AUTH_TOKEN } from "../constants"

export const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})
