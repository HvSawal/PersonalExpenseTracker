import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { Platform, StyleSheet, Text, TextStyle } from 'react-native'

const ROBOTO_REGULAR = {
  '100': 'Roboto_100Thin',
  '300': 'Roboto_300Light',
  '400': 'Roboto_400Regular',
  '500': 'Roboto_500Medium',
  '700': 'Roboto_700Bold',
  '900': 'Roboto_900Black',
} as const;

type WeightKey = keyof typeof ROBOTO_REGULAR;

function pickRobotoFamily(weight?: string): string {
  const w = (weight ?? '400') as WeightKey;
  return ROBOTO_REGULAR[w] || ROBOTO_REGULAR['400'];
}

const Typo = ({
    size,
    color = colors.text,
	fontWeight = "400",
    children,
    style,
    textProps = {},
}: TypoProps) => {
	
	const textStyle: TextStyle = {
		fontSize: size ? verticalScale(size) : verticalScale(18),
		color,
		fontFamily: pickRobotoFamily(fontWeight ? String(fontWeight) : undefined),
		includeFontPadding: false,
		textAlignVertical: Platform.OS === 'android' ? 'center' : undefined,
	};
	return (
		<Text style={[textStyle, style]} {...textProps}>
			{children}
		</Text>
	)
}

export default Typo;

const styles = StyleSheet.create({})