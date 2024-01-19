import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppContext } from '../context/AppContext'
import Auth from '../pages/auth'
import { StatusBar } from 'react-native'
import { useFonts, Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'
import NoAuth from '../pages/noAuth'

void SplashScreen.preventAutoHideAsync()

export default function Navigation (): React.JSX.Element | null {
  const { user, isLoadingUserData } = useContext(AppContext)
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  })
  useEffect(() => {
    async function loadFont (): Promise<void> {
      if (fontsLoaded) {
        await SplashScreen.hideAsync()
      }
    }
    void loadFont()
  }, [fontsLoaded])
  if (!fontsLoaded) {
    return null
  }
  return (
    <NavigationContainer >
      {
        (!isLoadingUserData) &&
      ((user.id === '')
        ? <NoAuth/>
        : <Auth />
      )
      }
      <StatusBar backgroundColor={'#ff8c00'} barStyle={'dark-content'} />
    </NavigationContainer>
  )
}
