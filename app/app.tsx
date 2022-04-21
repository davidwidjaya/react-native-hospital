// /**
//  * Welcome to the main entry point of the app. In this file, we'll
//  * be kicking off our app.
//  *
//  * Most of this file is boilerplate and you shouldn't need to modify
//  * it very often. But take some time to look through and understand
//  * what is going on here.
//  *
//  * The app navigation resides in ./app/navigators, so head over there
//  * if you're interested in adding screens and navigators.
//  */
// import "./i18n"
// import "./utils/ignore-warnings"
// import React, { useState, useEffect } from "react"
// import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
// import { initFonts } from "./theme/fonts" // expo
// import * as storage from "./utils/storage"
// import { AppNavigator, useNavigationPersistence } from "./navigators"
// import { RootStore, RootStoreProvider, setupRootStore } from "./models"
// import { ToggleStorybook } from "../storybook/toggle-storybook"
// import { ErrorBoundary } from "./screens/error/error-boundary"

// // This puts screens in a native ViewController or Activity. If you want fully native
// // stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// // https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

// export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// /**
//  * This is the root component of our app.
//  */
// function App() {
//   const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
//   const {
//     initialNavigationState,
//     onNavigationStateChange,
//     isRestored: isNavigationStateRestored,
//   } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

//   // Kick off initial async loading actions, like loading fonts and RootStore
//   useEffect(() => {
//     ;(async () => {
//       await initFonts() // expo
//       setupRootStore().then(setRootStore)
//     })()
//   }, [])

//   // Before we show the app, we have to wait for our state to be ready.
//   // In the meantime, don't render anything. This will be the background
//   // color set in native by rootView's background color.
//   // In iOS: application:didFinishLaunchingWithOptions:
//   // In Android: https://stackoverflow.com/a/45838109/204044
//   // You can replace with your own loading component if you wish.
//   if (!rootStore || !isNavigationStateRestored) return null

//   // otherwise, we're ready to render the app
//   return (
//     <ToggleStorybook>
//       <RootStoreProvider value={rootStore}>
//         <SafeAreaProvider initialMetrics={initialWindowMetrics}>
//           <ErrorBoundary catchErrors={"always"}>
//             <AppNavigator
//               initialState={initialNavigationState}
//               onStateChange={onNavigationStateChange}
//             />
//           </ErrorBoundary>
//         </SafeAreaProvider>
//       </RootStoreProvider>
//     </ToggleStorybook>
//   )
// }

// export default App

// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import "./i18n"
import React, { useState, useEffect, useRef } from "react"
import { LogBox, BackHandler, Linking } from "react-native"
import { NavigationContainerRef } from "@react-navigation/native"
import { contains } from "ramda"
import { enableScreens } from "react-native-screens"
import { SafeAreaProvider, initialWindowSafeAreaInsets } from "react-native-safe-area-context"

import { RootNavigator, exitRoutes, setRootNavigation } from "./navigation"
import { useBackButtonHandler } from "./navigation/use-back-button-handler"
import { RootStore, RootStoreProvider, setupRootStore } from "./models/root-store"
import * as storage from "./utils/storage"
import getActiveRouteName from "./navigation/get-active-routename"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
enableScreens()

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
LogBox.ignoreLogs([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Require cycle:",
])

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => contains(routeName, exitRoutes)

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
const App: React.FunctionComponent<{}> = () => {
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const [initialNavigationState, setInitialNavigationState] = useState()
  const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(true)

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)

  /**
   * Keep track of state changes
   * Track Screens
   * Persist State
   */
  const routeNameRef = useRef()
  const onNavigationStateChange = state => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = getActiveRouteName(state)

    if (previousRouteName !== currentRouteName) {
      // track screens.
      __DEV__ && console.tron.log(currentRouteName)
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName

    // Persist state to storage
    storage.save(NAVIGATION_PERSISTENCE_KEY, state)
  }

  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  useEffect(() => {
    const restoreState = async () => {
      try {
        const state = await storage.load(NAVIGATION_PERSISTENCE_KEY)

        if (state) {
          setInitialNavigationState(state)
        }
      } finally {
        setIsRestoringNavigationState(false)
      }
    }

    if (isRestoringNavigationState) {
      restoreState()
    }
  }, [isRestoringNavigationState])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  //
  // This step should be completely covered over by the splash screen though.
  //
  // You're welcome to swap in your own component to render if your boot up
  // sequence is too slow though.
  if (!rootStore) {
    return null
  }

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <RootNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </SafeAreaProvider>
    </RootStoreProvider>
  )
}

export default App
