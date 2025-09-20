import Button from '@/components/Button';
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import { spacingX, spacingY } from '@/constants/theme';
import { useTheme } from '@/theme/useTheme';
import { verticalScale } from '@/utils/styling';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

const Welcome = () => {
    
    const router = useRouter();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    // shadow colors that feel natural in both light/dark
    //const startColor = theme.isDark ? 'rgba(115, 115, 115, 0.25)' : 'rgba(0,0,0,0.12)';
    //const endColor = theme.isDark ? '#171717ff' : 'rgba(0,0,0,0.0)' ;

    const startColor = theme.isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0,0,0,0.12)';
    const endColor = theme.isDark ? 'rgba(0,0,0,1.0)' : 'rgba(0,0,0,0.0)';

    return (
        <ScreenWrapper>
            {/* <Typo size={30} fontWeight={"700"} color='red'>
                Welcome Page
            </Typo> */}
            <View style={styles.container}>
                {/* Login button & image */}
                <View>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.loginButton}>
                        <Typo fontWeight={"700"} color={theme.colors.text}>Sign In</Typo>
                    </TouchableOpacity>

                    <Animated.Image
                        entering={FadeIn.duration(1000)}
                        source={require('../../assets/images/welcome.png')}
                        style={styles.welcomeImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Footer with buttons */}
                <Shadow
                    distance={30} // shadow "spread"
                    startColor={startColor}
                    endColor={endColor}
                    offset={[1, -1]}             // cast upward,
                    containerStyle={{width: "100%"}}
                    paintInside={false}
                    sides={{
                        top: true,
                        bottom: false,
                        start: false,
                        end: false,
                    }}
                    style={{alignSelf: 'stretch',}}
                >
                    <View style={styles.footer}>
                        <Animated.View 
                            entering={FadeInDown.delay(100).duration(1000).springify().damping(12)}
                            style={{alignItems: 'center', gap: 2}}>
                            <Typo size={30} fontWeight={"700"} color={theme.colors.text}>Always take control</Typo>
                            <Typo size={30} fontWeight={"700"} color={theme.colors.text}>of your finances</Typo>
                        </Animated.View>
                        <View style={{alignItems: 'center', gap: 2}}>
                            <Typo size={17} color={theme.colors.textMuted}>Finances must be arranged to set a better</Typo>
                            <Typo size={17} color={theme.colors.textMuted}>lifestyle in future</Typo>
                        </View>
                        <Animated.View 
                            entering={FadeInDown.delay(200).duration(1000).springify().damping(12)}
                            style={styles.buttonContainer}>
                            <Button onPress={() => router.push('/(auth)/register')} >
                                <Typo size={22} color={theme.colors.primaryText} fontWeight={"700"}>Get Started</Typo>
                            </Button>
                        </Animated.View>
                    </View>
                </Shadow>
                
            </View>
        </ScreenWrapper>
    );
}

export default Welcome;

function getStyles(theme: any){
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-between',
            paddingTop: spacingY._7,
        },
        welcomeImage: {
            height: verticalScale(300),
            width: "100%",
            alignSelf: 'center',
            marginTop: verticalScale(100),
        },
        loginButton: {
            alignSelf: 'flex-end',
            marginRight: spacingX._20,
        },
        footer: {
            backgroundColor: theme.colors.surface,
            alignItems: 'center',
            paddingTop: verticalScale(30),
            paddingBottom: verticalScale(45),
            gap: spacingY._20,
            // ...Platform.select({
            //     ios: {
            //         shadowColor: "white",
            //         shadowOffset: { width: 0, height: -10 },
            //         shadowRadius: 25,
            //         shadowOpacity: 0.15,
            //     },
            //     android: { 
            //         elevation: 10,
            //     },
            // }),
        },
        buttonContainer: {
            width: "100%",
            paddingHorizontal: spacingX._25,
        },
    });
}