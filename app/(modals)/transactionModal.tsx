import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Header from '@/components/Header';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { expenseCategories, transactionTypes } from '@/constants/data';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import useFetchData from '@/hooks/useFetchData';
import { createOrUpdateTransanction, deleteTransaction } from '@/services/transactionService';
import { TransactionType, WalletType } from '@/types';
import { scale, verticalScale } from '@/utils/styling';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { orderBy, where } from 'firebase/firestore';
import * as Icons from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const TransactionModal = () => {
    const { user } = useAuth();

	const [transaction, setTransaction] = useState<TransactionType>({
		type: 'expense',
        amount: 0,
        description: "",
        category: "",
        date: new Date(),
        walletId: "",
        image: null,
	});


	const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
	const router = useRouter();

    const {data: wallets, error: walletError, loading: walletLoading} = useFetchData<WalletType>("wallets", [
		where("uid", "==", user?.uid),
		orderBy("created", "desc"),
	]);

    type paramType = {
        id: string;
        type: string;
        amount: string;
        category?: string;
        date: string;
        description?: string;
        image?: any;
        uid?: string;
        walletId: string;
    }

    const oldTransaction: paramType  = useLocalSearchParams();
    //console.log("Old wallet: ", oldTransaction.image);

    const onDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || transaction.date;
        setTransaction({...transaction, date: currentDate});
        setShowDatePicker(false);
    };


    useEffect(() => {
        if(oldTransaction?.id){
            setTransaction({
                type: oldTransaction?.type,
                amount: Number(oldTransaction?.amount),
                description: oldTransaction.description || "",
                category: oldTransaction.category || "",
                date: new Date(oldTransaction.date),
                image: oldTransaction?.image,
                walletId: oldTransaction.walletId
            });
        }
    }, []);

	const onSubmit = async () => {
		const {type, amount, description, category, date, walletId, image} = transaction;

        if(!walletId || !date || !amount || (type == 'expense' && !category)){
            Alert.alert("Transaction", "Please fill all the fields");
            return;
        }

        let transactionData: TransactionType = {
            type,
            amount,
            description,
            category,
            date,
            walletId,
            image: image ? image : null,
            uid: user?.uid
        }

        // todo: include transaction id for udpating
        if(oldTransaction?.id) transactionData.id = oldTransaction.id;
        setLoading(true);
        const response = await createOrUpdateTransanction(transactionData);
        setLoading(false);

        if(response.success){
            router.back();
        } else{
            Alert.alert("Transaction", response.msg);
        }
	}

    const handleDelete = async () => {

        if(!oldTransaction?.id) return;
        setLoading(true);
        const response = await deleteTransaction(oldTransaction?.id, oldTransaction?.walletId);
        setLoading(false);

        if(response.success){
            router.back();
        } else {
            Alert.alert("Transaction", response.msg);
        }
        console.log('Deleting the wallet with id: ', oldTransaction?.id);
    }

    const showDeleteAlert = () => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this transaction ?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => handleDelete(), style: 'destructive'},
            ],
        )
    }


	return (
		<ModalWrapper>

			<View style={styles.container}>
				<Header 
					title={oldTransaction?.id ? "Update Transaction" : "New Transaction"}
					leftIcon={<BackButton />}
					style={{marginBottom: spacingY._10}}
				/>

				{/* Form */}
				<ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
					<View style={styles.inputContainer}>
						<Typo color={colors.neutral200} size={16}>Type</Typo>
						{/* dropdown here */}
                        <Dropdown
                            style={styles.dropDownContainer}
                            activeColor={colors.neutral700}
                            //placeholderStyle={styles.dropDownPlaceholder}
                            selectedTextStyle={styles.dropDownSelectedText}
                            iconStyle={styles.dropDownIcon}
                            data={transactionTypes}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            itemTextStyle={styles.dropDownItemText}
                            itemContainerStyle={styles.dropDownItemContainer}
                            containerStyle={styles.dropDownListContainer}
                            //placeholder={!isFocus ? 'Select item' : '...'}
                            value={transaction.type}
                            onChange={(item) => {
                                setTransaction({...transaction, type:  item.value});
                            }}
                        />
					</View>
                    <View style={styles.inputContainer}>
						<Typo color={colors.neutral200} size={16}>Wallet</Typo>
						{/* dropdown here */}
                        <Dropdown
                            style={styles.dropDownContainer}
                            activeColor={colors.neutral700}
                            placeholderStyle={styles.dropDownPlaceholder}
                            selectedTextStyle={styles.dropDownSelectedText}
                            iconStyle={styles.dropDownIcon}
                            data={wallets.map(wallet => ({
                                label: `${wallet?.name} ($${wallet.amount})`,
                                value: wallet?.id,
                            }))}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            itemTextStyle={styles.dropDownItemText}
                            itemContainerStyle={styles.dropDownItemContainer}
                            containerStyle={styles.dropDownListContainer}
                            placeholder={'Select wallet'}
                            value={transaction.walletId}
                            onChange={(item) => {
                                setTransaction({...transaction, walletId:  item.value || ""});
                            }}
                        />
					</View>


                    {/* Expense Categories */}
                    {
                        transaction.type == 'expense' && (
                            <View style={styles.inputContainer}>
                                <Typo color={colors.neutral200} size={16}>Expense Categories</Typo>
                                {/* dropdown here */}
                                <Dropdown
                                    style={styles.dropDownContainer}
                                    activeColor={colors.neutral700}
                                    placeholderStyle={styles.dropDownPlaceholder}
                                    selectedTextStyle={styles.dropDownSelectedText}
                                    iconStyle={styles.dropDownIcon}
                                    data={Object.values(expenseCategories)}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    itemTextStyle={styles.dropDownItemText}
                                    itemContainerStyle={styles.dropDownItemContainer}
                                    containerStyle={styles.dropDownListContainer}
                                    placeholder={'Select category'}
                                    value={transaction.category}
                                    onChange={(item) => {
                                        setTransaction({...transaction, category:  item.value || ""});
                                    }}
                                />
                            </View>
                        )
                    }

                    {/* Date picker component */}
                    <View style={styles.inputContainer}>
						<Typo color={colors.neutral200} size={16}>Date</Typo>
                        {
                            !showDatePicker && (
                                <Pressable
                                    style={styles.dateInput}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <Typo size={14}>
                                        {(transaction.date as Date).toLocaleDateString()}
                                    </Typo>
                                </Pressable>
                            )
                        }

                        {
                            showDatePicker && (
                                <View style={Platform.OS == 'ios' && styles.iosDatePicker}>
                                    <DateTimePicker
                                        themeVariant='dark'
                                        value={transaction.date as Date}
                                        textColor={colors.white}
                                        mode='date'
                                        display='default'
                                        design={Platform.OS == 'android' ? 'material' : 'default'}
                                        onChange={onDateChange}
                                    >

                                    </DateTimePicker>
                                </View>
                            )
                        }
					</View>

                    {/* amount of transaction */}
                    <View style={styles.inputContainer}>
						<Typo color={colors.neutral200} size={16}>Amount</Typo>
						<Input
							//placeholder='Income'
							keyboardType='numeric'
                            value={transaction.amount?.toString()}
							onChangeText={(value) => setTransaction({...transaction, amount: Number(value.replace(/[^0-9]/g,""))})}
						>
						</Input>
					</View>

                    {/* description for the transaction */}
                    <View style={styles.inputContainer}>
                        <View style={styles.flexRow}>
                            <Typo color={colors.neutral200} size={16}>Description</Typo>
                            <Typo color={colors.neutral500} size={14}>(Optional)</Typo>
                        </View>
						
						<Input
							//placeholder='Income'
                            value={transaction.description}
                            multiline
                            containerStyle={{
                                flexDirection: 'row',
                                height: verticalScale(100),
                                alignItems: 'flex-start',
                                paddingVertical: 15
                            }}
							onChangeText={(value) => setTransaction({...transaction, description: value })}
						>
						</Input>
					</View>

                    <View style={styles.inputContainer}>
						<View style={styles.flexRow}>
                            <Typo color={colors.neutral200} size={16}>Receipt</Typo>
                            <Typo color={colors.neutral500} size={14}>(Optional)</Typo>
                        </View>

                        {/* Image Input */}
                        <ImageUpload file={transaction.image} 
                            onClear={() => setTransaction({...transaction, image: null})} 
                            onSelect={file => setTransaction({...transaction, image: file})} 
                            placeholder='Upload Image'
                        >
                            
                        </ImageUpload>
					</View>
				</ScrollView>
			</View>

			<View style={styles.footer}>
                {
                    oldTransaction?.id && !loading && (
                        <Button
                            onPress={showDeleteAlert}
                            style={{
                                backgroundColor: colors.rose,
                                paddingHorizontal: spacingX._15
                            }}
                        >
                            <Icons.TrashIcon
                                color={colors.white}
                                size={verticalScale(24)}
                                weight='bold'
                            />
                        </Button>
                    )
                }
				<Button onPress={onSubmit} loading={loading} style={{flex: 1}}>
					<Typo color={colors.neutral800} fontWeight={'700'}>
                        {oldTransaction?.id ? "Update" : "Submit"}
                    </Typo>
				</Button>
			</View>
		</ModalWrapper>
	)
}

