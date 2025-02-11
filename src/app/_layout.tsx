import "../global.css";
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SQLiteProvider } from 'expo-sqlite';
import { initDatabase, resetDatabase } from '../db/database';
import { translations } from "../utils/constants";

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
    <SQLiteProvider
      databaseName="schedule.db"
      onInit={async (db) => {
        //await resetDatabase(db);
        await initDatabase(db);
      }}
    >
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#f3f4f6' },
            headerTitleStyle: { fontFamily: 'Inter-SemiBold' },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: translations.mySchedule,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="add"
            options={{
              title: translations.newClass,
              presentation: 'modal'
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}