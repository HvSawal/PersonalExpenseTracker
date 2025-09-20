import { colors } from '@/constants/theme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const index = () => {

    return (
        <View style={styles.container}>
            <Image
                //source={require('../assets/images/splashImage.png')}
                source={require('../assets/images/splashScreenImage.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral900
    },
    logo: {
        height: "20%",
        aspectRatio: 1,
    }
});