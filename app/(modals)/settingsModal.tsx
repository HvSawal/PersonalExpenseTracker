import BackButton from '@/components/BackButton';
import Header from '@/components/Header';
import ModalWrapper from '@/components/ModalWrapper';
import Typo from '@/components/Typo';
import { spacingX, spacingY } from '@/constants/theme';
import { ThemeName, THEMES } from '@/theme/theme';
import { useTheme } from '@/theme/useTheme';
import { useRouter } from 'expo-router';
import * as Icons from 'phosphor-react-native';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';



const SettingsModal = () => {

    const router = useRouter();
    const {theme, name, setTheme} = useTheme();

    const items = Object.keys(THEMES) as ThemeName[];
    return (
        <ModalWrapper style={{backgroundColor: theme.colors.background}}>
			<View style={styles.container}>
				<Header 
					title={'Settings'}
					leftIcon={<BackButton />}
					style={{marginBottom: spacingY._10}}
				/>

				<ScrollView
                    contentContainerStyle={{ paddingHorizontal: spacingX?._15 ?? 15, paddingBottom: 28,  }}
                    showsVerticalScrollIndicator={false}
                >
                
                    {/* Section: Appearance */}
                    <Typo style={{ marginBottom: 12 }} color={theme.colors.text} fontWeight="700">
                        Appearance
                    </Typo>

                    <View style={styles.themeGrid}>
                        {items.map((n) => {
                        const t = THEMES[n];
                        const active = n === name;

                        return (
                            <TouchableOpacity
                            key={n}
                            onPress={() => setTheme(n)}
                            style={[
                                styles.themeCard,
                                {
                                    backgroundColor: theme.colors.surface,
                                    borderColor: active ? t.colors.primary : theme.colors.border,
                                },
                            ]}
                            >
                            {/* Simple palette preview */}
                            <View style={styles.swatches}>
                                <View style={[styles.swatch, { backgroundColor: t.colors.background }]} />
                                <View style={[styles.swatch, { backgroundColor: t.colors.surface }]} />
                                <View style={[styles.swatch, { backgroundColor: t.colors.primary }]} />
                                <View style={[styles.swatch, { backgroundColor: t.colors.text }]} />
                            </View>

                            <View style={styles.row}>
                                <Typo color={theme.colors.text} style={{ flex: 1 }}>
                                {n.toUpperCase()}
                                </Typo>
                                {active && (
                                <Icons.CheckCircleIcon
                                    size={20}
                                    color={t.colors.primary}
                                    weight="bold"
                                />
                                )}
                            </View>
                            </TouchableOpacity>
                        );
                        })}
                    </View>

                    {/* If you want a reset/system option, uncomment below */}
                    {/*
                    <Button
                        style={{ marginTop: 20 }}
                        onPress={() => setTheme('light')} // or detect system then map
                    >
                        <Typo color={theme.colors.primaryText}>Reset to Light</Typo>
                    </Button>
                    */}
                </ScrollView>
            </View>
        </ModalWrapper>
    );
}

export default SettingsModal;

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        paddingHorizontal: spacingY._20,
    },
    themeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    themeCard: {
        width: '48%',
        borderWidth: 2,
        borderRadius: 14,
        padding: 12,
    },
    swatches: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    swatch: {
        width: 18,
        height: 18,
        borderRadius: 6,
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8 
    },
});