import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { useTheme } from '@/theme/useTheme';
import { verticalScale } from '@/utils/styling';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

const Register = () => {
	const emailRef = useRef("");
    const passwordRef = useRef("");
	const nameRef = useRef("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
	const {register: registerUser} = useAuth();

    const { theme } = useTheme();
    const styles = getStyles(theme);

    const handleSubmit = async () => {
        // handle login logic here

        // Email validation
        if(!emailRef.current || !passwordRef.current || !nameRef.current) {
            Alert.alert("Login", "Please fill all the fields");
            return;
        }
        // console.log("Name:", nameRef.current);
        // console.log("Email:", emailRef.current);
        // console.log("Password:", passwordRef.current);

		setIsLoading(true);
		const response = await registerUser(emailRef.current, passwordRef.current, nameRef.current);
		setIsLoading(false);
		console.log('Register result : ', response);

		if(!response.success){
			Alert.alert("Sign Up", response.msg);
            return;
		} else {
			// route the user to their homepage
		}

        // After login, navigate to the main app screen
        //router.push('/');
    }


    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* back button */}
                <BackButton iconSize={28}/>

                <View style={{gap: 5, marginTop: spacingY._20}}>
                    <Typo size={30} fontWeight={"700"} color={theme.colors.text}>Let&apos;s get you started,</Typo>
                </View>
                <View style={styles.form}>
                    <Typo size={16} color={theme.colors.textMuted}>
                        Create an account to track your expenses.
                    </Typo>
					<Input
                        placeholder='Enter your Name'
                        placeholderTextColor={theme.colors.textMuted}
                        onChangeText={ value => nameRef.current = value }
                        icon={<Icons.UserIcon size={verticalScale(26)} color={theme.colors.textMuted} weight='bold' />}
                    />
                    <Input
                        placeholder='Enter your Email'
                        placeholderTextColor={theme.colors.textMuted}
                        onChangeText={ value => emailRef.current = value }
                        icon={<Icons.AtIcon size={verticalScale(26)} color={theme.colors.textMuted} weight='bold' />}
                    />
                    <Input 
                        placeholder='Enter your Password'
                        placeholderTextColor={theme.colors.textMuted}
                        secureTextEntry
                        onChangeText={ value => passwordRef.current = value }
                        icon={<Icons.LockIcon size={verticalScale(26)} color={theme.colors.textMuted} weight='bold' />}
                    />
                    <Button loading={isLoading} onPress={handleSubmit} >
                        <Typo size={22} color={theme.colors.primaryText} fontWeight={"700"}>
                            Sign Up
                        </Typo>
                    </Button>

                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Typo style={styles.footerText} size={15}>
                        Already have an account?
                    </Typo>
                    <Pressable onPress={() => router.navigate('/(auth)/login')}>
                        <Typo size={15} fontWeight={"700"} color={theme.colors.primary}>
                            Login
                        </Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Register;

function getStyles(theme:any){
    return StyleSheet.create({
        container: {
            flex: 1,
            gap: spacingY._30,
            paddingHorizontal: spacingX._20,
        },
        welcomeText: {
            fontSize: verticalScale(30),
            fontWeight: '700',
            color: colors.text,
        },
        form: {
            gap: spacingY._20,
        },
        forgotPassword: {
            textAlign: 'right',
            fontWeight: '500',
            color: colors.text,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
        },
        footerText: {
            textAlign: 'center',
            color: theme.colors.text,
            fontSize: verticalScale(15),
        }
    });
}