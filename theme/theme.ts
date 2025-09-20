export type ThemeName = 'light' | 'dark' | 'amoled' | 'darkSpecial'; //'ocean' | 


export type Palette = {
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryText: string;
    success: string;
    warning: string;
    danger: string;
    border: string;
    card: string;
};

export type Theme = {
    name: ThemeName;
    colors: Palette;
    spacing: { 
        _4: number; 
        _8: number; 
        _10: number; 
        _12: number; 
        _16: number; 
        _20: number; 
        _24: number; 
    };
    radii: { 
        sm: number; 
        md: number; 
        lg: number; 
        xl: number 
    };
    typography: { 
        fontFamily: string; 
        size: { 
            xs: number; 
            sm: number; 
            md: number; 
            lg: number; 
            xl: number 
        } 
    };
    shadows: { 
        card: { 
            elevation: number; 
            shadowOpacity: number; 
            shadowRadius: number; 
            shadowOffset: { width: number; height: number } 
        } 
    };
    isDark: boolean;
};


const spacing = { _4: 4, _8: 8, _10: 10, _12: 12, _16: 16, _20: 20, _24: 24 } as const;
const radii = { sm: 6, md: 10, lg: 14, xl: 20 } as const;
const typography = {
    fontFamily: 'System',
    size: { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 },
} as const;
const shadows = {
    card: { elevation: 3, shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
} as const;


const light: Theme = {
    name: 'light',
    isDark: false,
    colors: {
        background: '#F7F8FA',
        surface: '#FFFFFF',
        surfaceAlt: '#F2F4F7',
        text: '#0B1220',
        textMuted: '#667085',
        primary: '#2962FF',
        primaryText: '#FFFFFF',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        border: '#1d1d1eff',
        card: '#b3e5fc62',//'#d4d4d4',
    },
    spacing,
    radii,
    typography,
    shadows,
};

const dark: Theme = {
    name: 'dark',
    isDark: true,
    colors: {
        background: '#0B0F14',
        surface: '#10151D',
        surfaceAlt: '#121823',
        text: '#E6EAF2',
        textMuted: '#9AA4B2',
        primary: '#4F8BFF',
        primaryText: '#0B0F14',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#F43F5E',
        border: '#1F2A37',
        card: '#121823',
    },
    spacing,
    radii,
    typography,
    shadows,
};


const amoled: Theme = {
    name: 'amoled',
    isDark: true,
    colors: {
        background: 'rgba(0, 0, 0, 1)',
        surface: 'rgba(15, 15, 15, 1)', //191919 //0F0F0F
        surfaceAlt: '#0F0F0F',
        text: '#EDEDED',
        textMuted: '#A3A3A3',
        primary: '#ffc107',
        primaryText: '#000000',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#F43F5E',
        border: '#1C1C1C',
        card: '#0A0A0A',
    },
    spacing,
    radii,
    typography,
    shadows,
};

// const ocean: Theme = {
//     name: 'ocean',
//     isDark: false,
//     colors: {
//         background: '#F4F8FB',
//         surface: '#FFFFFF',
//         surfaceAlt: '#EAF2FB',
//         text: '#0E1B2A',
//         textMuted: '#6B7A90',
//         primary: '#1E88E5',
//         primaryText: '#FFFFFF',
//         success: '#0EA5E9',
//         warning: '#F59E0B',
//         danger: '#EF4444',
//         border: '#DBE4EF',
//         card: '#FFFFFF',
//     },
//     spacing,
//     radii,
//     typography,
//     shadows,
// };

const darkSpecial: Theme = {
    name: 'darkSpecial',
    isDark: true,
    colors: {
        background: '#171717',
        surface: '#262626',
        surfaceAlt: '#404040',
        text: '#E6EAF2',
        textMuted: '#d4d4d4',
        primary: '#a3e635',
        primaryText: '#0B0F14',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#F43F5E',
        border: '#1F2A37',
        card: '#262626',
    },
    spacing,
    radii,
    typography,
    shadows,
};

export const defferentColor = {
    primary: "#a3e635",
    primaryLight: "#0ea5e9",
    primaryDark: "#0369a1",
    text: "#fff",
    textLight: "#e5e5e5",
    textLighter: "#d4d4d4",
    white: "#fff",
    black: "#000",
    rose: "#ef4444",
    green: "#16a34a",
    neutral50: "#fafafa",
    neutral100: "#f5f5f5",
    neutral200: "#e5e5e5",
    neutral300: "#d4d4d4",
    neutral350: "#CCCCCC",
    neutral400: "#a3a3a3",
    neutral500: "#737373",
    neutral600: "#525252",
    neutral700: "#404040",
    neutral800: "#262626",
    neutral900: "#171717",
};


export const THEMES: Record<ThemeName, Theme> = { light, dark, amoled, darkSpecial }; //ocean, 
export const DEFAULT_THEME: ThemeName = 'light';
export const isDarkTheme = (t: Theme) => t.isDark;