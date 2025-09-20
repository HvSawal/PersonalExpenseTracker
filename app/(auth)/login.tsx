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

const Login = () => {

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {login: loginUser} = useAuth();

    const { theme } = useTheme();
    const styles = getStyles(theme);

    const handleSubmit = async () => {
        // handle login logic here

        // Email validation
        if(!emailRef.current || !passwordRef.current) {
            Alert.alert("Login", "Please fill all the fields");
            return;
        }
        
        // console.log("Email:", emailRef.current);
        // console.log("Password:", passwordRef.current);
        setIsLoading(true);
        const response = await loginUser(emailRef.current.toLowerCase().trim(), passwordRef.current.toLowerCase().trim());
        setIsLoading(false);

        if(!response.success){
            //console.log(response);
            Alert.alert("Login: ", response.msg);
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
                    <Typo size={30} fontWeight={"700"} color={theme.colors.text}>Hey,</Typo>
                    <Typo size={30} fontWeight={"700"} color={theme.colors.text}>Welcome Back</Typo>
                </View>
                <View style={styles.form}>
                    <Typo size={16} color={theme.colors.textMuted}>
                        Login now to track all your expenses.
                    </Typo>
                    <Input 
                        placeholder='Enter your email'
                        placeholderTextColor={theme.colors.textMuted}
                        onChangeText={ value => emailRef.current = value }
                        
                        icon={<Icons.AtIcon size={verticalScale(26)} color={theme.colors.textMuted} weight='bold' />}
                    />
                    <Input 
                        placeholder='Enter your password'
                        placeholderTextColor={theme.colors.textMuted}
                        secureTextEntry
                        onChangeText={ value => passwordRef.current = value }
                        icon={<Icons.LockIcon size={verticalScale(26)} color={theme.colors.textMuted} weight='bold' />}
                    />
                    <Typo style={styles.forgotPassword} size={14} fontWeight={"500"}>
                        Forgot Password?
                    </Typo>

                    <Button loading={isLoading} onPress={handleSubmit} >
                        <Typo size={22} color={theme.colors.primaryText} fontWeight={"700"}>
                            Log In
                        </Typo>
                    </Button>

                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Typo style={styles.footerText} size={15}>
                        Don&apos;t have an account?
                    </Typo>
                    <Pressable onPress={() => router.navigate('/(auth)/register')}>
                        <Typo size={15} fontWeight={"700"} color={theme.colors.primary}>
                            Sign Up
                        </Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login;

function getStyles(theme: any){
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
            color: theme.colors.text,
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