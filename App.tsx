import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { AppProvider } from './src/context/AppContext'
import Navigation from './src/routes/Navigation'
import * as SplashScreen from 'expo-splash-screen'
import { ThemeProvider, createTheme } from '@rneui/themed'
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
const theme = createTheme({
  components: {
    Input: (props, theme) => ({
      style: { fontFamily: 'Inter_400Regular', fontSize: 17, borderWidth: 1, borderRadius: 15, borderColor: '#6667', paddingHorizontal: 10 },
      inputContainerStyle: { borderBottomWidth: 0 }
    }),
    Text: (props, theme) => ({
      style: { fontFamily: 'Inter_400Regular', fontSize: 17 }
    })
  }
})

void SplashScreen.preventAutoHideAsync()

export default function App (): React.JSX.Element | null {
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
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </AppProvider>
  )
}
