import { colors } from '@/constants/theme';
import { useTheme } from '@/theme/useTheme';
import { verticalScale } from '@/utils/styling';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Icons from 'phosphor-react-native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabs({ 
    state, 
    descriptors, 
    navigation,
}: BottomTabBarProps) {

    const {theme} = useTheme();
    const styles = getStyles(theme);
    const { bottom: bottomInset } = useSafeAreaInsets();

    const tabbarIcons: any = {
        index: (isFocused: boolean) => (
            <Icons.HouseIcon
                size={verticalScale(30)}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? theme.colors.primary : theme.colors.textMuted}
            />
        ),
        statistics: (isFocused: boolean) => (
            <Icons.ChartBarIcon
                size={verticalScale(30)}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? theme.colors.primary : theme.colors.textMuted}
            />
        ),
        wallet: (isFocused: boolean) => (
            <Icons.WalletIcon
                size={verticalScale(30)}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? theme.colors.primary : theme.colors.textMuted}
            />
        ),
        profile: (isFocused: boolean) => (
            <Icons.UserIcon
                size={verticalScale(30)}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? theme.colors.primary : theme.colors.textMuted}
            />
        )
    };
    
    return (
        <View style={[styles.tabBar, {
            // Make the bar tall enough and pad its content above the nav bar
            height: 56 + bottomInset,          // base height + inset
            paddingBottom: Math.max(bottomInset, 8),
            paddingTop: 8,
        },]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label: any = options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                      ? options.title
                                      : route.name;
                const isFocused = state.index === index;
                
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };
                
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                
                return (
                    <TouchableOpacity
                        key={route.name}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBarItem}
                    >
                        {
                            tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)
                        }
                </TouchableOpacity>
            );
        })}
        </View>
    );
};


function getStyles(theme: any){
    return StyleSheet.create({
        tabBar: {
            flexDirection: 'row',
            width: '100%',
            height: Platform.OS === 'android' ? verticalScale(55) : verticalScale(73),
            backgroundColor: theme.colors.background,
            justifyContent: 'space-around',
            alignItems: 'center',
            borderTopColor: colors.neutral700,
            borderTopWidth: 0,
            ...(Platform.OS === 'android'
                ? { elevation: 10 }
                : { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: -2 } }),
        },
        tabBarItem: {
            //marginBottom: Platform.OS === "android" ? spacingY._15 : spacingY._10,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
}
