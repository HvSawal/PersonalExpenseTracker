import CustomTabs from '@/components/CustomTabs';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const _layout = () => {
//   return (
//     <Tabs tabBar={CustomTabs} screenOptions={{headerShown: false}}>
//         <Tabs.Screen name="index" />
//         <Tabs.Screen name="statistics" />
//         <Tabs.Screen name="wallet" />
//         <Tabs.Screen name="profile" />
//     </Tabs>
//   )
// }

// export default _layout;

export default function TabLayout(){
	const insets = useSafeAreaInsets();
	
	return (
		<Tabs
			// Pass bottomInset to your custom bar
			tabBar={(props) => (
				<CustomTabs
					{...props}
					insets={{
						bottom: insets.bottom,
						top: insets.top,
						right: insets.right,
						left: insets.left,
					}}
				/>
      		)}
			
			screenOptions={{
				headerShown: false,
        		// If you want an extra safety net for screen content:
        		// sceneStyle: { paddingBottom: insets.bottom }, // RN 0.76+; if not available, skip
      		}}
    	>
      		<Tabs.Screen name="index" />
      		<Tabs.Screen name="statistics" />
      		<Tabs.Screen name="wallet" />
      		<Tabs.Screen name="profile" />
    	</Tabs>
  );
}

const styles = StyleSheet.create({})