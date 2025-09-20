import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { Theme } from './theme';


export function useTheme(): { theme: Theme; name: string; setTheme: (n: any) => void } {
    const ctx = useContext(ThemeContext);
    
    if (!ctx) {
        throw new Error('useTheme must be used inside <AppThemeProvider>')
    };
    return { 
        theme: ctx.theme, 
        name: ctx.name, 
        setTheme: ctx.setTheme 
    };
}