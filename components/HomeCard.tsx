import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import useFetchData from '@/hooks/useFetchData'
import { useTheme } from '@/theme/useTheme'
import { WalletType } from '@/types'
import { scale, verticalScale } from '@/utils/styling'
import { orderBy, where } from 'firebase/firestore'
import * as Icons from 'phosphor-react-native'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import Typo from './Typo'

const HomeCard = () => {

    const {theme} = useTheme();
    const {user} = useAuth();
    const [hidden, setHidden] = useState(false);

    const {data: wallets, error, loading: walletLoading} = useFetchData<WalletType>("wallets", [
		where("uid", "==", user?.uid),
		orderBy("created", "desc"),
	]);

    const getTotals = () => {
        return wallets.reduce((totals: any, item: WalletType) => {
            totals.balance = totals.balance + Number(item.amount);
            totals.income = totals.income + Number(item.totalIncome);
            totals.expenses = totals.expenses + Number(item.totalExpenses);
            return totals;
        }, {balance: 0, income: 0, expenses: 0})
    }

    const totals = getTotals();

    return (
        <ImageBackground
            source={require('../assets/images/card.png')}
            resizeMode='stretch'
            style={styles.backgroundImage}   
        >
            <View style={styles.container}>
                <View>
                    {/* total balance */}
                    <View style={styles.totalBalanceRow}>
                        <Typo color={theme.colors.text} size={17} fontWeight={'700'}>
                            Total Balance
                        </Typo>
                        <TouchableOpacity onPress={() => setHidden(!hidden)}>
                            {
                                hidden ? (
                                    <Icons.EyeSlashIcon
                                        size={verticalScale(23)}
                                        color={theme.colors.text}
                                        weight='fill'
                                    />
                                ) : (
                                    <Icons.EyeIcon
                                        size={verticalScale(23)}
                                        color={theme.colors.text}
                                        weight='fill'
                                    />
                                )
                            }
                        </TouchableOpacity>
                        
                    </View>
                    <Typo color={theme.colors.text} size={30} fontWeight={'700'}>
                        {
                            hidden 
                            ? "$ XXXXX.XX"
                            : `$ ${walletLoading ? "---" : totals?.balance?.toFixed(2)}`
                        }
                    </Typo> 
                </View>
                {/* total income and total Expenses */}
                <View style={styles.stats}>
                    {/* income */}
                    <View style={{gap: verticalScale(5)}}>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statusIcon}>
                                <Icons.ArrowDownIcon
                                    size={verticalScale(15)}
                                    color={theme.colors.text}
                                    weight='bold'
                                />
                            </View>
                            <Typo size={16} color={theme.colors.text} fontWeight={'500'}>
                                Income
                            </Typo>
                        </View>
                        <View style={{alignSelf: 'center'}}>
                            <Typo size={17} color={theme.colors.success} fontWeight={'700'}>
                                {
                                    hidden 
                                    ? "$ XXXXX.XX"
                                    : `$ ${walletLoading ? "---" : totals?.income?.toFixed(2)}`
                                }
                            </Typo>
                        </View>
                    </View>

                    {/* expenses */}
                    <View style={{gap: verticalScale(5)}}>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statusIcon}>
                                <Icons.ArrowUpIcon
                                    size={verticalScale(15)}
                                    color={theme.colors.text}
                                    weight='bold'
                                />
                            </View>
                            <Typo size={16} color={theme.colors.text} fontWeight={'500'}>
                                Expense
                            </Typo>
                        </View>
                        <View style={{alignSelf: 'center'}}>
                            <Typo size={17} color={theme.colors.danger} fontWeight={'700'}>
                                $ {walletLoading? "---" : getTotals()?.expenses?.toFixed(2)}
                            </Typo>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default HomeCard

const styles = StyleSheet.create({
    backgroundImage: {
        height: scale(210),
        width: "100%",
    },
    container: {
        padding: spacingX._20,
        paddingHorizontal: scale(23),
        height: "87%",
        width: "100%",
        justifyContent: 'space-between',
    },
    totalBalanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacingY._5
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    statusIcon: {
        backgroundColor: colors.neutral350,
        padding: spacingY._5,
        borderRadius: 50,
    },
    incomeExpense: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacingY._7,
    },
})