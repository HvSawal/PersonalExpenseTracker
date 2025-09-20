import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { getProfileImage } from '@/services/imageService';
import { updateUser } from '@/services/userService';
import { useTheme } from '@/theme/useTheme';
import { UserDataType } from '@/types';
import { scale, verticalScale } from '@/utils/styling';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FOOTER_BASE_PADDING = spacingY._15;

const ProfileModal = () => {

	const {theme} = useTheme();
	const styles = getStyles(theme);

	const { bottom } = useSafeAreaInsets();

	const { user, updateUserData } = useAuth();

	const [userData, setUserData] = useState<UserDataType>({
		name: "",
		image: null
	});

	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setUserData({
			name: user?.name || "",
			image: user?.image || null,
		});
	}, [user]);

	const onSubmit = async () => {
		let {name, image} = userData;
		if(!name.trim()){
			Alert.alert("User","Please fill all the fields");
			return;
		}
		setLoading(true);
		const response = await updateUser(user?.uid as string, userData);
		setLoading(false);
		if(response.success){
			//update the user
			updateUserData(user?.uid as string);
			router.back();
		} else {
			Alert.alert("User", response.msg)
		}
	}

	const onPickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			//allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
		});
		
		//console.log(result.assets[0]);
		
		if (!result.canceled) {
			setUserData({...userData, image: result.assets[0]});
		}
	}

	return (
		<ModalWrapper>

			<View style={styles.container}>
				<Header 
					title='Update Profile'
					leftIcon={<BackButton />}
					style={{marginBottom: spacingY._10}}
				/>

				{/* Form */}
				<ScrollView contentContainerStyle={[styles.form,{ paddingBottom: bottom + FOOTER_BASE_PADDING + 16 },]} keyboardShouldPersistTaps="handled">
					<View style={styles.avatarContainer}>
						<Image
							style={styles.avatar}
							source={getProfileImage(userData.image)}
							contentFit='cover'
							transition={100}
						/>
						<TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
							<Icons.PencilIcon
								size={verticalScale(20)}
								color={theme.colors.text}
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.inputContainer}>
						<Typo color={theme.colors.text}>Name</Typo>
						<Input
							placeholder='Name'
							value={userData.name}
							onChangeText={(value) => setUserData({...userData, name: value})}
						>
						</Input>
					</View>
				</ScrollView>
			</View>

			<View style={styles.footer}>
				<Button onPress={onSubmit} loading={loading} style={{flex: 1}}>
					<Typo color={theme.colors.primaryText} fontWeight={'700'}>Update</Typo>
				</Button>
			</View>
		</ModalWrapper>
	)
}

export default ProfileModal;

function getStyles(theme: any){
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'space-between',
			paddingHorizontal: spacingY._20,
			//paddingVertical: spacingY._30,
		},
		footer: {
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'center',
			paddingHorizontal: spacingX._20,
			gap: scale(20),
			paddingTop: spacingY._15,
			borderTopColor: theme.colors.border,
			//marginBottom: spacingY._15,
			borderTopWidth: 1,
		},
		form:{
			gap: spacingY._30,
			marginTop: spacingY._15,
		},
		avatarContainer: {
			position: 'relative',
			alignSelf: 'center',
		},
		avatar: {
			alignSelf: 'center',
			backgroundColor: theme.colors.card,
			height: verticalScale(135),
			width: verticalScale(135),
			borderRadius: 200,
			borderWidth: 1,
			borderColor: theme.colors.border,
			//overflow: 'hidden',
			//position: 'relative',
		},
		inputContainer: {
			gap: spacingY._7,
		},
		editIcon: {
			position: 'absolute',
			bottom: spacingY._5,
			right: spacingY._7,
			borderRadius: 100,
			backgroundColor: theme.colors.background,
			shadowColor: theme.colors.text,
			shadowOffset: {width: 0, height: 0},
			shadowOpacity: 0.25,
			shadowRadius: 10,
			elevation: 4,
			padding: spacingY._7,
		}
	});
}