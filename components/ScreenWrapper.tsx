import { useTheme } from '@/theme/useTheme';
import { ScreenWrapperProps } from '@/types';
import React from 'react';
import { Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

const {height} = Dimensions.get('window');

const ScreenWrapper = ({style, children}: ScreenWrapperProps) => {

    const {theme} = useTheme();

    let paddingTop = Platform.OS === 'ios' ? height * 0.06 : height * 0.05;
    return (
        <SafeAreaView style={[{
            paddingTop,
            flex: 1,
            backgroundColor: theme.colors.background,
        }, style]}>
            <StatusBar barStyle="light-content" />
            {children}
        </SafeAreaView>

        // <View style={[
        //     {
        //         paddingTop,
        //         flex: 1,
        //         backgroundColor: colors.neutral900,
        //     },
        //     style,
        // ]}>
        //     <StatusBar barStyle={"light-content"} />
        //     {children}
        // </View>
    );
}

export default ScreenWrapper

const styles = StyleSheet.create({})