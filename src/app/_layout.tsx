import "../global.css";
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    'Inter-Black': require('../assets/fonts/Inter_18pt-Black.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter_18pt-Bold.ttf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter_18pt-ExtraBold.ttf'),
    'Inter-ExtraLight': require('../assets/fonts/Inter_18pt-ExtraLight.ttf'),
    'Inter-Light': require('../assets/fonts/Inter_18pt-Light.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter_18pt-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter_18pt-SemiBold.ttf'),
    'Inter-Thin': require('../assets/fonts/Inter_18pt-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }}/>
    </Stack>
  );
}
