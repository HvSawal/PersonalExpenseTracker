import { AuthProvider } from '@/contexts/authContext';
import AppThemeProvider from '@/theme/ThemeProvider';
import {
	Roboto_100Thin,
	Roboto_300Light,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
	Roboto_900Black,
} from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Keep the splash screen visible while we load fonts
SplashScreen.preventAutoHideAsync();

// const RNStack = createStackNavigator();
// const Stack = withLayoutContext(RNStack.Navigator);


const StackLayout = () => {

	return (
		<SafeAreaProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='/(modals)/profileModal' options={{
					presentation: 'modal',
				}}
				/>
				<Stack.Screen name='/(modals)/walletModal' options={{
					presentation: 'modal',
				}}
				/>
				<Stack.Screen name='/(modals)/transactionModal' options={{
					presentation: Platform.OS === 'android' ? 'card' : 'modal',
					...(Platform.OS === 'android' && {
						animation: 'slide_from_bottom',
					}),
				}}
				/>
				<Stack.Screen name='/(modals)/searchModal' options={{
					presentation: 'modal',
				}}
				/>
				<Stack.Screen name='/(modals)/settingsModal' options={{
					presentation: 'modal',
				}}
				/>
			</Stack>
		</SafeAreaProvider>
		
	)
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Return null so we stay on the splash screen
    return null;
  }

  	return (
		<AuthProvider>
			<AppThemeProvider>
        		<StackLayout />
      		</AppThemeProvider>
        	{/* <StackLayout /> */}
		</AuthProvider>
  	);
}