export default TransactionModal;

const styles = StyleSheet.create({
container: {
        flex: 1,
        paddingHorizontal: spacingY._20,
    },
    form: {
        gap: spacingY._20,
        paddingVertical: spacingY._15,
        paddingBottom: spacingY._40,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral700,
        marginBottom: spacingY._15,
        borderTopWidth: 1,
    },
    inputContainer: {
        gap: spacingY._10,
    },
    iosDropDown: {
        flexDirection: 'row',
        height: verticalScale(54),
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: verticalScale(14),
        borderWidth: 1,
        color: colors.white,
        borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve:  'continuous',
        paddingHorizontal: spacingX._15,
    },
    androidDropDown: {
        //flexDirection: 'row',
        height: verticalScale(54),
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: verticalScale(14),
        borderWidth: 1,
        color: colors.white,
        borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve:  'continuous',
        //paddingHorizontal: spacingX._15,
    },
    dropDown: {
        flexDirection: Platform.OS === "ios" ? "row" : "column",
        height: verticalScale(54),
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: verticalScale(14),
        borderWidth: 1,
        color: colors.white,
        borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve:  'continuous',
        paddingHorizontal: Platform.OS === "ios" ? spacingX._15 : 0,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacingX._5,
    },
    dateInput: {
        flexDirection: "row",
        height: verticalScale(54),
        alignItems: 'center',
        borderWidth: 1,
        color: colors.white,
        borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve:  'continuous',
        paddingHorizontal: spacingX._15,
    },
    iosDatePicker: {
        // backgroundColor: 'red',
    },
    datePickerButton: {
        backgroundColor: colors.neutral700,
        alignSelf: 'flex-end',
        padding: spacingY._7,
        marginRight: spacingX._7,
        borderRadius: radius._10,
        paddingHorizontal: spacingY._15,
    },
    dropDownContainer: {
        height: verticalScale(54),
        borderWidth: 1,
        borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve: 'continuous',
        paddingHorizontal: spacingX._15,
    },
    dropDownItemText: {
        color: colors.white,
    },
    dropDownSelectedText: {
        color: colors.white,
        fontSize: verticalScale(14),
    },
    dropDownListContainer: {
        backgroundColor: colors.neutral900,
        borderRadius: radius._15,
        borderCurve: 'continuous',
        paddingVertical: spacingY._7,
        top: 5,
        borderColor: colors.neutral500,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
        shadowOpacity: 1,
        elevation: 5,
    },
    dropDownPlaceholder: {
        color: colors.white,
    },
    dropDownItemContainer: {
        borderRadius: radius._15,
        marginHorizontal: spacingX._7,
    },
    dropDownIcon: {
        height: verticalScale(30),
        tintColor: colors.neutral300,
    }
});