import { expenseCategories, incomeCategories } from '@/constants/data';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { useTheme } from '@/theme/useTheme';
import { TransactionItemProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Typo from './Typo';

const TransactionItem = ({
    item,
    index,
    handleClick
}: TransactionItemProps) => {

    const { theme } = useTheme();
    const styles = getStyles(theme);

    let category = item?.type == 'income' ? incomeCategories : expenseCategories[item?.category as string];
    const IconComponent  = category.icon;
    //console.log("Category : ", category);

    const itemDate = (item?.date as Timestamp)?.toDate()?.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: 'numeric'
    })

    return (
        <Animated.View entering={FadeInDown.delay(index*50).springify().damping(15)}>
            <TouchableOpacity style={styles.row} onPress={() => handleClick(item)}>
                <View style={[styles.icon, {backgroundColor: category.bgColor}]}>
                    {IconComponent && (
                        <IconComponent
                            size={verticalScale(25)}
                            weight='fill'
                            color={colors.white}
                        />
                    )}
                </View>
                <View style={styles.categoryDescription}>
                    <Typo size={17} color={theme.colors.text}>{category.label}</Typo>
                    <Typo size={12} color={theme.colors.textMuted} textProps={{numberOfLines: 1}}>
                        {item?.description}
                    </Typo>
                </View>

                <View style={styles.amountDate}>
                    <Typo color={item?.type == 'income' ? theme.colors.success : theme.colors.danger} fontWeight={'500'}>
                        {
                            item?.type == 'income' ? `+ $${item?.amount}` : `- $${item?.amount}`
                        }
                    </Typo>
                    <Typo size={13} color={theme.colors.textMuted}>
                        {itemDate}
                    </Typo>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default TransactionItem;

function getStyles(theme: any){
    return StyleSheet.create({
        row: 
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: spacingX._12,
            marginBottom: spacingY._12,

            // list with background
            backgroundColor: theme.colors.card,
            padding: spacingY._10,
            paddingHorizontal: spacingY._10,
            borderRadius: radius._17,
        },
        icon:
        {
            height: verticalScale(44),
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: radius._12,
            borderCurve: 'continuous',
        },
        categoryDescription: {
            flex: 1,
            gap: 2.5,
        },
        amountDate: {
            alignItems: 'flex-end',
            gap: 3
        },
    });
}