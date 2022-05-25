import React, { useState, useEffect } from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client"
import { persistCache } from "apollo3-cache-persist"
import { Provider } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"

import * as storage from "./utils/storage"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/error/error-boundary"
import { GRAPHQL_SERVER } from "./constants"
import { authLink } from "./utils/authLink"
import { configureAppStore } from "./store/configureStore"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const cache = new InMemoryCache()

const store = configureAppStore()

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: GRAPHQL_SERVER })),
  cache,
})

/**
 * This is the root component of our app.
 */
function App() {
  const [loadingCache, setLoadingCache] = useState<boolean>(true)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (loadingCache) return null

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ErrorBoundary catchErrors={"always"}>
            <AppNavigator
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </ErrorBoundary>
        </SafeAreaProvider>
      </Provider>
    </ApolloProvider>
  )
}

export default App
