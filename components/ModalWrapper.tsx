import { colors, spacingY } from '@/constants/theme';
import { useTheme } from '@/theme/useTheme';
import { ModalWrapperProps } from '@/types';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const isIos = Platform.OS == "ios";
const isAndroid = Platform.OS == "android";

const ModalWrapper = ({
    style,
    children,
    bg = colors.neutral900
}: ModalWrapperProps) => {

  const {theme} = useTheme();

  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, {
        backgroundColor: theme.colors.background,
        // Safe top/bottom across iOS & Android
        paddingTop: Math.max(top, spacingY._40),
        paddingBottom: Math.max(bottom, spacingY._15),
      }, style && style]}>
      {children}
    </View>
  )
}

export default ModalWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: isAndroid ? 50 : spacingY._15,
        //paddingBottom: isAndroid ? spacingY._10 : spacingY._20,
    }
})