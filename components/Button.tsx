import { radius } from '@/constants/theme';
import { useTheme } from '@/theme/useTheme';
import { CustomButtonPressableProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import { Platform, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Loading from './Loading';
import Typo from './Typo';

// const Button = ({
//     style,
//     onPress,
//     loading = false,
//     children,
// }: CustomButtonProps) => {

//     if(loading){
//         return (
//             <View style={[styles.button, style, {backgroundColor: 'transparent'}]}>
//                 <Loading />
//             </View>
//         )
//     }
//   return (
//     <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
//       {children}
//     </TouchableOpacity>
//   )
// }

const Button = ({
    style,
    onPress,
    loading = false,
    children, 
    ...props }: CustomButtonPressableProps) => {
		const { theme } = useTheme();
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
        <Loading />
      </View>
    );
  }

  const flat = (StyleSheet.flatten(style) || {}) as ViewStyle;
  const { backgroundColor, ...rest } = flat;
  

  const content =
    typeof children === 'string' || typeof children === 'number'
      ? <Typo>{String(children)}</Typo>
      : children;

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={
          Platform.OS === 'android'
            ? { 
                color: 'rgba(115, 115, 115, 0.5)',
                borderless: false, 
            }
            : undefined
        }
        style={({ pressed }) => [
          styles.button,
          //style,
          { backgroundColor: backgroundColor ?? theme.colors.primary },
          Platform.OS === 'ios' && pressed && { opacity: 0.7 },
        ]}
        {...props}
      >
        {content}
      </Pressable>
    </View>
  );
};

export default Button

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 14,
        overflow: 'hidden', // necessary for ripple clipping on Android
    },
    button: {
        //backgroundColor: colors.primary,
        borderRadius: radius._17,
        borderCurve: 'continuous',
        height: verticalScale(52),
        justifyContent: 'center',
        alignItems: 'center',
    }
})