import { radius, spacingX } from '@/constants/theme'
import { useTheme } from '@/theme/useTheme'
import { InputProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const Input = (props: InputProps) => {

  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View
        style={[styles.container, props.containerStyle && props.containerStyle]}
    >
        {
            props.icon && props.icon
        }
      <TextInput 
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={theme.colors.textMuted}
        ref={props.inputRef && props.inputRef}
        {...props}
      >

      </TextInput>
    </View>
  )
}

export default Input

function getStyles(theme: any){
  return StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: verticalScale(64),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: radius._17,
        borderCurve: 'continuous',
        paddingHorizontal: spacingX._15,
        gap: spacingX._10,
    },
    input: {
        flex: 1,
        color: theme.colors.text,
        fontSize: verticalScale(14),
    }
  });
};