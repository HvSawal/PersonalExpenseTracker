import { colors, spacingY } from '@/constants/theme';
import { useTheme } from '@/theme/useTheme';
import { TransactionListType, TransactionType } from '@/types';
import { verticalScale } from '@/utils/styling';
import { FlashList } from "@shopify/flash-list/src";
import { useRouter } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Loading from './Loading';
import TransactionItem from './TransactionItem';
import Typo from './Typo';

const TransactionList = ({
    data,
    title,
    loading,
    emptyListMessage
}: TransactionListType) => {


    const router = useRouter();
    const { theme } = useTheme();
    const handleClick = (item: TransactionType) => {
        // todo: open transaction details page
        router.push({
            pathname: "/(modals)/transactionModal",
            params: {
                id: item?.id,
                type: item?.type,
                amount: item?.amount?.toString(),
                category: item?.category,
                date: (item.date as Timestamp)?.toDate()?.toISOString(),
                description: item?.description,
                image: item?.image,
                uid: item?.uid,
                walletId: item?.walletId,
            }
        })
    }

    return (
        <View style={styles.container}>
            {
                title && (
                    <Typo size={20} fontWeight={'500'} color={theme.colors.text}>
                        {title}
                    </Typo>
                )
            }
            <View style={styles.list}>
                <FlashList
                    data={data}
                    renderItem={({ item, index }) =>  (<TransactionItem item={item} index={index} handleClick={handleClick}/>)}
                    estimatedItemSize={60}
                />
            </View>
            {
                !loading && data.length === 0 && (
                    <Typo size={15} color={colors.neutral400} style={{textAlign: 'center', marginTop: spacingY._15}}>
                        {emptyListMessage}
                    </Typo>
                )
            }
            {
                loading && (
                    <View style={{top: verticalScale(100)}}>
                        <Loading></Loading>
                    </View>
                )
            }
        </View>
    )
};

export default TransactionList;

const styles = StyleSheet.create({
    container: {
        gap: spacingY._17,
        //flex: 1,
        //backgroundColor: "red",
    },
    list: {
        minHeight: 3,
    },
});