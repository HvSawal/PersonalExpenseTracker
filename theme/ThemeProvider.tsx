import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { DEFAULT_THEME, Theme, ThemeName, THEMES } from './theme';

const STORAGE_KEY = 'app.theme';

type ThemeContextValue = {
    name: ThemeName;
    theme: Theme;
    setTheme: (name: ThemeName) => void;
    available: ThemeName[];
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const AppThemeProvider = ({
    children
}: {
    children: React.ReactNode
}) => {

    const [name, setName] = useState<ThemeName>(DEFAULT_THEME);

    //load saved theme once
    useEffect(() => {
        (async () => {
            try {
                const saved = (await AsyncStorage.getItem(STORAGE_KEY)) as ThemeName | null;
                if (saved && THEMES[saved]) setName(saved);
            } catch {}
        })();
    }, []);


    // persist + status bar style on change
    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, name).catch(() => {});
        const dark = THEMES[name].isDark;
        StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content');
        // For Android you can also set backgroundColor via expo-status-bar if desired
    }, [name]);

    const setTheme = useCallback((n: ThemeName) => {
        if (THEMES[n]) setName(n);
    }, []);

    const value = useMemo<ThemeContextValue>(() => ({
        name,
        theme: THEMES[name],
        setTheme,
        available: Object.keys(THEMES) as ThemeName[],
    }), [name, setTheme]);


    return (
        <ThemeContext.Provider value={value}>
            {/* <Typo>{children}</Typo> */}
            {children}
        </ThemeContext.Provider>
    );
}

export default AppThemeProvider

const styles = StyleSheet.create({})