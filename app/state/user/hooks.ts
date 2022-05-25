import { useDispatch, useSelector } from "react-redux"
import { useInjectReducer } from "redux-injectors"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { RootState, User } from "../../types"
import { AUTH_TOKEN, REFRESH_TOKEN, USER_INFO } from "../../constants"

// Redux
import { slice, setUser as setUserAction, setIsSignedIn as setIsSignedInAction } from "./reducer"
import { useCallback, useEffect, useState } from "react"

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer })
}

export const useUser = (): User => {
  const user = useSelector((state: RootState) => state.user)
  return user.user || { id: "", name: "", email: "", facebookId: "", googleId: "", appleId: "" }
}

export const setUser = (user: User): void => {
  const dispatch = useDispatch()
  dispatch(setUserAction(user))
}

export const getUser = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getUserFromStorage = async () => {
      const user = await AsyncStorage.getItem(USER_INFO)
      dispatch(setUserAction(JSON.parse(user)))
      setLoading(false)
    }

    getUserFromStorage()
  }, [])

  return { loading }
}

export const useSignedIn = () => {
  const dispatch = useDispatch()
  const signedIn = useSelector((state: RootState) => state.user.isSignedIn)

  const setIsSignedIn = useCallback((signedIn: boolean) => {
    dispatch(setIsSignedInAction(signedIn))
  }, [])

  return {
    signedIn,
    setIsSignedIn,
  }
}

export const cacheToStorage = async (
  accessToken: string,
  refreshToken: string,
  user: User,
): Promise<void> => {
  await AsyncStorage.setItem(AUTH_TOKEN, accessToken)
  await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken)
  await AsyncStorage.setItem(USER_INFO, JSON.stringify(user))
}

export const clearAllCache = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_TOKEN)
  await AsyncStorage.removeItem(REFRESH_TOKEN)
  await AsyncStorage.removeItem(USER_INFO)
}

export const setUserToStorage = async (user: User): Promise<void> => {
  await AsyncStorage.setItem(USER_INFO, JSON.stringify(user))
}
